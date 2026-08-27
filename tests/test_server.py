#!/usr/bin/env python3
import json
import sys
import tempfile
import time
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import server


class ServerTests(unittest.TestCase):
    def test_atomic_json_write(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "test.json"
            server.write_json_atomic(p, [{"id": 1, "name": "Test"}])
            data = server.read_json(p, [])
            self.assertEqual(len(data), 1)
            self.assertEqual(data[0]["name"], "Test")

    def test_phone_formatting(self):
        self.assertEqual(server.format_phone("99-467-96-67"), "+998 99 467-96-67")
        self.assertEqual(server.format_phone("+998901234567"), "+998 90 123-45-67")
        self.assertEqual(server.format_phone("998979828227"), "+998 97 982-82-27")

        with self.assertRaises(server.ValidationError):
            server.format_phone("")
        with self.assertRaises(server.ValidationError):
            server.format_phone("1234")

    def test_validate_agronomist(self):
        valid = {
            "region": "Andijon",
            "district": "Paxtaobod",
            "fullName": "Temirov Omadjon Azimovich",
            "phone": "+998 97 982-82-27",
            "birthDate": "01.07.1982",
            "specialization": "Agronom",
            "university": "Andijon qishloq xo‘jaligi instituti",
            "graduationYear": 2026,
            "direction": "Bog‘dorchilik"
        }
        res = server.validate_agronomist(valid)
        self.assertEqual(res["fullName"], "Temirov Omadjon Azimovich")
        self.assertEqual(res["graduationYear"], 2026)

        # Missing required fields
        with self.assertRaises(server.ValidationError):
            server.validate_agronomist({**valid, "region": ""})
        with self.assertRaises(server.ValidationError):
            server.validate_agronomist({**valid, "district": ""})
        with self.assertRaises(server.ValidationError):
            server.validate_agronomist({**valid, "fullName": "A"})
        with self.assertRaises(server.ValidationError):
            server.validate_agronomist({**valid, "graduationYear": 1800})

    def test_validate_consultation(self):
        valid = {
            "name": "Fermer Alisher",
            "phone": "+998 90 123-45-67",
            "topic": "Uzumchilik",
            "message": "Tok barglarida kasallik alomatlari paydo bo‘ldi."
        }
        res = server.validate_consultation(valid)
        self.assertEqual(res["farmerName"], "Fermer Alisher")
        self.assertEqual(res["status"], "pending")

        with self.assertRaises(server.ValidationError):
            server.validate_consultation({**valid, "name": ""})
        with self.assertRaises(server.ValidationError):
            server.validate_consultation({**valid, "message": "kam"})

    def test_users_list_and_roles(self):
        self.assertGreaterEqual(len(server.DEFAULT_USERS), 15)
        admin = next((u for u in server.DEFAULT_USERS if u["username"] == "admin_agentlik"), None)
        self.assertIsNotNone(admin)
        self.assertEqual(admin["role"], "admin")

        andijon = next((u for u in server.DEFAULT_USERS if u["username"] == "andijon_agentlik"), None)
        self.assertIsNotNone(andijon)
        self.assertEqual(andijon["region"], "Andijon")
        self.assertEqual(andijon["role"], "regional")

        qqr = next((u for u in server.DEFAULT_USERS if u["username"] == "qqr_agentlik"), None)
        self.assertIsNotNone(qqr)
        self.assertEqual(qqr["region"], "Qoraqalpog‘iston Respublikasi")


if __name__ == "__main__":
    unittest.main()
