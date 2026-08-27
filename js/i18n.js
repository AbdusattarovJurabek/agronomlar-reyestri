/**
 * Agrosanoatni Rivojlantirish Agentligi - Malakali Agronomlar Milliy Reyestri
 * Ko‘p tillilik (i18n) tizimi: O‘zbekcha (uz), Русский (ru), English (en)
 */

const I18N_TRANSLATIONS = {
  uz: {
    // Top Bar & Branding
    gov_portal_name: "O‘zbekiston Respublikasi Agrosanoatni rivojlantirish agentligi",
    btn_login: "Tizimga kirish",
    btn_staff_mgmt: "Xodimlar boshqaruvi",
    btn_change_pass: "Parolni o‘zgartirish",
    btn_logout: "Chiqish",
    badge_staff: "Agentlik xodimi",
    badge_official: "Rasmiy Reyestr",
    badge_agency_system: "Agentlik Axborot Tizimi",
    brand_title: "AGROSANOATNI RIVOJLANTIRISH AGENTLIGI",
    brand_subtitle: "MALAKALI AGRONOMLAR MILLIY REYESTRI VA AXBOROT TIZIMI",

    // Hero Section
    hero_tag: "Bog‘dorchilik va Uzumchilik Yo‘nalishida Axborot Portali",
    hero_title: "Республикада фаолият юритаётган малакали агрономлар РЎЙХАТИ",
    hero_desc: "Agrosanoatni rivojlantirish agentligining viloyat boshqarmalari va hududiy mutaxassislari tomonidan yuritiluvchi intensiv bog‘dorchilik, tokchilik, tomchilatib sug‘orish va agrotexnika bo‘yicha malakali agronom-maslahatchilar yagona elektron bazasi.",
    btn_add_agronomist: "Yangi agronom kiritish",
    btn_bulk_import: "Excel / CSV yuklash",
    btn_export_csv: "Excel eksport (.csv)",
    btn_export_respublika: "Respublika eksport (.csv)",
    btn_export_regional: "eksport (.csv)",
    btn_print: "Chop etish",
    regional_banner_prefix: "Siz Agrosanoatni rivojlantirish agentligi",
    regional_banner_suffix: "viloyati boshqarmasi mas'ul xodimisiz.",
    admin_banner_text: "Siz Agrosanoatni rivojlantirish agentligi Bosh Administratori sifatida tizimdasiz. Barcha hududlar xodimlari va agronomlarini to‘liq boshqarishingiz mumkin.",

    // Live Stats
    stat_total_label: "Jami malakali agronomlar",
    stat_regions_label: "Qamrab olingan hududlar",
    stat_edu_label: "Oliy ma’lumotli mutaxassislar",
    stat_fruit_label: "Bog‘ & uzumchilik maslahatchilari",

    // Filters & Search
    filter_search_label: "Qidiruv:",
    filter_search_placeholder: "F.I.SH., tuman, o‘quv yurti yoki yo‘nalish bo‘yicha qidirish...",
    filter_region_label: "Ҳудуд:",
    filter_region_all: "Barcha hududlar (14 ta)",
    filter_district_label: "Туман:",
    filter_district_all: "Barcha tumanlar",
    filter_district_prompt: "-- Avval viloyatni tanlang --",
    btn_reset: "Tozalash",
    spec_label: "Maslahat yo‘nalishi:",
    spec_all: "Barchasi",
    spec_gardening: "Bog‘dorchilik",
    spec_viticulture: "Uzumchilik",
    spec_protection: "O‘simliklar himoyasi",
    spec_irrigation: "Tomchilatib sug‘orish",
    spec_subtropical: "Subtropik ekinlar",
    view_table: "Jadval",
    view_cards: "Kartochkalar",

    // Results & Table
    results_showing: "Ko‘rsatilmoqda:",
    results_of: "tadan",
    results_agronomists: "ta agronom",
    quick_add_link: "Yangi agronom qo‘shish",
    th_num: "№",
    th_region: "Ҳудуд",
    th_district: "Туман",
    th_fullname: "Малакали агроном: Ф.I.SH.",
    th_phone: "Телефон рақами",
    th_birth: "Туғилган йили",
    th_spec: "Мутахассислиги",
    th_university: "Тамомлаган ўқув юрти",
    th_grad_year: "Тамомлаган йили",
    th_actions: "Amallar",
    btn_consult: "Maslahat",
    btn_edit: "Tahrirlash",
    btn_delete: "O‘chirish",
    empty_title: "Hech qanday ma’lumot topilmadi",
    empty_desc: "Kiritilgan so‘rov yoki tanlangan filtrlarga mos agronom mutaxassis topilmadi.",

    // Modal 1: Add / Edit Agronomist
    modal_agro_add_title: "Yangi Malakali Agronom Kiritish",
    modal_agro_edit_title: "Agronom Ma’lumotlarini Tahrirlash",
    modal_agro_region_lock: "Biriktirilgan hudud:",
    modal_agro_region_lock_note: "(faqat o‘z hududingizga kiritasiz)",
    lbl_region: "Ҳудуд номи (Viloyat)",
    lbl_district: "Туман номи",
    lbl_fullname: "Малакали агроном: Фамилия, исми ва отасининг исми",
    lbl_phone: "Телефон рақами",
    lbl_birth: "Туғилган кун, ой ва йили",
    lbl_spec: "Мутахассислиги",
    lbl_university: "Тамомлаган ўқув юрти",
    lbl_grad_year: "Тамомлаган йили",
    lbl_direction: "Maslahat yo‘nalishi va mutaxassisligi",
    lbl_experience: "Ish tajribasi",
    lbl_status: "Holati",
    opt_status_active: "Faol (Maslahat beradi)",
    opt_status_busy: "Vaqtincha band",
    opt_status_inactive: "Faol emas",
    btn_cancel: "Bekor qilish",
    btn_save: "Saqlash",

    // Modal 2: Bulk Import
    modal_import_title: "Excel / CSV Fayldan Ommaviy Yuklash",
    modal_import_lock_note: "Yuklanayotgan barcha agronomlar avtomatik tarzda biriktiriladi:",
    modal_import_guide: "Excel yoki CSV fayldan agronomlar ro‘yxatini bir zumda bazaga yuklang. Ustunlar tartibi:",
    btn_download_template: "Namuna CSV shablonini yuklab olish",
    dropzone_title: "Faylni shu yerga tashlang yoki tanlang",
    dropzone_desc: "CSV, TSV yoki JSON formatdagi fayllar qo‘llab-quvvatlanadi (Maks: 5MB)",
    btn_browse_file: "Faylni tanlash",
    preview_found: "Aniqlangan yozuvlar:",
    preview_ready: "Tayyor",
    btn_start_import: "Bazaga yuklash",

    // Modal 3: Consultation
    modal_consult_title: "Agronomdan Maslahat So‘rash",
    lbl_farmer_name: "Ism, familiyangiz (Fermer/Dehqon)",
    lbl_farmer_phone: "Telefon raqamingiz",
    lbl_consult_topic: "Maslahat mavzusi",
    lbl_consult_msg: "Savolingiz yoki muammo tavsifi",
    topic_orchard: "Intensiv bog‘dorchilik",
    topic_grapes: "Uzumchilik va tok parvarishi",
    topic_protection: "Zararkunanda va kasalliklarga qarshi kurash",
    topic_drip: "Tomchilatib sug‘orish tizimlari",
    topic_nursery: "Ko‘chatchilik va payvandlash",
    topic_other: "Boshqa agrotexnik maslahatlar",
    btn_send_consult: "So‘rovni yuborish",

    // Modal 4: Login
    modal_login_title: "Tizimga Kirish",
    login_intro: "Agrosanoatni rivojlantirish agentligi viloyat mas'ul xodimi yoki Bosh Administrator hisobingiz orqali kiring:",
    lbl_login_username: "Login",
    lbl_login_password: "Parol",
    btn_submit_login: "Kirish",

    // Modal 5: Staff Management (Admin)
    modal_staff_title: "Agentlik Viloyat Xodimlarini Yaratish va Boshqarish",
    staff_create_title: "Yangi Viloyat Xodimini Qo‘shish",
    staff_create_subtext: "Admin tomonidan agentlik hududiy bo‘limi uchun login va parol berish",
    lbl_staff_region: "Biriktirilgan Viloyat",
    lbl_staff_username: "Login (Foydalanuvchi)",
    lbl_staff_password: "Boshlang‘ich Parol",
    lbl_staff_name: "Mas'ul xodim F.I.SH.",
    btn_create_staff: "Xodimni yaratish",
    staff_list_title: "Agentlik Viloyat Xodimlari Reyestri",
    btn_print_list: "Ro‘yxatni chop etish",
    th_staff_num: "№",
    th_staff_region: "Ҳудуд номи",
    th_staff_login: "Login",
    th_staff_password: "Parol",
    th_staff_name: "F.I.SH. / Lavozimi",
    th_staff_last_login: "Oxirgi kirish",
    th_staff_actions: "Amallar",
    btn_close: "Yopish",

    // Modal 6: Change Password
    modal_password_title: "Parolni O‘zgartirish",
    lbl_old_password: "Amaldagi parol",
    lbl_new_password: "Yangi parol (kamida 4 ta belgi)",
    lbl_confirm_password: "Yangi parolni takrorlang",

    // Footer
    footer_title: "O‘zbekiston Respublikasi Agrosanoatni rivojlantirish agentligi",
    footer_subtitle: "Malakali agronomlar milliy reyestri va axborot tizimi.",
    footer_copy: "© 2026 Barcha huquqlar himoyalangan."
  },

  ru: {
    // Top Bar & Branding
    gov_portal_name: "Агентство по развитию агропромышленности Республики Узбекистан",
    btn_login: "Вход в систему",
    btn_staff_mgmt: "Управление сотрудниками",
    btn_change_pass: "Сменить пароль",
    btn_logout: "Выход",
    badge_staff: "Сотрудник Агентства",
    badge_official: "Официальный реестр",
    badge_agency_system: "Информационная система Агентства",
    brand_title: "АГЕНТСТВО ПО РАЗВИТИЮ АГРОПРОМЫШЛЕННОСТИ",
    brand_subtitle: "НАЦИОНАЛЬНЫЙ РЕЕСТР КВАЛИФИЦИРОВАННЫХ АГРОНОМОВ И ИНФОРМАЦИОННАЯ СИСТЕМА",

    // Hero Section
    hero_tag: "Информационный портал по садоводству и виноградарству",
    hero_title: "СПИСОК квалифицированных агрономов, работающих в Республике",
    hero_desc: "Единая электронная база квалифицированных агрономов-консультантов по интенсивному садоводству, виноградарству, капельному орошению и агротехнике, ведомая территориальными управлениями Агентства по развитию агропромышленности.",
    btn_add_agronomist: "Добавить агронома",
    btn_bulk_import: "Импорт Excel / CSV",
    btn_export_csv: "Экспорт в Excel (.csv)",
    btn_export_respublika: "Экспорт по Республике (.csv)",
    btn_export_regional: "экспорт (.csv)",
    btn_print: "Печать",
    regional_banner_prefix: "Вы являетесь ответственным сотрудником управления Агентства по развитию агропромышленности по",
    regional_banner_suffix: "области.",
    admin_banner_text: "Вы вошли как Главный Администратор Агентства по развитию агропромышленности. У вас есть полный доступ ко всем регионам и сотрудникам.",

    // Live Stats
    stat_total_label: "Всего квалифицированных агрономов",
    stat_regions_label: "Охваченные регионы",
    stat_edu_label: "Специалисты с высшим образованием",
    stat_fruit_label: "Консультанты по садам и виноградникам",

    // Filters & Search
    filter_search_label: "Поиск:",
    filter_search_placeholder: "Поиск по Ф.И.О., району, вузу или направлению...",
    filter_region_label: "Регион:",
    filter_region_all: "Все регионы (14)",
    filter_district_label: "Район:",
    filter_district_all: "Все районы",
    filter_district_prompt: "-- Сначала выберите регион --",
    btn_reset: "Сброс",
    spec_label: "Направление консультаций:",
    spec_all: "Все",
    spec_gardening: "Садоводство",
    spec_viticulture: "Виноградарство",
    spec_protection: "Защита растений",
    spec_irrigation: "Капельное орошение",
    spec_subtropical: "Субтропические культуры",
    view_table: "Таблица",
    view_cards: "Карточки",

    // Results & Table
    results_showing: "Показано:",
    results_of: "из",
    results_agronomists: "агрономов",
    quick_add_link: "Добавить нового агронома",
    th_num: "№",
    th_region: "Регион",
    th_district: "Район",
    th_fullname: "Ф.И.О. агронома",
    th_phone: "Номер телефона",
    th_birth: "Год рождения",
    th_spec: "Специальность",
    th_university: "Оконченное учебное заведение",
    th_grad_year: "Год окончания",
    th_actions: "Действия",
    btn_consult: "Консультация",
    btn_edit: "Редактировать",
    btn_delete: "Удалить",
    empty_title: "Ничего не найдено",
    empty_desc: "По вашему запросу или выбранным фильтрам квалифицированные специалисты не найдены.",

    // Modal 1: Add / Edit Agronomist
    modal_agro_add_title: "Внесение нового квалифицированного агронома",
    modal_agro_edit_title: "Редактирование данных агронома",
    modal_agro_region_lock: "Закрепленный регион:",
    modal_agro_region_lock_note: "(вносится только для вашего региона)",
    lbl_region: "Регион",
    lbl_district: "Район",
    lbl_fullname: "Ф.И.О. квалифицированного агронома",
    lbl_phone: "Номер телефона",
    lbl_birth: "Число, месяц и год рождения",
    lbl_spec: "Специальность",
    lbl_university: "Оконченное учебное заведение",
    lbl_grad_year: "Год окончания",
    lbl_direction: "Направление консультаций и специализация",
    lbl_experience: "Опыт работы",
    lbl_status: "Статус",
    opt_status_active: "Активен (Консультирует)",
    opt_status_busy: "Временно занят",
    opt_status_inactive: "Не активен",
    btn_cancel: "Отмена",
    btn_save: "Сохранить",

    // Modal 2: Bulk Import
    modal_import_title: "Массовая загрузка из Excel / CSV файлов",
    modal_import_lock_note: "Все загружаемые агрономы будут автоматически прикреплены к региону:",
    modal_import_guide: "Быстро загрузите список агрономов из файлов Excel или CSV. Порядок колонок:",
    btn_download_template: "Скачать пример CSV шаблона",
    dropzone_title: "Перетащите файл сюда или выберите",
    dropzone_desc: "Поддерживаются форматы CSV, TSV или JSON (Макс: 5МБ)",
    btn_browse_file: "Выбрать файл",
    preview_found: "Найдено записей:",
    preview_ready: "Готово",
    btn_start_import: "Загрузить в базу",

    // Modal 3: Consultation
    modal_consult_title: "Запросить консультацию у агронома",
    lbl_farmer_name: "Ваше имя и фамилия (Фермер/Дехканин)",
    lbl_farmer_phone: "Ваш номер телефона",
    lbl_consult_topic: "Тема консультации",
    lbl_consult_msg: "Ваш вопрос или описание проблемы",
    topic_orchard: "Интенсивное садоводство",
    topic_grapes: "Виноградарство и уход за лозой",
    topic_protection: "Борьба с вредителями и болезнями",
    topic_drip: "Системы капельного орошения",
    topic_nursery: "Питомниководство и прививка",
    topic_other: "Другие агротехнические консультации",
    btn_send_consult: "Отправить запрос",

    // Modal 4: Login
    modal_login_title: "Вход в систему",
    login_intro: "Войдите с учетной записью ответственного сотрудника Агентства или Главного Администратора:",
    lbl_login_username: "Логин",
    lbl_login_password: "Пароль",
    btn_submit_login: "Войти",

    // Modal 5: Staff Management (Admin)
    modal_staff_title: "Создание и управление сотрудниками Агентства",
    staff_create_title: "Добавить нового регионального сотрудника",
    staff_create_subtext: "Выдача логина и пароля для регионального управления Агентства администратором",
    lbl_staff_region: "Закрепленный регион",
    lbl_staff_username: "Логин (Пользователь)",
    lbl_staff_password: "Первоначальный пароль",
    lbl_staff_name: "Ф.И.О. ответственного сотрудника",
    btn_create_staff: "Создать сотрудника",
    staff_list_title: "Реестр региональных сотрудников Агентства",
    btn_print_list: "Печать реестра",
    th_staff_num: "№",
    th_staff_region: "Регион",
    th_staff_login: "Логин",
    th_staff_password: "Пароль",
    th_staff_name: "Ф.И.О. / Должность",
    th_staff_last_login: "Последний вход",
    th_staff_actions: "Действия",
    btn_close: "Закрыть",

    // Modal 6: Change Password
    modal_password_title: "Смена пароля",
    lbl_old_password: "Текущий пароль",
    lbl_new_password: "Новый пароль (минимум 4 символа)",
    lbl_confirm_password: "Повторите новый пароль",

    // Footer
    footer_title: "Агентство по развитию агропромышленности Республики Узбекистан",
    footer_subtitle: "Национальный реестр квалифицированных агрономов и информационная система.",
    footer_copy: "© 2026 Все права защищены."
  },

  en: {
    // Top Bar & Branding
    gov_portal_name: "Agro-industry Development Agency of the Republic of Uzbekistan",
    btn_login: "Sign In",
    btn_staff_mgmt: "Staff Management",
    btn_change_pass: "Change Password",
    btn_logout: "Sign Out",
    badge_staff: "Agency Staff",
    badge_official: "Official Registry",
    badge_agency_system: "Agency Information System",
    brand_title: "AGRO-INDUSTRY DEVELOPMENT AGENCY",
    brand_subtitle: "NATIONAL REGISTRY OF QUALIFIED AGRONOMISTS AND INFORMATION SYSTEM",

    // Hero Section
    hero_tag: "Horticulture and Viticulture Information Portal",
    hero_title: "LIST of Qualified Agronomists Operating in the Republic",
    hero_desc: "Unified electronic database of qualified agronomist-consultants in intensive horticulture, viticulture, drip irrigation, and agrotechnology maintained by regional departments of the Agro-industry Development Agency.",
    btn_add_agronomist: "Add Agronomist",
    btn_bulk_import: "Import Excel / CSV",
    btn_export_csv: "Export to Excel (.csv)",
    btn_export_respublika: "National Export (.csv)",
    btn_export_regional: "export (.csv)",
    btn_print: "Print",
    regional_banner_prefix: "You are logged in as the Agro-industry Development Agency officer for",
    regional_banner_suffix: "region.",
    admin_banner_text: "You are logged in as the Chief Administrator of the Agro-industry Development Agency. You have full control over all regions and staff.",

    // Live Stats
    stat_total_label: "Total Qualified Agronomists",
    stat_regions_label: "Covered Regions",
    stat_edu_label: "Higher Education Specialists",
    stat_fruit_label: "Orchard & Vineyard Consultants",

    // Filters & Search
    filter_search_label: "Search:",
    filter_search_placeholder: "Search by full name, district, university or field...",
    filter_region_label: "Region:",
    filter_region_all: "All Regions (14)",
    filter_district_label: "District:",
    filter_district_all: "All Districts",
    filter_district_prompt: "-- Select region first --",
    btn_reset: "Reset",
    spec_label: "Consultation Area:",
    spec_all: "All",
    spec_gardening: "Horticulture",
    spec_viticulture: "Viticulture",
    spec_protection: "Plant Protection",
    spec_irrigation: "Drip Irrigation",
    spec_subtropical: "Subtropical Crops",
    view_table: "Table",
    view_cards: "Cards",

    // Results & Table
    results_showing: "Showing:",
    results_of: "of",
    results_agronomists: "agronomists",
    quick_add_link: "Add new agronomist",
    th_num: "№",
    th_region: "Region",
    th_district: "District",
    th_fullname: "Agronomist Full Name",
    th_phone: "Phone Number",
    th_birth: "Birth Year",
    th_spec: "Specialization",
    th_university: "University / Institution",
    th_grad_year: "Graduation Year",
    th_actions: "Actions",
    btn_consult: "Consult",
    btn_edit: "Edit",
    btn_delete: "Delete",
    empty_title: "No Records Found",
    empty_desc: "No qualified agronomists match your search criteria or selected filters.",

    // Modal 1: Add / Edit Agronomist
    modal_agro_add_title: "Register New Qualified Agronomist",
    modal_agro_edit_title: "Edit Agronomist Information",
    modal_agro_region_lock: "Assigned Region:",
    modal_agro_region_lock_note: "(locked to your jurisdiction)",
    lbl_region: "Region (Province)",
    lbl_district: "District",
    lbl_fullname: "Qualified Agronomist: Full Name",
    lbl_phone: "Phone Number",
    lbl_birth: "Date / Year of Birth",
    lbl_spec: "Specialization",
    lbl_university: "Graduated University / Institution",
    lbl_grad_year: "Graduation Year",
    lbl_direction: "Consultation Field & Specialty",
    lbl_experience: "Work Experience",
    lbl_status: "Status",
    opt_status_active: "Active (Providing Advice)",
    opt_status_busy: "Temporarily Busy",
    opt_status_inactive: "Inactive",
    btn_cancel: "Cancel",
    btn_save: "Save",

    // Modal 2: Bulk Import
    modal_import_title: "Bulk Import from Excel / CSV Files",
    modal_import_lock_note: "All imported agronomists will be automatically assigned to:",
    modal_import_guide: "Instantly import agronomist records from Excel or CSV files. Column order:",
    btn_download_template: "Download sample CSV template",
    dropzone_title: "Drag and drop file here or click to browse",
    dropzone_desc: "Supports CSV, TSV, or JSON files (Max: 5MB)",
    btn_browse_file: "Select File",
    preview_found: "Detected Records:",
    preview_ready: "Ready",
    btn_start_import: "Upload to Database",

    // Modal 3: Consultation
    modal_consult_title: "Request Consultation from Agronomist",
    lbl_farmer_name: "Your Name & Surname (Farmer/Grower)",
    lbl_farmer_phone: "Your Phone Number",
    lbl_consult_topic: "Consultation Topic",
    lbl_consult_msg: "Your Question or Problem Description",
    topic_orchard: "Intensive Horticulture",
    topic_grapes: "Viticulture and Grapevine Care",
    topic_protection: "Pest & Disease Control",
    topic_drip: "Drip Irrigation Systems",
    topic_nursery: "Seedling Nursery & Grafting",
    topic_other: "Other Agrotechnical Advice",
    btn_send_consult: "Submit Request",

    // Modal 4: Login
    modal_login_title: "System Sign In",
    login_intro: "Sign in with your Regional Agency Staff or Chief Administrator credentials:",
    lbl_login_username: "Username",
    lbl_login_password: "Password",
    btn_submit_login: "Sign In",

    // Modal 5: Staff Management (Admin)
    modal_staff_title: "Create and Manage Agency Staff Accounts",
    staff_create_title: "Add New Regional Staff Member",
    staff_create_subtext: "Administrator provisioning of login credentials for regional agency departments",
    lbl_staff_region: "Assigned Region",
    lbl_staff_username: "Username (Login)",
    lbl_staff_password: "Initial Password",
    lbl_staff_name: "Responsible Officer Full Name",
    btn_create_staff: "Create Account",
    staff_list_title: "Agency Regional Staff Registry",
    btn_print_list: "Print Staff List",
    th_staff_num: "№",
    th_staff_region: "Region",
    th_staff_login: "Login",
    th_staff_password: "Password",
    th_staff_name: "Officer / Position",
    th_staff_last_login: "Last Active",
    th_staff_actions: "Actions",
    btn_close: "Close",

    // Modal 6: Change Password
    modal_password_title: "Change Password",
    lbl_old_password: "Current Password",
    lbl_new_password: "New Password (min 4 chars)",
    lbl_confirm_password: "Confirm New Password",

    // Footer
    footer_title: "Agro-industry Development Agency of the Republic of Uzbekistan",
    footer_subtitle: "National registry of qualified agronomists and information system.",
    footer_copy: "© 2026 All rights reserved."
  }
};

