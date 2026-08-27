# 🌿 O‘zbekiston Respublikasi Agrosanoatni Rivojlantirish Agentligi
## 🌾 Malakali Agronomlar Milliy Reyestri va Axborot Tizimi

Agrosanoatni rivojlantirish agentligining viloyat boshqarmalari va hududiy mas'ul xodimlari tomonidan yuritiluvchi respublika bo‘yicha faoliyat yuritayotgan malakali agronom-mutaxassislar yagona elektron reyestri hamda fermer va aholi uchun ochiq axborot-maslahat portali.

---

## 🔐 Agentlik Hududiy Login va Parollar Jadvali

Tizimda Agentlikning 14 ta hududiy boshqarmasi hamda Bosh Administrator uchun maxsus hisoblar yaratilgan:

| № | Ҳудуд номи | Login | Standart Parol | Mas'uliyat va Ruxsat |
|---|------------|-------|----------------|----------------------|
| 1 | **Qoraqalpog‘iston Respublikasi** | `qqr_agentlik` | `QqrAgentlik2026!` | Qoraqalpog‘iston Resp. boshqarmasi |
| 2 | **Andijon viloyati** | `andijon_agentlik` | `AndijonAgentlik2026!` | Andijon viloyati boshqarmasi |
| 3 | **Buxoro viloyati** | `buxoro_agentlik` | `BuxoroAgentlik2026!` | Buxoro viloyati boshqarmasi |
| 4 | **Farg‘ona viloyati** | `fargona_agentlik` | `FargonaAgentlik2026!` | Farg‘ona viloyati boshqarmasi |
| 5 | **Jizzax viloyati** | `jizzax_agentlik` | `JizzaxAgentlik2026!` | Jizzax viloyati boshqarmasi |
| 6 | **Xorazm viloyati** | `xorazm_agentlik` | `XorazmAgentlik2026!` | Xorazm viloyati boshqarmasi |
| 7 | **Namangan viloyati** | `namangan_agentlik` | `NamanganAgentlik2026!` | Namangan viloyati boshqarmasi |
| 8 | **Navoiy viloyati** | `navoiy_agentlik` | `NavoiyAgentlik2026!` | Navoiy viloyati boshqarmasi |
| 9 | **Qashqadaryo viloyati** | `qashqadaryo_agentlik` | `QashqadaryoAgentlik2026!` | Qashqadaryo viloyati boshqarmasi |
| 10 | **Samarqand viloyati** | `samarqand_agentlik` | `SamarqandAgentlik2026!` | Samarqand viloyati boshqarmasi |
| 11 | **Sirdaryo viloyati** | `sirdaryo_agentlik` | `SirdaryoAgentlik2026!` | Sirdaryo viloyati boshqarmasi |
| 12 | **Surxondaryo viloyati** | `surxondaryo_agentlik` | `SurxondaryoAgentlik2026!` | Surxondaryo viloyati boshqarmasi |
| 13 | **Toshkent viloyati** | `toshkent_v_agentlik` | `ToshkentVAgentlik2026!` | Toshkent viloyati boshqarmasi |
| 14 | **Toshkent shahri** | `toshkent_sh_agentlik` | `ToshkentShAgentlik2026!` | Toshkent shahri boshqarmasi |
| 15 | **Agentlik Bosh Administratori** | `admin_agentlik` | `Agentlik2026!` | Barcha hududlar va xodimlarni boshqarish |

---

## 👥 3 Bosqichli Rol Arxitekturasi

1. **Oddiy foydalanuvchi (Mehmon / Fermer / Aholi)**:
   - Portalda agronomlar ro‘yxatini erkin ko‘rish, qidirish, filtrlash;
   - Agronomlarga telefon qilish yoki onlayn maslahat so‘rash;
   - Ma'lumotlarni eksport qilish yoki o‘zgartirish cheklangan (sof axborot rejimi).

2. **Agentlik viloyat xodimi (Hududiy mas'ul)**:
   - O‘z hududiga tegishli agronomlarni kiritish, tahrirlash va o‘chirish;
   - O‘z hududiga Excel/CSV orqali ommaviy yuklash;
   - O‘z viloyati ma'lumotlarini CSV formatida eksport qilish.

3. **Agentlik Bosh Administratori (Admin)**:
   - Yangi viloyat xodimlarini yaratish (login, parol, viloyat biriktirish);
   - Xodimlarning hisoblarini tahrirlash va o‘chirish;
   - Butun respublika agronomlarini to‘liq boshqarish va eksport qilish.

---

## 🐳 Docker Orqali Ishga Tushirish

```bash
docker compose up -d --build
```

Brauzerda: **[http://localhost:8080](http://localhost:8080)**  
Admin Panel / Login: **[http://localhost:8080/admin](http://localhost:8080/admin)**
