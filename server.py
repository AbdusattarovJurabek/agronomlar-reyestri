#!/usr/bin/env python3
"""
Respublika Malakali Agronomlari Milliy Reyestri va Axborot Tizimi
Standalone Backend Server & REST API with 3-Tier RBAC Architecture:
1. Oddiy foydalanuvchi (Mehmon) - faqat ko'radi, qidiradi, yuklab ololmaydi
2. Viloyat xodimi - o'z viloyati agronomlarini kiritadi, tahrirlaydi, yuklaydi
3. Admin - viloyat xodimlarini yaratadi, parollarini boshqaradi, butun portalni nazorat qiladi
"""

import csv
import io
import json
import mimetypes
import os
import re
import secrets
import sys
import tempfile
import threading
import time
import urllib.parse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any, Optional

ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
AGRONOMISTS_FILE = DATA_DIR / "agronomists.json"
CONSULTATIONS_FILE = DATA_DIR / "consultations.json"
USERS_FILE = DATA_DIR / "users.json"

MAX_JSON_BODY = 5 * 1024 * 1024  # 5MB for bulk import
_file_lock = threading.RLock()

# In-memory session store: token -> {"user": {...}, "expires": timestamp}
SESSIONS: dict[str, dict[str, Any]] = {}
SESSION_TTL_SECONDS = 86400 * 7  # 7 days

DEFAULT_USERS = [
    {
        "username": "admin_agentlik",
        "password": "Agentlik2026!",
        "role": "admin",
        "region": "Barchasi (Respublika)",
        "displayName": "Agrosanoatni rivojlantirish agentligi Bosh Administratori",
        "createdAt": 1700000000,
        "lastLogin": None
    },
    {
        "username": "qqr_agentlik",
        "password": "QqrAgentlik2026!",
        "role": "regional",
        "region": "Qoraqalpog‘iston Respublikasi",
        "displayName": "Agentlik Qoraqalpog‘iston Respublikasi boshqarmasi",
        "createdAt": 1700000000,
        "lastLogin": None
    },
    {
        "username": "andijon_agentlik",
        "password": "AndijonAgentlik2026!",
        "role": "regional",
        "region": "Andijon",
        "displayName": "Agentlik Andijon viloyati boshqarmasi",
        "createdAt": 1700000000,
        "lastLogin": None
    },
    {
        "username": "buxoro_agentlik",
        "password": "BuxoroAgentlik2026!",
        "role": "regional",
        "region": "Buxoro",
        "displayName": "Agentlik Buxoro viloyati boshqarmasi",
        "createdAt": 1700000000,
        "lastLogin": None
    },
    {
        "username": "fargona_agentlik",
        "password": "FargonaAgentlik2026!",
        "role": "regional",
        "region": "Farg‘ona",
        "displayName": "Agentlik Farg‘ona viloyati boshqarmasi",
        "createdAt": 1700000000,
        "lastLogin": None
    },
    {
        "username": "jizzax_agentlik",
        "password": "JizzaxAgentlik2026!",
        "role": "regional",
        "region": "Jizzax",
        "displayName": "Agentlik Jizzax viloyati boshqarmasi",
        "createdAt": 1700000000,
        "lastLogin": None
    },
    {
        "username": "xorazm_agentlik",
        "password": "XorazmAgentlik2026!",
        "role": "regional",
        "region": "Xorazm",
        "displayName": "Agentlik Xorazm viloyati boshqarmasi",
        "createdAt": 1700000000,
        "lastLogin": None
    },
    {
        "username": "namangan_agentlik",
        "password": "NamanganAgentlik2026!",
        "role": "regional",
        "region": "Namangan",
        "displayName": "Agentlik Namangan viloyati boshqarmasi",
        "createdAt": 1700000000,
        "lastLogin": None
    },
    {
        "username": "navoiy_agentlik",
        "password": "NavoiyAgentlik2026!",
        "role": "regional",
        "region": "Navoiy",
        "displayName": "Agentlik Navoiy viloyati boshqarmasi",
        "createdAt": 1700000000,
        "lastLogin": None
    },
    {
        "username": "qashqadaryo_agentlik",
        "password": "QashqadaryoAgentlik2026!",
        "role": "regional",
        "region": "Qashqadaryo",
        "displayName": "Agentlik Qashqadaryo viloyati boshqarmasi",
        "createdAt": 1700000000,
        "lastLogin": None
    },
    {
        "username": "samarqand_agentlik",
        "password": "SamarqandAgentlik2026!",
        "role": "regional",
        "region": "Samarqand",
        "displayName": "Agentlik Samarqand viloyati boshqarmasi",
        "createdAt": 1700000000,
        "lastLogin": None
    },
    {
        "username": "sirdaryo_agentlik",
        "password": "SirdaryoAgentlik2026!",
        "role": "regional",
        "region": "Sirdaryo",
        "displayName": "Agentlik Sirdaryo viloyati boshqarmasi",
        "createdAt": 1700000000,
        "lastLogin": None
    },
    {
        "username": "surxondaryo_agentlik",
        "password": "SurxondaryoAgentlik2026!",
        "role": "regional",
        "region": "Surxondaryo",
        "displayName": "Agentlik Surxondaryo viloyati boshqarmasi",
        "createdAt": 1700000000,
        "lastLogin": None
    },
    {
        "username": "toshkent_v_agentlik",
        "password": "ToshkentVAgentlik2026!",
        "role": "regional",
        "region": "Toshkent viloyati",
        "displayName": "Agentlik Toshkent viloyati boshqarmasi",
        "createdAt": 1700000000,
        "lastLogin": None
    },
    {
        "username": "toshkent_sh_agentlik",
        "password": "ToshkentShAgentlik2026!",
        "role": "regional",
        "region": "Toshkent shahri",
        "displayName": "Agentlik Toshkent shahri boshqarmasi",
        "createdAt": 1700000000,
        "lastLogin": None
    }
]