// Region name translations for UI (Palonchi viloyat demasdan sof viloyat nomi)
const REGION_TRANSLATIONS = {
  uz: {
    "Qoraqalpog‘iston Respublikasi": "Qoraqalpog‘iston",
    "Qoraqalpog‘iston": "Qoraqalpog‘iston",
    "Andijon": "Andijon",
    "Buxoro": "Buxoro",
    "Farg‘ona": "Farg‘ona",
    "Jizzax": "Jizzax",
    "Xorazm": "Xorazm",
    "Namangan": "Namangan",
    "Navoiy": "Navoiy",
    "Qashqadaryo": "Qashqadaryo",
    "Samarqand": "Samarqand",
    "Sirdaryo": "Sirdaryo",
    "Surxondaryo": "Surxondaryo",
    "Toshkent viloyati": "Toshkent v.",
    "Toshkent shahri": "Toshkent sh."
  },
  ru: {
    "Qoraqalpog‘iston Respublikasi": "Каракалпакстан",
    "Qoraqalpog‘iston": "Каракалпакстан",
    "Andijon": "Андижан",
    "Buxoro": "Бухара",
    "Farg‘ona": "Фергана",
    "Jizzax": "Джизак",
    "Xorazm": "Хорезм",
    "Namangan": "Наманган",
    "Navoiy": "Навои",
    "Qashqadaryo": "Кашкадарья",
    "Samarqand": "Самарканд",
    "Sirdaryo": "Сырдарья",
    "Surxondaryo": "Сурхандарья",
    "Toshkent viloyati": "Ташкентская обл.",
    "Toshkent shahri": "г. Ташкент"
  },
  en: {
    "Qoraqalpog‘iston Respublikasi": "Karakalpakstan",
    "Qoraqalpog‘iston": "Karakalpakstan",
    "Andijon": "Andijan",
    "Buxoro": "Bukhara",
    "Farg‘ona": "Fergana",
    "Jizzax": "Jizzakh",
    "Xorazm": "Khorezm",
    "Namangan": "Namangan",
    "Navoiy": "Navoi",
    "Qashqadaryo": "Kashkadarya",
    "Samarqand": "Samarkand",
    "Sirdaryo": "Syrdarya",
    "Surxondaryo": "Surkhandarya",
    "Toshkent viloyati": "Tashkent reg.",
    "Toshkent shahri": "Tashkent city"
  }
};

let currentLanguage = localStorage.getItem("agro_lang") || "uz";

function t(key, fallback = "") {
  const dict = I18N_TRANSLATIONS[currentLanguage] || I18N_TRANSLATIONS.uz;
  return dict[key] || (I18N_TRANSLATIONS.uz[key] || fallback || key);
}

function getRegionName(uzbekRegionName) {
  const dict = REGION_TRANSLATIONS[currentLanguage] || REGION_TRANSLATIONS.uz;
  return dict[uzbekRegionName] || uzbekRegionName;
}

function setLanguage(lang) {
  if (!I18N_TRANSLATIONS[lang]) lang = "uz";
  currentLanguage = lang;
  localStorage.setItem("agro_lang", lang);

  // Update active state in UI buttons
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // Update all DOM elements with data-i18n attributes
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (key) {
      el.textContent = t(key);
    }
  });

  // Update all DOM elements with data-i18n-html attributes
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    if (key) {
      el.innerHTML = t(key);
    }
  });

  // Update all placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) {
      el.placeholder = t(key);
    }
  });

  // Update all titles/tooltips
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    if (key) {
      el.title = t(key);
    }
  });

  // Re-render UI components if appState exists
  if (typeof window.onLanguageChanged === "function") {
    window.onLanguageChanged(lang);
  }
}

// Global exposure
window.I18N = {
  t,
  getRegionName,
  setLanguage,
  getLanguage: () => currentLanguage,
  TRANSLATIONS: I18N_TRANSLATIONS,
  REGIONS: REGION_TRANSLATIONS
};