DEFAULT_AGRONOMISTS = [
    {
        "id": 1,
        "region": "Qoraqalpog‘iston Respublikasi",
        "district": "Nukus",
        "fullName": "Allambergenov Jaxan",
        "phone": "+998 99 467-96-67",
        "birthDate": "1967",
        "specialization": "Agronom",
        "university": "Toshkent Davlat Agrar Universiteti",
        "graduationYear": 1992,
        "direction": "Bog‘dorchilik va intensiv ekinlar",
        "experience": "32 yil",
        "status": "active"
    },
    {
        "id": 2,
        "region": "Qoraqalpog‘iston Respublikasi",
        "district": "Kegeyli",
        "fullName": "Uzaqbergenov Ulug‘bek Tanatar o‘g‘li",
        "phone": "+998 99 184-94-00",
        "birthDate": "1994",
        "specialization": "Agronom",
        "university": "Toshkent Davlat Agrar Universiteti",
        "graduationYear": 2021,
        "direction": "Sho‘rga chidamli bog‘lar va tomchilatib sug‘orish",
        "experience": "5 yil",
        "status": "active"
    },
    {
        "id": 3,
        "region": "Andijon",
        "district": "Andijon",
        "fullName": "Sulaymonov Abdumutallib Ko‘chqarovich",
        "phone": "+998 90 621-53-00",
        "birthDate": "26.07.1958",
        "specialization": "Agronom",
        "university": "Toshkent Davlat Agrar Universiteti",
        "graduationYear": 1996,
        "direction": "Intensiv bog‘dorchilik va urug‘chilik",
        "experience": "30 yil",
        "status": "active"
    },
    {
        "id": 4,
        "region": "Andijon",
        "district": "Paxtaobod",
        "fullName": "Temirov Omadjon Azimovich",
        "phone": "+998 97 982-82-27",
        "birthDate": "01.07.1982",
        "specialization": "Agronom",
        "university": "Andijon qishloq xo‘jaligi instituti",
        "graduationYear": 2026,
        "direction": "Meva-sabzavotchilik va o‘simliklar himoyasi",
        "experience": "8 yil",
        "status": "active"
    },
    {
        "id": 5,
        "region": "Andijon",
        "district": "Paxtaobod",
        "fullName": "Ergasheva Gulchiroy Ilxomjonovna",
        "phone": "+998 97 998-27-37",
        "birthDate": "24.08.1996",
        "specialization": "Agronom",
        "university": "Andijon qishloq xo‘jaligi instituti",
        "graduationYear": 2010,
        "direction": "Uzumchilik va ko‘chatchilik",
        "experience": "14 yil",
        "status": "active"
    },
    {
        "id": 6,
        "region": "Andijon",
        "district": "Paxtaobod",
        "fullName": "Mirzajonov Jo‘rabek Ne’matovich",
        "phone": "+998 99 999-84-15",
        "birthDate": "17.02.1970",
        "specialization": "Agronom",
        "university": "Qishloq xo‘jalik texnikumi",
        "graduationYear": 1989,
        "direction": "Agrotexnika va zararkunandalarga qarshi kurash",
        "experience": "35 yil",
        "status": "active"
    },
    {
        "id": 7,
        "region": "Samarqand",
        "district": "Toyloq",
        "fullName": "Rahmonov Rustam Shokirovich",
        "phone": "+998 93 335-12-34",
        "birthDate": "14.05.1978",
        "specialization": "Uzumchilik bo‘yicha agronom",
        "university": "Samarqand qishloq xo‘jalik instituti",
        "graduationYear": 2000,
        "direction": "Kishmish va xo‘raki uzum navlarini parvarishlash",
        "experience": "24 yil",
        "status": "active"
    },
    {
        "id": 8,
        "region": "Farg‘ona",
        "district": "Quva",
        "fullName": "Qosimov Bahodir Mahmudovich",
        "phone": "+998 91 680-45-78",
        "birthDate": "09.11.1983",
        "specialization": "Bog‘bon-agronom",
        "university": "Toshkent Davlat Agrar Universiteti",
        "graduationYear": 2005,
        "direction": "Anor va shaftoli bog‘larini yaratish",
        "experience": "19 yil",
        "status": "active"
    },
    {
        "id": 9,
        "region": "Toshkent viloyati",
        "district": "Parkent",
        "fullName": "Yusupov Jamshid Anvarovich",
        "phone": "+998 90 123-98-76",
        "birthDate": "22.03.1985",
        "specialization": "Uzumchi-agronom",
        "university": "Toshkent Davlat Agrar Universiteti",
        "graduationYear": 2008,
        "direction": "Tog‘oldi hududlarda intensiv uzumchilik",
        "experience": "16 yil",
        "status": "active"
    },
    {
        "id": 10,
        "region": "Buxoro",
        "district": "Vobkent",
        "fullName": "Hamroyev Alisher Safarovich",
        "phone": "+998 93 630-11-22",
        "birthDate": "05.10.1975",
        "specialization": "Agronom",
        "university": "Toshkent Davlat Agrar Universiteti",
        "graduationYear": 1998,
        "direction": "Suv tejovchi texnologiyalar va sabzavotchilik",
        "experience": "26 yil",
        "status": "active"
    },
    {
        "id": 11,
        "region": "Namangan",
        "district": "Chortoq",
        "fullName": "Sobirov Akmalxon Ibrohimovich",
        "phone": "+998 97 255-77-88",
        "birthDate": "18.08.1980",
        "specialization": "Bog‘bon-agronom",
        "university": "Andijon qishloq xo‘jaligi instituti",
        "graduationYear": 2002,
        "direction": "Gilos va olma intensiv bog‘lari",
        "experience": "22 yil",
        "status": "active"
    },
    {
        "id": 12,
        "region": "Surxondaryo",
        "district": "Denov",
        "fullName": "Mamatqulov Sherzod Tojiboyevich",
        "phone": "+998 90 777-33-44",
        "birthDate": "12.12.1988",
        "specialization": "Subtropik ekinlar agronomi",
        "university": "Toshkent Davlat Agrar Universiteti",
        "graduationYear": 2011,
        "direction": "Hurmo, anor va limonchilik",
        "experience": "13 yil",
        "status": "active"
    }
]


class ValidationError(ValueError):
    pass


def normalize_region_py(r: Optional[str]) -> str:
    if not r:
        return ""
    r_str = str(r).strip()
    if "Qoraqalpog" in r_str:
        return "Qoraqalpog‘iston"
    if "Toshkent vil" in r_str or "Toshkent v" in r_str:
        return "Toshkent v."
    if "Toshkent sh" in r_str:
        return "Toshkent sh."
    return re.sub(r"\s+(viloyati|Respublikasi)$", "", r_str, flags=re.IGNORECASE).strip()


def read_json(path: Path, default: Any) -> Any:
    with _file_lock:
        if not path.exists():
            return default
        try:
            with path.open("r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return default


def write_json_atomic(path: Path, data: Any) -> None:
    with _file_lock:
        path.parent.mkdir(parents=True, exist_ok=True)
        temp_fd, temp_path = tempfile.mkstemp(dir=str(path.parent), prefix=".tmp_")
        try:
            with os.fdopen(temp_fd, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            os.replace(temp_path, str(path))
        except Exception:
            if os.path.exists(temp_path):
                os.remove(temp_path)
            raise


def format_phone(value: Any) -> str:
    cleaned = re.sub(r"[^\d+]", "", str(value or "").strip())
    if not cleaned:
        raise ValidationError("Telefon raqami kiritilishi shart")
    if cleaned.startswith("+998") and len(cleaned) == 13 and cleaned[1:].isdigit():
        return f"+998 {cleaned[4:6]} {cleaned[6:9]}-{cleaned[9:11]}-{cleaned[11:13]}"
    if cleaned.startswith("998") and len(cleaned) == 12 and cleaned.isdigit():
        return f"+998 {cleaned[3:5]} {cleaned[5:8]}-{cleaned[8:10]}-{cleaned[10:12]}"
    if len(cleaned) == 9 and cleaned.isdigit():
        return f"+998 {cleaned[0:2]} {cleaned[2:5]}-{cleaned[5:7]}-{cleaned[7:9]}"
    if len(cleaned) >= 7:
        return str(value).strip()
    raise ValidationError("Telefon raqami formati noto‘g‘ri (+998 90 123-45-67)")


def validate_agronomist(raw: Any) -> dict[str, Any]:
    if not isinstance(raw, dict):
        raise ValidationError("Agronom ma'lumoti JSON ob'ekt bo'lishi kerak")

    region = str(raw.get("region", "")).strip()
    if not region or len(region) > 120:
        raise ValidationError("Hudud (viloyat) nomini to‘g‘ri kiriting")

    district = str(raw.get("district", "")).strip()
    if not district or len(district) > 120:
        raise ValidationError("Tuman nomini to‘g‘ri kiriting")

    fullName = str(raw.get("fullName", "")).strip()
    if not fullName or len(fullName) < 3 or len(fullName) > 150:
        raise ValidationError("Agronomning to‘liq F.I.SH. kiritilishi shart (3-150 belgi)")

    phone = format_phone(raw.get("phone", ""))
    birthDate = str(raw.get("birthDate", "")).strip()
    specialization = str(raw.get("specialization", "Agronom")).strip() or "Agronom"
    university = str(raw.get("university", "")).strip()
    direction = str(raw.get("direction", "Bog‘dorchilik va uzumchilik")).strip() or "Bog‘dorchilik va uzumchilik"
    experience = str(raw.get("experience", "")).strip()
    status = str(raw.get("status", "active")).strip() or "active"

    gradYear = raw.get("graduationYear")
    if gradYear is not None and str(gradYear).strip():
        try:
            gradYear = int(str(gradYear).strip()[:4])
            if gradYear < 1940 or gradYear > 2050:
                raise ValidationError("Tamomlagan yili noto‘g‘ri (1940-2050 oralig‘ida)")
        except ValueError:
            raise ValidationError("Tamomlagan yili raqam bo‘lishi kerak (masalan: 2015)")
    else:
        gradYear = None

    return {
        "id": raw.get("id"),
        "region": region,
        "district": district,
        "fullName": fullName,
        "phone": phone,
        "birthDate": birthDate,
        "specialization": specialization,
        "university": university,
        "graduationYear": gradYear,
        "direction": direction,
        "experience": experience,
        "status": status,
        "updatedAt": int(time.time())
    }


def validate_consultation(raw: Any) -> dict[str, Any]:
    if not isinstance(raw, dict):
        raise ValidationError("So‘rov formati noto‘g‘ri")
    name = str(raw.get("name", "")).strip()
    if not name or len(name) < 2:
        raise ValidationError("Ismingizni kiriting")
    phone = format_phone(raw.get("phone", ""))
    topic = str(raw.get("topic", "")).strip() or "Umumiy agronomik maslahat"
    message = str(raw.get("message", "")).strip()
    if not message or len(message) < 5:
        raise ValidationError("Murojaat matnini to‘liqroq yozing (kamida 5 ta belgi)")
    agronomistId = raw.get("agronomistId")

    return {
        "id": int(time.time() * 1000),
        "farmerName": name,
        "phone": phone,
        "topic": topic,
        "message": message,
        "agronomistId": agronomistId,
        "createdAt": int(time.time()),
        "status": "pending"
    }


class AgronomistPortalHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_json(self, status: int, payload: dict[str, Any]) -> None:
        raw = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Auth-Token")
        self.end_headers()
        self.wfile.write(raw)

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Auth-Token")
        self.end_headers()

    def get_token(self) -> Optional[str]:
        auth_header = self.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            return auth_header[7:].strip()
        custom_token = self.headers.get("X-Auth-Token", "")
        if custom_token:
            return custom_token.strip()
        parsed = urllib.parse.urlparse(self.path)
        qs = urllib.parse.parse_qs(parsed.query)
        token_list = qs.get("token")
        if token_list and token_list[0]:
            return token_list[0].strip()
        return None

    def get_authenticated_user(self) -> Optional[dict[str, Any]]:
        token = self.get_token()
        if not token:
            return None
        session = SESSIONS.get(token)
        if not session:
            return None
        if time.time() > session.get("expires", 0):
            SESSIONS.pop(token, None)
            return None
        return session.get("user")

    def do_GET(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        if path == "/health":
            self.send_json(200, {"status": "ok", "time": int(time.time())})
            return

        # Auth: Current User Profile
        if path == "/api/auth/me":
            user = self.get_authenticated_user()
            if not user:
                self.send_json(401, {"ok": False, "error": "Avtorizatsiyadan o‘tilmagan"})
                return
            self.send_json(200, {"ok": True, "user": user})
            return

        # Auth: List of staff accounts (For Admin only)
        if path in ("/api/auth/accounts", "/api/auth/users"):
            user = self.get_authenticated_user()
            if not user or user.get("role") != "admin":
                self.send_json(403, {"ok": False, "error": "Faqat Respublika Administratori uchun ruxsat berilgan"})
                return
            users = read_json(USERS_FILE, DEFAULT_USERS)
            sanitized_users = []
            for u in users:
                sanitized_users.append({
                    "username": u.get("username"),
                    "role": u.get("role"),
                    "region": u.get("region"),
                    "displayName": u.get("displayName"),
                    "lastLogin": u.get("lastLogin"),
                    "createdAt": u.get("createdAt"),
                    "password": u.get("password")  # Provided for admin dispatch
                })
            self.send_json(200, {"ok": True, "users": sanitized_users, "accounts": sanitized_users})
            return

        if path == "/api/stats":
            agronomists = read_json(AGRONOMISTS_FILE, [])
            consultations = read_json(CONSULTATIONS_FILE, [])
            regions = {a["region"] for a in agronomists if a.get("region")}
            universities = {a["university"] for a in agronomists if a.get("university")}
            fruit_grape_count = sum(1 for a in agronomists if any(k in (a.get("direction", "") + a.get("specialization", "")).lower() for k in ["bog‘", "bog", "uzum", "tok", "meva"]))
            self.send_json(200, {
                "ok": True,
                "totalAgronomists": len(agronomists),
                "totalRegions": len(regions),
                "totalUniversities": len(universities),
                "fruitGrapeConsultants": fruit_grape_count,
                "totalConsultations": len(consultations)
            })
            return

        if path == "/api/agronomists":
            agronomists = read_json(AGRONOMISTS_FILE, [])
            q = (query.get("q", [""])[0]).lower().strip()
            region = (query.get("region", [""])[0]).strip()
            district = (query.get("district", [""])[0]).strip()
            specialization = (query.get("specialization", [""])[0]).strip()

            filtered = []
            for item in agronomists:
                if region and item.get("region") != region:
                    continue
                if district and item.get("district") != district:
                    continue
                if specialization and specialization.lower() != "barchasi":
                    combined = (item.get("specialization", "") + " " + item.get("direction", "")).lower()
                    if specialization.lower() not in combined:
                        continue
                if q:
                    searchable = " ".join([
                        str(item.get("fullName", "")),
                        str(item.get("region", "")),
                        str(item.get("district", "")),
                        str(item.get("specialization", "")),
                        str(item.get("university", "")),
                        str(item.get("direction", "")),
                        str(item.get("phone", ""))
                    ]).lower()
                    if q not in searchable:
                        continue
                filtered.append(item)

            self.send_json(200, {
                "ok": True,
                "total": len(filtered),
                "allCount": len(agronomists),
                "agronomists": filtered
            })
            return

        # Export CSV: Requires Authentication (Staff / Admin)
        if path == "/api/agronomists/export":
            user = self.get_authenticated_user()
            if not user:
                self.send_json(401, {
                    "ok": False,
                    "error": "Ma'lumotlarni eksport qilish uchun viloyat xodimi yoki administrator hisobi bilan tizimga kirish talab etiladi"
                })
                return

            agronomists = read_json(AGRONOMISTS_FILE, [])

            # If regional operator, only export their own region
            if user.get("role") != "admin":
                agronomists = [a for a in agronomists if a.get("region") == user.get("region")]

            output = io.StringIO()
            output.write("\ufeff")  # UTF-8 BOM for Microsoft Excel compatibility
            writer = csv.writer(output, delimiter=";", quoting=csv.QUOTE_MINIMAL)
            writer.writerow([
                "№",
                "Ҳудуд номи (Viloyat)",
                "Туман номи (Tuman)",
                "Малакали агроном Ф.И.Ш.",
                "Телефон рақами",
                "Туғилган кун/йили",
                "Мутахассислиги",
                "Тамомлаган ўқув юрти",
                "Тамомлаган йили",
                "Maslahat yo‘nalishi",
                "Holati"
            ])
            for i, a in enumerate(agronomists, 1):
                writer.writerow([
                    i,
                    a.get("region", ""),
                    a.get("district", ""),
                    a.get("fullName", ""),
                    a.get("phone", ""),
                    a.get("birthDate", ""),
                    a.get("specialization", ""),
                    a.get("university", ""),
                    a.get("graduationYear", ""),
                    a.get("direction", ""),
                    a.get("status", "active")
                ])
            raw_csv = output.getvalue().encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/csv; charset=utf-8")
            self.send_header("Content-Disposition", 'attachment; filename="malakali_agronomlar_royxati.csv"')
            self.send_header("Content-Length", str(len(raw_csv)))
            self.end_headers()
            self.wfile.write(raw_csv)
            return

        if path == "/api/consultations":
            consultations = read_json(CONSULTATIONS_FILE, [])
            self.send_json(200, {"ok": True, "total": len(consultations), "consultations": consultations})
            return

        # Default static file serving
        if path.rstrip("/") in ("", "/admin", "/login", "/dashboard"):
            index_file = ROOT / "index.html"
            if index_file.exists():
                content = index_file.read_bytes()
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(content)))
                self.end_headers()
                self.wfile.write(content)
                return

        super().do_GET()

    def do_POST(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > MAX_JSON_BODY:
                self.send_json(400, {"ok": False, "error": "So‘rov hajmi noto‘g‘ri yoki juda katta"})
                return
            body = self.rfile.read(length).decode("utf-8")
            data = json.loads(body)
        except Exception as e:
            self.send_json(400, {"ok": False, "error": f"JSON formati xato: {str(e)}"})
            return

        # Auth: Login endpoint
        if path == "/api/auth/login":
            username = str(data.get("username", "")).strip()
            password = str(data.get("password", "")).strip()

            if not username or not password:
                self.send_json(400, {"ok": False, "error": "Login va parol kiritilishi shart"})
                return

            users = read_json(USERS_FILE, DEFAULT_USERS)
            matched_user = None
            for u in users:
                if u.get("username") == username and u.get("password") == password:
                    matched_user = u
                    break

            if not matched_user:
                self.send_json(401, {"ok": False, "error": "Login yoki parol noto‘g‘ri kiritildi"})
                return

            # Update lastLogin timestamp
            matched_user["lastLogin"] = int(time.time())
            write_json_atomic(USERS_FILE, users)

            # Generate session token
            token = secrets.token_hex(24)
            user_session_info = {
                "username": matched_user["username"],
                "role": matched_user["role"],
                "region": matched_user["region"],
                "displayName": matched_user["displayName"]
            }
            SESSIONS[token] = {
                "user": user_session_info,
                "expires": time.time() + SESSION_TTL_SECONDS
            }

            self.send_json(200, {
                "ok": True,
                "token": token,
                "user": user_session_info,
                "message": f"Xush kelibsiz, {matched_user['displayName']}!"
            })
            return

        # Auth: Logout endpoint
        if path == "/api/auth/logout":
            token = self.get_token()
            if token:
                SESSIONS.pop(token, None)
            self.send_json(200, {"ok": True, "message": "Tizimdan muvaffaqiyatli chiqildi"})
            return

        # Auth: Admin Create Staff Account (Admin creates Regional Staff)
        if path == "/api/auth/users":
            user = self.get_authenticated_user()
            if not user or user.get("role") != "admin":
                self.send_json(403, {"ok": False, "error": "Faqat Administrator yangi xodim yarata oladi"})
                return

            username = str(data.get("username", "")).strip().lower()
            password = str(data.get("password", "")).strip()
            region = str(data.get("region", "")).strip()
            displayName = str(data.get("displayName", "")).strip()

            if not username or len(username) < 3:
                self.send_json(400, {"ok": False, "error": "Login kamida 3 ta belgidan iborat bo‘lishi kerak"})
                return
            if not password or len(password) < 4:
                self.send_json(400, {"ok": False, "error": "Parol kamida 4 ta belgidan iborat bo‘lishi kerak"})
                return
            if not region:
                self.send_json(400, {"ok": False, "error": "Biriktirilgan hudud (viloyat) tanlanishi shart"})
                return

            users = read_json(USERS_FILE, DEFAULT_USERS)
            if any(u.get("username", "").lower() == username for u in users):
                self.send_json(400, {"ok": False, "error": f"'{username}' nomli login allaqachon mavjud"})
                return

            new_user = {
                "username": username,
                "password": password,
                "role": "regional",
                "region": region,
                "displayName": displayName or f"{region} mas'ul xodimi",
                "createdAt": int(time.time()),
                "lastLogin": None
            }
            users.append(new_user)
            write_json_atomic(USERS_FILE, users)

            self.send_json(201, {
                "ok": True,
                "user": new_user,
                "message": f"'{displayName or username}' nomli viloyat xodimi muvaffaqiyatli yaratildi"
            })
            return

        # Auth: Change Password endpoint
        if path == "/api/auth/change-password":
            user = self.get_authenticated_user()
            if not user:
                self.send_json(401, {"ok": False, "error": "Avtorizatsiyadan o‘tilmagan"})
                return

            old_pass = str(data.get("oldPassword", "")).strip()
            new_pass = str(data.get("newPassword", "")).strip()

            if not new_pass or len(new_pass) < 4:
                self.send_json(400, {"ok": False, "error": "Yangi parol kamida 4 ta belgidan iborat bo‘lishi kerak"})
                return

            users = read_json(USERS_FILE, DEFAULT_USERS)
            found = False
            for u in users:
                if u.get("username") == user.get("username"):
                    if u.get("password") != old_pass and user.get("role") != "admin":
                        self.send_json(400, {"ok": False, "error": "Amaldagi parol noto‘g‘ri kiritildi"})
                        return
                    u["password"] = new_pass
                    found = True
                    break

            if found:
                write_json_atomic(USERS_FILE, users)
                self.send_json(200, {"ok": True, "message": "Parol muvaffaqiyatli yangilandi"})
            else:
                self.send_json(404, {"ok": False, "error": "Foydalanuvchi topilmadi"})
            return

        # Agronomist: Add (Requires Staff / Admin Auth & Region Check)
        if path == "/api/agronomists":
            user = self.get_authenticated_user()
            if not user:
                self.send_json(401, {"ok": False, "error": "Agronom qo‘shish uchun viloyat xodimi hisobi bilan tizimga kirish talab etiladi"})
                return

            # Regional users can only create records in their own region
            if user.get("role") != "admin":
                data["region"] = user.get("region")

            try:
                valid = validate_agronomist(data)
                agronomists = read_json(AGRONOMISTS_FILE, [])
                next_id = max([a.get("id", 0) for a in agronomists], default=0) + 1
                valid["id"] = next_id
                valid["createdBy"] = user.get("username")
                agronomists.insert(0, valid)
                write_json_atomic(AGRONOMISTS_FILE, agronomists)
                self.send_json(201, {"ok": True, "agronomist": valid, "message": "Yangi agronom bazaga kiritildi"})
            except ValidationError as ve:
                self.send_json(422, {"ok": False, "error": str(ve)})
            return

        # Agronomist: Bulk Import (Requires Staff / Admin Auth & Region Assignment)
        if path == "/api/agronomists/bulk-import":
            user = self.get_authenticated_user()
            if not user:
                self.send_json(401, {"ok": False, "error": "Excel/CSV yuklash uchun viloyat xodimi hisobi bilan tizimga kirish talab etiladi"})
                return

            items = data.get("items")
            if not isinstance(items, list) or not items:
                self.send_json(400, {"ok": False, "error": "Import qilinadigan 'items' massivi topilmadi"})
                return
            if len(items) > 1000:
                self.send_json(400, {"ok": False, "error": "Bir martada ko‘pi bilan 1000 ta yozuv yuklash mumkin"})
                return

            agronomists = read_json(AGRONOMISTS_FILE, [])
            current_id = max([a.get("id", 0) for a in agronomists], default=0)
            added = 0
            errors = []

            for index, item in enumerate(items, 1):
                try:
                    if user.get("role") != "admin":
                        item["region"] = user.get("region")
                    valid = validate_agronomist(item)
                    current_id += 1
                    valid["id"] = current_id
                    valid["createdBy"] = user.get("username")
                    agronomists.append(valid)
                    added += 1
                except Exception as ex:
                    errors.append(f"Qator #{index}: {str(ex)}")

            if added > 0:
                write_json_atomic(AGRONOMISTS_FILE, agronomists)

            self.send_json(200, {
                "ok": True,
                "added": added,
                "totalNow": len(agronomists),
                "errors": errors[:20],
                "message": f"{added} ta agronom muvaffaqiyatli yuklandi"
            })
            return

        # Farmer Consultations (Public)
        if path == "/api/consultations":
            try:
                valid = validate_consultation(data)
                consultations = read_json(CONSULTATIONS_FILE, [])
                consultations.insert(0, valid)
                write_json_atomic(CONSULTATIONS_FILE, consultations)
                self.send_json(201, {
                    "ok": True,
                    "reference": valid["id"],
                    "message": "Maslahat so‘rovingiz qabul qilindi. Tez orada agronom siz bilan bog‘lanadi."
                })
            except ValidationError as ve:
                self.send_json(422, {"ok": False, "error": str(ve)})
            return

        self.send_json(404, {"ok": False, "error": "Endpoint topilmadi"})

    def do_PUT(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # Admin Update Staff endpoint: PUT /api/auth/users/<username>
        staff_match = re.match(r"^/api/auth/users/([a-zA-Z0-9_\-]+)$", path)
        if staff_match:
            user = self.get_authenticated_user()
            if not user or user.get("role") != "admin":
                self.send_json(403, {"ok": False, "error": "Faqat Administrator xodim ma'lumotlarini o‘zgartira oladi"})
                return

            target_username = staff_match.group(1)
            try:
                length = int(self.headers.get("Content-Length", "0"))
                body = self.rfile.read(length).decode("utf-8")
                data = json.loads(body)

                users = read_json(USERS_FILE, DEFAULT_USERS)
                idx = next((i for i, u in enumerate(users) if u.get("username") == target_username), None)
                if idx is None:
                    self.send_json(404, {"ok": False, "error": "Xodim topilmadi"})
                    return

                if "password" in data and str(data["password"]).strip():
                    users[idx]["password"] = str(data["password"]).strip()
                if "displayName" in data and str(data["displayName"]).strip():
                    users[idx]["displayName"] = str(data["displayName"]).strip()
                if "region" in data and str(data["region"]).strip():
                    users[idx]["region"] = str(data["region"]).strip()

                write_json_atomic(USERS_FILE, users)
                self.send_json(200, {"ok": True, "message": "Xodim ma'lumotlari yangilandi", "user": users[idx]})
            except Exception as e:
                self.send_json(400, {"ok": False, "error": str(e)})
            return

        # Agronomist Update endpoint: PUT /api/agronomists/<id>
        match = re.match(r"^/api/agronomists/(\d+)$", path)
        if not match:
            self.send_json(404, {"ok": False, "error": "Endpoint topilmadi"})
            return

        user = self.get_authenticated_user()
        if not user:
            self.send_json(401, {"ok": False, "error": "Ma'lumotlarni tahrirlash uchun tizimga kirish talab etiladi"})
            return

        item_id = int(match.group(1))
        agronomists = read_json(AGRONOMISTS_FILE, [])
        idx = next((i for i, a in enumerate(agronomists) if a.get("id") == item_id), None)
        if idx is None:
            self.send_json(404, {"ok": False, "error": "Agronom topilmadi"})
            return

        existing = agronomists[idx]

        # Permission check: Regional operator can only update their own region's records
        if user.get("role") != "admin":
            if normalize_region_py(existing.get("region")) != normalize_region_py(user.get("region")):
                self.send_json(403, {
                    "ok": False,
                    "error": f"Siz faqat o‘z hududingiz ({user.get('region')}) agronomlarini tahrirlashingiz mumkin"
                })
                return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            body = self.rfile.read(length).decode("utf-8")
            data = json.loads(body)

            if user.get("role") != "admin":
                data["region"] = user.get("region")

            valid = validate_agronomist(data)
            valid["id"] = item_id
            valid["createdBy"] = existing.get("createdBy", user.get("username"))
            valid["updatedBy"] = user.get("username")

            agronomists[idx] = valid
            write_json_atomic(AGRONOMISTS_FILE, agronomists)
            self.send_json(200, {"ok": True, "agronomist": valid, "message": "Ma'lumotlar muvaffaqiyatli yangilandi"})
        except ValidationError as ve:
            self.send_json(422, {"ok": False, "error": str(ve)})
        except Exception as e:
            self.send_json(400, {"ok": False, "error": str(e)})

    def do_DELETE(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # Admin Delete Staff endpoint: DELETE /api/auth/users/<username>
        staff_match = re.match(r"^/api/auth/users/([a-zA-Z0-9_\-]+)$", path)
        if staff_match:
            user = self.get_authenticated_user()
            if not user or user.get("role") != "admin":
                self.send_json(403, {"ok": False, "error": "Faqat Administrator xodimni o‘chira oladi"})
                return

            target_username = staff_match.group(1)
            if target_username == user.get("username"):
                self.send_json(400, {"ok": False, "error": "Administrator hisobini o‘chirib bo‘lmaydi"})
                return

            users = read_json(USERS_FILE, DEFAULT_USERS)
            init_len = len(users)
            users = [u for u in users if u.get("username") != target_username]
            if len(users) == init_len:
                self.send_json(404, {"ok": False, "error": "Xodim topilmadi"})
                return

            write_json_atomic(USERS_FILE, users)
            self.send_json(200, {"ok": True, "message": f"'{target_username}' xodimi tizimdan o‘chirildi"})
            return

        # Agronomist Delete endpoint: DELETE /api/agronomists/<id>
        match = re.match(r"^/api/agronomists/(\d+)$", path)
        if not match:
            self.send_json(404, {"ok": False, "error": "Endpoint topilmadi"})
            return

        user = self.get_authenticated_user()
        if not user:
            self.send_json(401, {"ok": False, "error": "Agronomni o‘chirish uchun tizimga kirish talab etiladi"})
            return

        item_id = int(match.group(1))
        agronomists = read_json(AGRONOMISTS_FILE, [])
        idx = next((i for i, a in enumerate(agronomists) if a.get("id") == item_id), None)
        if idx is None:
            self.send_json(404, {"ok": False, "error": "Agronom topilmadi"})
            return

        existing = agronomists[idx]

        # Permission check: Regional operator can only delete their own region's records
        if user.get("role") != "admin":
            if normalize_region_py(existing.get("region")) != normalize_region_py(user.get("region")):
                self.send_json(403, {
                    "ok": False,
                    "error": f"Siz faqat o‘z hududingiz ({user.get('region')}) agronomlarini o‘chirishingiz mumkin"
                })
                return

        agronomists.pop(idx)
        write_json_atomic(AGRONOMISTS_FILE, agronomists)
        self.send_json(200, {"ok": True, "message": "Agronom bazadan o‘chirildi"})


def main() -> None:
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", "8000"))

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    write_json_atomic(USERS_FILE, DEFAULT_USERS)
    if not AGRONOMISTS_FILE.exists() or len(read_json(AGRONOMISTS_FILE, [])) == 0:
        write_json_atomic(AGRONOMISTS_FILE, DEFAULT_AGRONOMISTS)
    if not CONSULTATIONS_FILE.exists():
        write_json_atomic(CONSULTATIONS_FILE, [])

    server = ThreadingHTTPServer((host, port), AgronomistPortalHandler)
    print(f"============================================================")
    print(f" 🌿 AGROSANOATNI RIVOJLANTIRISH AGENTLIGI")
    print(f" 🌾 Malakali Agronomlar Milliy Reyestri va Axborot Tizimi")
    print(f" 👥 3-Bosqichli Rol Arxitekturasi: Mehmon | Viloyat Xodimi | Admin")
    print(f" 🚀 Server ishga tushdi: http://{host}:{port}")
    print(f"============================================================")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer to‘xtatildi.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
