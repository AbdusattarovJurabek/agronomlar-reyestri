/**
 * Agrosanoatni Rivojlantirish Agentligi - Malakali Agronomlar Milliy Reyestri
 * Frontend Asosiy Skripti (js/app.js)
 * 3-Bosqichli Rol Arxitekturasi & Ko'p Tillilik (UZ, RU, EN)
 */

// O'zbekistonning barcha 14 ta hududi (Sof hudud nomlari)
const REGION_LIST = [
  "Qoraqalpog‘iston",
  "Andijon",
  "Buxoro",
  "Farg‘ona",
  "Jizzax",
  "Xorazm",
  "Namangan",
  "Navoiy",
  "Qashqadaryo",
  "Samarqand",
  "Sirdaryo",
  "Surxondaryo",
  "Toshkent v.",
  "Toshkent sh."
];

const UZBEKISTAN_REGIONS = {
  "Qoraqalpog‘iston": [
    "Amudaryo", "Beruniy", "Chimboy", "Ellikqal’a", "Kegeyli", "Mo‘ynoq",
    "Nukus", "Nukus shahri", "Qonliko‘l", "Qo‘ng‘irot", "Qorao‘zak",
    "Shumanay", "Taxtako‘pir", "To‘rtko‘l", "Xo‘jayli", "Bo‘zatov", "Taxiatosh"
  ],
  "Andijon": [
    "Andijon shahri", "Andijon", "Asaka", "Baliqchi", "Bo‘ston", "Buloqboshi",
    "Izboskan", "Jalaquduq", "Marhamat", "Oltinko‘l", "Paxtaobod",
    "Qo‘rg‘ontepa", "Shahrixon", "Ulug‘nor", "Xo‘jaobod", "Xonobod shahri"
  ],
  "Buxoro": [
    "Buxoro shahri", "Buxoro", "G‘ijduvon", "Jondor", "Kogon", "Kogon shahri",
    "Olot", "Peshku", "Qorako‘l", "Qorovulbozor", "Romitan", "Shofirkon", "Vobkent"
  ],
  "Farg‘ona": [
    "Farg‘ona shahri", "Marg‘ilon shahri", "Qo‘qon shahri", "Quvasoy shahri",
    "Bag‘dod", "Beshariq", "Buvayda", "Dang‘ara", "Farg‘ona", "Furqat",
    "Oltiariq", "Qo‘shtepa", "Quva", "Rishton", "So‘x", "Toshloq", "Uchko‘prik", "Yozyovon"
  ],
  "Jizzax": [
    "Jizzax shahri", "Arnasoy", "Baxmal", "Do‘stlik", "Forish", "G‘allaorol",
    "Sharof Rashidov", "Mirzacho‘l", "Paxtakor", "Yangiobod", "Zomin", "Zafarobod", "Zarbdor"
  ],
  "Xorazm": [
    "Urganch shahri", "Xiva shahri", "Bog‘ot", "Gurlan", "Hazorasp", "Tuproqqal’a",
    "Xiva", "Xonqa", "Qo‘shko‘pir", "Shovot", "Urganch", "Yangiariq", "Yangibozor"
  ],
  "Namangan": [
    "Namangan shahri", "Chortoq", "Chust", "Kosonsoy", "Mingbuloq", "Namangan",
    "Norin", "Pop", "To‘raqo‘rg‘on", "Uychi", "Uchqo‘rg‘on", "Yangiqo‘rg‘on", "Davlatobod", "Yangi Namangan"
  ],
  "Navoiy": [
    "Navoiy shahri", "Zarafshon shahri", "G‘ozg‘on shahri", "Karmana", "Konimex",
    "Qiziltepa", "Navbahor", "Nurota", "Tomdi", "Uchquduq", "Xatirchi"
  ],
  "Qashqadaryo": [
    "Qarshi shahri", "Shahrisabz shahri", "Chiroqchi", "Dehqonobod", "G‘uzor",
    "Kasbi", "Kitob", "Ko‘kdala", "Koson", "Mirishkor", "Muborak", "Nishon",
    "Qamashi", "Qarshi", "Shahrisabz", "Yakkabog‘"
  ],
  "Samarqand": [
    "Samarqand shahri", "Kattaqo‘rg‘on shahri", "Bulung‘ur", "Ishtixon", "Jomboy",
    "Kattaqo‘rg‘on", "Narpay", "Nurobod", "Oqdaryo", "Pastdarg‘om", "Paxtachi",
    "Poyariq", "Qo‘shrabot", "Samarqand", "Toyloq", "Urgut"
  ],
  "Sirdaryo": [
    "Guliston shahri", "Shirin shahri", "Yangiyer shahri", "Boyovut", "Dehqonobod",
    "Guliston", "Xovos", "Mirzaobod", "Oqoltin", "Sardoba", "Sayxunobod", "Sirdaryo"
  ],
  "Surxondaryo": [
    "Termiz shahri", "Angor", "Bandixon", "Boysun", "Denov", "Jarqo‘rg‘on",
    "Muzrabot", "Oltinsoy", "Qiziriq", "Qumqo‘rg‘on", "Sariosiyo", "Sherobod",
    "Sho‘rchi", "Termiz", "Uzun"
  ],
  "Toshkent v.": [
    "Nurafshon shahri", "Olmaliq shahri", "Angren shahri", "Bekobod shahri",
    "Chirchiq shahri", "Ohangaron shahri", "Yangiyo‘l shahri", "Bekobod",
    "Bo‘stonliq", "Bo‘ka", "Chinoz", "Qibray", "Parkent", "Piskent",
    "Quyi Chirchiq", "O‘rta Chirchiq", "Yuqori Chirchiq", "Yangiyo‘l", "Zangiota", "Toshkent tumani"
  ],
  "Toshkent sh.": [
    "Bektemir", "Chilonzor", "Hamza (Yashnobod)", "Mirobod", "Mirzo Ulug‘bek",
    "Olmazor", "Sergeli", "Shayxontohur", "Uchtepa", "Yakkasaroy", "Yunusobod", "Yangihayot"
  ]
};

// Eskirgan nomlar uchun moslik (Backward compatibility)
UZBEKISTAN_REGIONS["Qoraqalpog‘iston Respublikasi"] = UZBEKISTAN_REGIONS["Qoraqalpog‘iston"];
UZBEKISTAN_REGIONS["Toshkent viloyati"] = UZBEKISTAN_REGIONS["Toshkent v."];
UZBEKISTAN_REGIONS["Toshkent shahri"] = UZBEKISTAN_REGIONS["Toshkent sh."];

function normalizeRegion(r) {
  if (!r) return "";
  const s = String(r).trim();
  if (s.includes("Qoraqalpog")) return "Qoraqalpog‘iston";
  if (s.includes("Toshkent vil") || s.includes("Toshkent v")) return "Toshkent v.";
  if (s.includes("Toshkent sh")) return "Toshkent sh.";
  return s.replace(/\s+(viloyati|Respublikasi)$/i, "").trim();
}

// Ilova holati (State)
const appState = {
  agronomists: [],
  filtered: [],
  filters: {
    q: "",
    region: "",
    district: "",
    specialization: ""
  },
  viewMode: "table", // 'table' yoki 'card'
  pagination: {
    page: 1,
    pageSize: 20
  },
  importQueue: [],
  currentUser: null,
  token: localStorage.getItem("agro_token") || null
};

// Asosiy ishga tushirish
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  const initialLang = localStorage.getItem("agro_lang") || "uz";
  if (window.I18N) {
    window.I18N.setLanguage(initialLang);
  }
  initRegionDropdowns();
  initEventListeners();
  await initAuth();
  loadData();
  updateLiveDate();

  // Agar /admin yoki /login URL orqali kirsa va tizimga kirmagan bo'lsa login oynasini avtomatik ochish
  const path = window.location.pathname.toLowerCase();
  const search = window.location.search.toLowerCase();
  if (path.includes("admin") || path.includes("login") || search.includes("admin") || search.includes("login")) {
    if (!appState.currentUser) {
      openLoginModal();
    }
  }
});

// Til o'zgarganda qayta chizish
window.onLanguageChanged = function (lang) {
  updateLiveDate();
  initRegionDropdowns();
  updateRoleButtons();
  renderResults();
};

function updateLiveDate() {
  const dateEl = document.getElementById("currentDate");
  if (!dateEl) return;
  const now = new Date();
  const lang = window.I18N ? window.I18N.getLanguage() : "uz";
  const locale = lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "uz-UZ";
  const options = { year: "numeric", month: "long", day: "numeric" };
  dateEl.textContent = now.toLocaleDateString(locale, options);
}

// --------------------------------------------------------------------------
// AUTH & 3-TIER ROLE BOSHQARUVI
// --------------------------------------------------------------------------
async function initAuth() {
  const savedToken = localStorage.getItem("agro_token");
  if (!savedToken) {
    clearCurrentUser();
    return;
  }

  try {
    const res = await fetch("/api/auth/me", {
      headers: { "Authorization": `Bearer ${savedToken}` }
    });
    const data = await res.json();
    if (data.ok && data.user) {
      setCurrentUser(data.user, savedToken);
    } else {
      clearCurrentUser();
    }
  } catch (err) {
    const cachedUser = localStorage.getItem("agro_user");
    if (cachedUser) {
      try {
        setCurrentUser(JSON.parse(cachedUser), savedToken);
      } catch (e) {
        clearCurrentUser();
      }
    } else {
      clearCurrentUser();
    }
  }
}

function updateRoleButtons() {
  const user = appState.currentUser;
  const heroActions = document.getElementById("heroActionsWrapper");
  const quickAddBox = document.getElementById("quickAddLinkBox");
  const exportBtn = document.getElementById("exportCsvBtn");
  const adminStaffBtn = document.getElementById("openStaffMgmtBtn");
  const regionalInfoBar = document.getElementById("regionalInfoBar");
  const adminInfoBar = document.getElementById("adminInfoBar");
  const bannerRegionName = document.getElementById("bannerRegionName");
  const t = window.I18N ? window.I18N.t : (k) => k;
  const getReg = window.I18N ? window.I18N.getRegionName : (r) => r;

  if (!user) {
    if (heroActions) heroActions.style.display = "none";
    if (quickAddBox) quickAddBox.style.display = "none";
    if (adminStaffBtn) adminStaffBtn.style.display = "none";
    if (regionalInfoBar) regionalInfoBar.style.display = "none";
    if (adminInfoBar) adminInfoBar.style.display = "none";
    return;
  }

  if (heroActions) heroActions.style.display = "flex";
  if (quickAddBox) quickAddBox.style.display = "block";

  if (user.role === "admin") {
    if (adminStaffBtn) adminStaffBtn.style.display = "inline-flex";
    if (adminInfoBar) adminInfoBar.style.display = "flex";
    if (regionalInfoBar) regionalInfoBar.style.display = "none";
    if (exportBtn) exportBtn.innerHTML = `<i class="fas fa-file-download"></i> <span>${t("btn_export_respublika")}</span>`;
  } else {
    if (adminStaffBtn) adminStaffBtn.style.display = "none";
    if (adminInfoBar) adminInfoBar.style.display = "none";
    if (regionalInfoBar) {
      regionalInfoBar.style.display = "flex";
      if (bannerRegionName) bannerRegionName.textContent = getReg(user.region);
    }
    if (exportBtn) exportBtn.innerHTML = `<i class="fas fa-file-download"></i> <span>${getReg(user.region)} ${t("btn_export_regional")}</span>`;
  }
}

function setCurrentUser(user, token) {
  appState.currentUser = user;
  appState.token = token;
  localStorage.setItem("agro_token", token);
  localStorage.setItem("agro_user", JSON.stringify(user));

  // 1. Header auth controls
  document.getElementById("authGuestBox").style.display = "none";
  document.getElementById("authUserBox").style.display = "flex";
  document.getElementById("userDisplayName").textContent = user.displayName || user.username;

  const regionFilter = document.getElementById("regionFilter");
  if (user.role === "regional") {
    appState.filters.region = user.region;
    if (regionFilter) {
      regionFilter.value = user.region;
      regionFilter.disabled = true;
    }
    const districtSelect = document.getElementById("districtFilter");
    if (districtSelect) {
      const t = window.I18N ? window.I18N.t : (k) => k;
      districtSelect.innerHTML = `<option value="">${t("filter_district_all")}</option>`;
      const distList = UZBEKISTAN_REGIONS[user.region] || UZBEKISTAN_REGIONS[normalizeRegion(user.region)];
      if (distList && distList.length) {
        districtSelect.disabled = false;
        distList.forEach(dist => {
          const opt = document.createElement("option");
          opt.value = dist;
          opt.textContent = dist;
          districtSelect.appendChild(opt);
        });
      }
    }
  } else {
    appState.filters.region = "";
    if (regionFilter) {
      regionFilter.disabled = false;
    }
  }

  // 2. Action bars based on Role
  updateRoleButtons();
  applyFilters();
}

function clearCurrentUser() {
  appState.currentUser = null;
  appState.token = null;
  localStorage.removeItem("agro_token");
  localStorage.removeItem("agro_user");

  // ROL 1: ODDIY FOYDALANUVCHI (MEHMON)
  document.getElementById("authGuestBox").style.display = "flex";
  document.getElementById("authUserBox").style.display = "none";

  const regionFilter = document.getElementById("regionFilter");
  if (regionFilter) {
    regionFilter.disabled = false;
    regionFilter.value = "";
  }
  appState.filters.region = "";

  updateRoleButtons();
  applyFilters();
}

function canManageItem(item) {
  if (!appState.currentUser) return false;
  if (appState.currentUser.role === "admin") return true;
  return normalizeRegion(appState.currentUser.region) === normalizeRegion(item.region);
}

// Fetch yordamchisi (Avtomatik token qo'shadi)
async function authFetch(url, options = {}) {
  const headers = options.headers || {};
  if (appState.token) {
    headers["Authorization"] = `Bearer ${appState.token}`;
  }
  options.headers = headers;

  const res = await fetch(url, options);
  if (res.status === 401 && appState.token) {
    showToast(window.I18N ? window.I18N.t("login_intro") : "Sessiya vaqti tugadi. Qaytadan kiring.", "error");
    clearCurrentUser();
  }
  return res;
}

// --------------------------------------------------------------------------
// THEME & DROPDOWNS
// --------------------------------------------------------------------------
function initTheme() {
  const saved = localStorage.getItem("agro_theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon(saved);

  document.getElementById("themeToggleBtn")?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("agro_theme", next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("themeIcon");
  if (icon) {
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
}

function initRegionDropdowns() {
  const filterRegion = document.getElementById("regionFilter");
  const modalRegion = document.getElementById("agroRegion");
  const newStaffRegion = document.getElementById("newStaffRegion");
  const t = window.I18N ? window.I18N.t : (k) => k;
  const getReg = window.I18N ? window.I18N.getRegionName : (r) => r;

  const currentValFilter = filterRegion ? filterRegion.value : "";
  const currentValModal = modalRegion ? modalRegion.value : "";
  const currentValStaff = newStaffRegion ? newStaffRegion.value : "";

  if (filterRegion) filterRegion.innerHTML = `<option value="">${t("filter_region_all")}</option>`;
  if (modalRegion) modalRegion.innerHTML = `<option value="">${t("filter_district_prompt")}</option>`;
  if (newStaffRegion) newStaffRegion.innerHTML = `<option value="">${t("filter_district_prompt")}</option>`;

  REGION_LIST.forEach(region => {
    const localizedName = getReg(region);

    if (filterRegion) {
      const opt1 = document.createElement("option");
      opt1.value = region;
      opt1.textContent = localizedName;
      if (normalizeRegion(region) === normalizeRegion(currentValFilter)) opt1.selected = true;
      filterRegion.appendChild(opt1);
    }

    if (modalRegion) {
      const opt2 = document.createElement("option");
      opt2.value = region;
      opt2.textContent = localizedName;
      if (normalizeRegion(region) === normalizeRegion(currentValModal)) opt2.selected = true;
      modalRegion.appendChild(opt2);
    }

    if (newStaffRegion) {
      const opt3 = document.createElement("option");
      opt3.value = region;
      opt3.textContent = localizedName;
      if (normalizeRegion(region) === normalizeRegion(currentValStaff)) opt3.selected = true;
      newStaffRegion.appendChild(opt3);
    }
  });

  // Filter cascading
  filterRegion?.addEventListener("change", (e) => {
    const selectedRegion = e.target.value;
    const districtSelect = document.getElementById("districtFilter");
    if (!districtSelect) return;

    districtSelect.innerHTML = `<option value="">${t("filter_district_all")}</option>`;
    const distList = UZBEKISTAN_REGIONS[selectedRegion] || UZBEKISTAN_REGIONS[normalizeRegion(selectedRegion)];
    if (distList && distList.length) {
      districtSelect.disabled = false;
      distList.forEach(dist => {
        const opt = document.createElement("option");
        opt.value = dist;
        opt.textContent = dist;
        districtSelect.appendChild(opt);
      });
    } else {
      districtSelect.disabled = true;
    }
    appState.filters.region = selectedRegion;
    appState.filters.district = "";
    appState.pagination.page = 1;
    applyFilters();
  });

  // Modal cascading
  modalRegion?.addEventListener("change", (e) => {
    const selectedRegion = e.target.value;
    updateDistrictOptionsForModal(selectedRegion);
  });
}

function updateDistrictOptionsForModal(selectedRegion, selectedDistrict = "") {
  const districtSelect = document.getElementById("agroDistrict");
  if (!districtSelect) return;
  const t = window.I18N ? window.I18N.t : (k) => k;

  districtSelect.innerHTML = `<option value="">${t("filter_district_prompt")}</option>`;
  const distList = UZBEKISTAN_REGIONS[selectedRegion] || UZBEKISTAN_REGIONS[normalizeRegion(selectedRegion)];
  if (distList && distList.length) {
    districtSelect.disabled = false;
    distList.forEach(dist => {
      const opt = document.createElement("option");
      opt.value = dist;
      opt.textContent = dist;
      if (dist === selectedDistrict) opt.selected = true;
      districtSelect.appendChild(opt);
    });
  } else {
    districtSelect.disabled = true;
  }
}

// --------------------------------------------------------------------------
// DATA LOADING & RENDERING
// --------------------------------------------------------------------------
async function loadData() {
  try {
    const [agroRes, statsRes] = await Promise.all([
      fetch("/api/agronomists"),
      fetch("/api/stats")
    ]);
    const agroData = await agroRes.json();
    const statsData = await statsRes.json();

    if (agroData.ok) {
      appState.agronomists = agroData.agronomists || [];
      applyFilters();
    }

    if (statsData.ok) {
      updateStats(statsData);
    }
  } catch (err) {
    showToast("Ma’lumotlarni yuklashda xatolik yuz berdi", "error");
  }
}

function updateStats() {
  const user = appState.currentUser;
  const isRegional = user && user.role === "regional";
  const list = isRegional
    ? appState.agronomists.filter(a => normalizeRegion(a.region) === normalizeRegion(user.region))
    : appState.agronomists;

  const total = list.length;
  const regionsCount = isRegional ? 1 : new Set(list.map(a => a.region)).size;
  const higherEduCount = list.filter(a => (a.university || "").length > 3).length;
  const higherEduPercent = total ? Math.round((higherEduCount / total) * 100) : 100;
  const fruitGrapeCount = list.filter(a => {
    const text = ((a.direction || "") + " " + (a.specialization || "")).toLowerCase();
    return ["bog‘", "bog", "uzum", "tok", "meva"].some(k => text.includes(k));
  }).length;

  document.getElementById("statTotal").textContent = total;
  document.getElementById("statRegions").textContent = regionsCount;
  document.getElementById("statFruitGrape").textContent = fruitGrapeCount;
  document.getElementById("statHigherEdu").textContent = `${higherEduPercent}%`;
}

function applyFilters() {
  const { q, region, district, specialization } = appState.filters;
  const user = appState.currentUser;
  const isRegional = user && user.role === "regional";
  const targetRegion = isRegional ? user.region : region;

  appState.filtered = appState.agronomists.filter(item => {
    if (isRegional) {
      if (normalizeRegion(item.region) !== normalizeRegion(user.region)) {
        return false;
      }
    } else if (targetRegion) {
      const normFilter = normalizeRegion(targetRegion);
      const normItem = normalizeRegion(item.region);
      if (normFilter !== normItem && item.region !== targetRegion) return false;
    }
    if (district && item.district !== district) return false;

    if (specialization) {
      const combined = (item.specialization + " " + (item.direction || "")).toLowerCase();
      if (!combined.includes(specialization.toLowerCase())) return false;
    }

    if (q) {
      const searchable = [
        item.fullName,
        item.region,
        item.district,
        item.specialization,
        item.university,
        item.direction,
        item.phone
      ].join(" ").toLowerCase();
      if (!searchable.includes(q.toLowerCase())) return false;
    }

    return true;
  });

  updateStats();
  renderResults();
}

function renderResults() {
  const total = appState.filtered.length;
  document.getElementById("resultsCount").textContent = total;
  document.getElementById("totalCount").textContent = appState.agronomists.length;

  const emptyState = document.getElementById("emptyState");
  const tableWrapper = document.getElementById("tableViewContainer");
  const cardWrapper = document.getElementById("cardViewContainer");
  const paginationWrapper = document.getElementById("paginationWrapper");

  if (total === 0) {
    emptyState.hidden = false;
    tableWrapper.hidden = true;
    cardWrapper.hidden = true;
    paginationWrapper.hidden = true;
    return;
  }

  emptyState.hidden = true;

  // Pagination slice
  const page = appState.pagination.page;
  const pageSize = appState.pagination.pageSize;
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const pageItems = appState.filtered.slice(startIdx, endIdx);

  if (appState.viewMode === "table") {
    tableWrapper.hidden = false;
    cardWrapper.hidden = true;
    renderTableView(pageItems, startIdx + 1);
  } else {
    tableWrapper.hidden = true;
    cardWrapper.hidden = false;
    renderCardView(pageItems);
  }

  paginationWrapper.hidden = false;
  renderPagination(total);
}

function formatFullName(fullName) {
  if (!fullName) return "—";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `<div class="name-surname">${escapeHtml(parts[0])}</div><div class="name-rest">${escapeHtml(parts.slice(1).join(" "))}</div>`;
  }
  return `<div class="name-surname">${escapeHtml(fullName)}</div>`;
}

function formatShortPhone(phone) {
  if (!phone) return "—";
  const digits = String(phone).replace(/[^\d]/g, "");
  let nine = digits;
  if (digits.startsWith("998") && digits.length >= 12) {
    nine = digits.slice(3, 12);
  } else if (digits.length > 9) {
    nine = digits.slice(-9);
  }
  if (nine.length === 9) {
    return `${nine.slice(0, 2)} ${nine.slice(2, 5)}-${nine.slice(5, 7)}-${nine.slice(7, 9)}`;
  }
  return phone;
}

function formatBirthYear(birthDate) {
  if (!birthDate) return "—";
  const str = String(birthDate).trim();
  const m = str.match(/\b(19\d{2}|20\d{2})\b/);
  if (m) return m[1];
  const parts = str.replace(/\//g, '.').split('.');
  if (parts.length >= 3 && parts[parts.length - 1].length === 2) {
    const y = parseInt(parts[parts.length - 1], 10);
    return String(y > 30 ? 1900 + y : 2000 + y);
  }
  return str;
}

function renderTableView(items, startNumber) {
  const tbody = document.getElementById("agronomistsTableBody");
  tbody.innerHTML = "";
  const t = window.I18N ? window.I18N.t : (k) => k;
  const getReg = window.I18N ? window.I18N.getRegionName : (r) => r;

  items.forEach((item, index) => {
    const tr = document.createElement("tr");
    const canManage = canManageItem(item);
    const localizedRegion = getReg(item.region);
    const shortPhone = formatShortPhone(item.phone);
    const rawDigits = String(item.phone).replace(/[^\d]/g, "");
    const birthYear = formatBirthYear(item.birthDate);

    tr.innerHTML = `
      <td class="col-num">${startNumber + index}</td>
      <td class="col-region">
        <span class="region-pill">${escapeHtml(localizedRegion)}</span>
      </td>
      <td class="col-district">${escapeHtml(item.district)}</td>
      <td class="col-name clickable-name" onclick="openDetailsModal(${item.id})" title="${t('btn_details')}">
        ${formatFullName(item.fullName)}
      </td>
      <td class="col-phone">
        <a href="tel:+998${escapeHtml(rawDigits.slice(-9))}" class="phone-link">
          <i class="fas fa-phone-alt"></i> ${escapeHtml(shortPhone)}
        </a>
      </td>
      <td class="col-birth">${escapeHtml(birthYear)}</td>
      <td class="col-spec">${escapeHtml(item.specialization || "Agronom")}</td>
      <td class="col-actions">
        <div class="table-actions">
          <button class="btn-action-view" onclick="openDetailsModal(${item.id})" title="${t('btn_details')}">
            <i class="fas fa-eye"></i> <span>${t('btn_details')}</span>
          </button>
          ${canManage ? `
            <button class="btn-action btn-action-edit" onclick="openEditModal(${item.id})" title="${t('btn_edit')}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn-action btn-action-danger" onclick="deleteAgronomist(${item.id})" title="${t('btn_delete')}">
              <i class="fas fa-trash-alt"></i>
            </button>
          ` : ""}
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderCardView(items) {
  const grid = document.getElementById("agronomistsCardsGrid");
  grid.innerHTML = "";
  const t = window.I18N ? window.I18N.t : (k) => k;
  const getReg = window.I18N ? window.I18N.getRegionName : (r) => r;

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "agro-card";
    const canManage = canManageItem(item);
    const localizedRegion = getReg(item.region);
    const initials = item.fullName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

    card.innerHTML = `
      <div class="card-top" onclick="openDetailsModal(${item.id})" style="cursor: pointer;">
        <div class="card-avatar">${initials}</div>
        <div class="card-meta">
          <h4 class="card-name">${escapeHtml(item.fullName)}</h4>
          <div class="card-badge-row">
            <span class="badge badge-region"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(localizedRegion)} · ${escapeHtml(item.district)}</span>
            <span class="badge badge-spec">${escapeHtml(item.specialization || "Agronom")}</span>
          </div>
        </div>
      </div>

      <div class="card-details" onclick="openDetailsModal(${item.id})" style="cursor: pointer;">
        <div class="card-detail-item">
          <i class="fas fa-university"></i>
          <span>${escapeHtml(item.university || "—")} (${escapeHtml(String(item.graduationYear || "—"))})</span>
        </div>
        <div class="card-detail-item">
          <i class="fas fa-seedling"></i>
          <span>${escapeHtml(item.direction || "Bog‘dorchilik va uzumchilik maslahati")}</span>
        </div>
      </div>

      <div class="card-actions">
        <button class="btn-action-view" onclick="openDetailsModal(${item.id})">
          <i class="fas fa-eye"></i> <span>${t('btn_details')}</span>
        </button>
        <a href="tel:${escapeHtml(item.phone.replace(/[^+\d]/g, ""))}" class="card-phone-btn">
          <i class="fas fa-phone-alt"></i> ${escapeHtml(formatShortPhone(item.phone))}
        </a>
        ${canManage ? `
          <button class="btn-action btn-action-edit" onclick="openEditModal(${item.id})" title="${t('btn_edit')}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-action btn-action-danger" onclick="deleteAgronomist(${item.id})" title="${t('btn_delete')}">
            <i class="fas fa-trash-alt"></i>
          </button>
        ` : ""}
      </div>
    `;
    grid.appendChild(card);
  });
}

// --------------------------------------------------------------------------
// MODAL 0: AGRONOMIST DETAILS MODAL (BATAFSIL MA'LUMOT)
// --------------------------------------------------------------------------
window.openDetailsModal = function (id) {
  const item = appState.agronomists.find(a => a.id === id);
  if (!item) return;

  const getReg = window.I18N ? window.I18N.getRegionName : (r) => r;
  const localizedRegion = getReg(item.region);
  const initials = (item.fullName || "AG").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const rawDigits = String(item.phone || "").replace(/[^\d]/g, "");
  const formattedPhone = formatShortPhone(item.phone);

  document.getElementById("detailsAvatar").textContent = initials;
  document.getElementById("detailsFullName").textContent = item.fullName || "—";
  document.getElementById("detailsRegionBadge").textContent = `${localizedRegion}, ${item.district || ""}`;

  const statusBadge = document.getElementById("detailsStatusBadge");
  if (item.status === "busy") {
    statusBadge.className = "status-pill status-busy";
    statusBadge.textContent = "Vaqtincha band";
  } else if (item.status === "inactive") {
    statusBadge.className = "status-pill status-inactive";
    statusBadge.textContent = "Faol emas";
  } else {
    statusBadge.className = "status-pill status-active";
    statusBadge.textContent = "Faol (Maslahat beradi)";
  }

  const phoneLink = document.getElementById("detailsPhoneLink");
  phoneLink.href = `tel:+998${rawDigits.slice(-9)}`;
  document.getElementById("detailsPhoneText").textContent = item.phone ? `+998 ${formattedPhone}` : "—";

  document.getElementById("detailsBirthYear").textContent = formatBirthYear(item.birthDate) ? `${formatBirthYear(item.birthDate)}-yil` : "—";
  document.getElementById("detailsSpecialization").textContent = item.specialization || "Agronom";
  document.getElementById("detailsExperience").textContent = item.experience || "—";
  document.getElementById("detailsUniversity").textContent = item.university || "Ko‘rsatilmagan";
  document.getElementById("detailsGradYear").textContent = item.graduationYear ? `${item.graduationYear}-yil` : "—";
  document.getElementById("detailsDirection").textContent = item.direction || "Bog‘dorchilik, tokchilik va intensiv agrotexnika";

  // Edit button in details modal
  const editBtn = document.getElementById("detailsEditBtn");
  if (editBtn) {
    if (canManageItem(item)) {
      editBtn.style.display = "inline-flex";
      editBtn.onclick = () => {
        closeDetailsModal();
        openAgroModal(item);
      };
    } else {
      editBtn.style.display = "none";
    }
  }

  // Consult button in details modal
  const consultBtn = document.getElementById("detailsConsultBtn");
  if (consultBtn) {
    consultBtn.onclick = () => {
      closeDetailsModal();
      openConsultModal(item.id);
    };
  }

  document.getElementById("detailsModal").hidden = false;
};

function closeDetailsModal() {
  document.getElementById("detailsModal").hidden = true;
}

function renderPagination(totalItems) {
  const container = document.getElementById("paginationControls");
  container.innerHTML = "";

  const totalPages = Math.ceil(totalItems / appState.pagination.pageSize);
  if (totalPages <= 1) return;

  const current = appState.pagination.page;

  // Previous
  const prevBtn = document.createElement("button");
  prevBtn.className = "page-btn";
  prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prevBtn.disabled = current === 1;
  prevBtn.onclick = () => {
    if (appState.pagination.page > 1) {
      appState.pagination.page--;
      renderResults();
      scrollToTable();
    }
  };
  container.appendChild(prevBtn);

  // Pages
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= current - 1 && i <= current + 1)) {
      const pBtn = document.createElement("button");
      pBtn.className = `page-btn ${i === current ? "active" : ""}`;
      pBtn.textContent = i;
      pBtn.onclick = () => {
        appState.pagination.page = i;
        renderResults();
        scrollToTable();
      };
      container.appendChild(pBtn);
    } else if (i === current - 2 || i === current + 2) {
      const span = document.createElement("span");
      span.style.padding = "0.5rem";
      span.textContent = "…";
      container.appendChild(span);
    }
  }

  // Next
  const nextBtn = document.createElement("button");
  nextBtn.className = "page-btn";
  nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
  nextBtn.disabled = current === totalPages;
  nextBtn.onclick = () => {
    if (appState.pagination.page < totalPages) {
      appState.pagination.page++;
      renderResults();
      scrollToTable();
    }
  };
  container.appendChild(nextBtn);
}

function scrollToTable() {
  document.querySelector(".filter-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// --------------------------------------------------------------------------
// EVENT LISTENERS & MODALS
// --------------------------------------------------------------------------
function initEventListeners() {
  // Multi-language Buttons Click
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.dataset.lang;
      if (window.I18N) {
        window.I18N.setLanguage(selectedLang);
      }
    });
  });

  // Search input debounce
  let searchTimer;
  document.getElementById("searchInput")?.addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      appState.filters.q = e.target.value.trim();
      appState.pagination.page = 1;
      applyFilters();
    }, 250);
  });

  // District filter
  document.getElementById("districtFilter")?.addEventListener("change", (e) => {
    appState.filters.district = e.target.value;
    appState.pagination.page = 1;
    applyFilters();
  });

  // Reset Filters
  const resetHandler = () => {
    document.getElementById("searchInput").value = "";
    const isRegional = appState.currentUser && appState.currentUser.role === "regional";
    const regFilter = document.getElementById("regionFilter");
    const dist = document.getElementById("districtFilter");
    const t = window.I18N ? window.I18N.t : (k) => k;

    if (isRegional) {
      if (regFilter) {
        regFilter.value = appState.currentUser.region;
        regFilter.disabled = true;
      }
      appState.filters = { q: "", region: appState.currentUser.region, district: "", specialization: "" };
      const distList = UZBEKISTAN_REGIONS[appState.currentUser.region] || UZBEKISTAN_REGIONS[normalizeRegion(appState.currentUser.region)];
      dist.innerHTML = `<option value="">${t("filter_district_all")}</option>`;
      if (distList && distList.length) {
        dist.disabled = false;
        distList.forEach(d => {
          const opt = document.createElement("option");
          opt.value = d;
          opt.textContent = d;
          dist.appendChild(opt);
        });
      }
    } else {
      if (regFilter) {
        regFilter.value = "";
        regFilter.disabled = false;
      }
      dist.innerHTML = `<option value="">${t("filter_district_all")}</option>`;
      dist.disabled = true;
      appState.filters = { q: "", region: "", district: "", specialization: "" };
    }

    document.querySelectorAll(".spec-chip").forEach(c => c.classList.remove("active"));
    document.querySelector(".spec-chip[data-spec='']")?.classList.add("active");

    appState.pagination.page = 1;
    applyFilters();
  };

  document.getElementById("resetFiltersBtn")?.addEventListener("click", resetHandler);
  document.getElementById("emptyResetBtn")?.addEventListener("click", resetHandler);

  // Specialization chips
  document.querySelectorAll(".spec-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".spec-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      appState.filters.specialization = chip.dataset.spec || "";
      appState.pagination.page = 1;
      applyFilters();
    });
  });

  // View Switchers
  document.getElementById("tableViewBtn")?.addEventListener("click", () => {
    appState.viewMode = "table";
    document.getElementById("tableViewBtn").classList.add("active");
    document.getElementById("cardViewBtn").classList.remove("active");
    renderResults();
  });

  document.getElementById("cardViewBtn")?.addEventListener("click", () => {
    appState.viewMode = "card";
    document.getElementById("cardViewBtn").classList.add("active");
    document.getElementById("tableViewBtn").classList.remove("active");
    renderResults();
  });

  // Open Add Modal
  const openAdd = () => {
    if (!appState.currentUser) {
      showToast("Agronom kiritish uchun agentlik xodimi hisobi bilan tizimga kiring", "info");
      openLoginModal();
      return;
    }
    openAgroModal();
  };
  document.getElementById("openAddModalBtn")?.addEventListener("click", openAdd);
  document.getElementById("quickAddBtn")?.addEventListener("click", openAdd);

  // Open Import Modal
  document.getElementById("openImportModalBtn")?.addEventListener("click", () => {
    if (!appState.currentUser) {
      showToast("Excel yuklash uchun agentlik xodimi hisobi bilan tizimga kiring", "info");
      openLoginModal();
      return;
    }
    openImportModal();
  });

  // Modal close buttons
  document.getElementById("closeAgroModalBtn")?.addEventListener("click", closeAgroModal);
  document.getElementById("cancelAgroModalBtn")?.addEventListener("click", closeAgroModal);

  document.getElementById("closeImportModalBtn")?.addEventListener("click", closeImportModal);
  document.getElementById("cancelImportBtn")?.addEventListener("click", closeImportModal);

  document.getElementById("closeConsultModalBtn")?.addEventListener("click", closeConsultModal);
  document.getElementById("cancelConsultBtn")?.addEventListener("click", closeConsultModal);

  // Auth Modals & Events
  document.getElementById("openLoginModalBtn")?.addEventListener("click", openLoginModal);
  document.getElementById("closeLoginModalBtn")?.addEventListener("click", closeLoginModal);
  document.getElementById("cancelLoginBtn")?.addEventListener("click", closeLoginModal);
  document.getElementById("loginForm")?.addEventListener("submit", handleLoginSubmit);
  document.getElementById("refreshCaptchaBtn")?.addEventListener("click", renderLoginCaptcha);
  document.getElementById("loginCaptchaCanvas")?.addEventListener("click", renderLoginCaptcha);

  document.getElementById("logoutBtn")?.addEventListener("click", handleLogout);

  // Password toggle in login modal
  document.getElementById("togglePasswordBtn")?.addEventListener("click", () => {
    const passInput = document.getElementById("loginPassword");
    const icon = document.getElementById("togglePasswordIcon");
    if (passInput.type === "password") {
      passInput.type = "text";
      icon.className = "fas fa-eye-slash";
    } else {
      passInput.type = "password";
      icon.className = "fas fa-eye";
    }
  });

  // Details Modal
  document.getElementById("closeDetailsModalBtn")?.addEventListener("click", closeDetailsModal);
  document.getElementById("closeDetailsBtn")?.addEventListener("click", closeDetailsModal);

  // Admin Staff Management Modal
  document.getElementById("openStaffMgmtBtn")?.addEventListener("click", openStaffManagementModal);
  document.getElementById("closeStaffMgmtBtn")?.addEventListener("click", closeStaffManagementModal);
  document.getElementById("closeStaffMgmtFooterBtn")?.addEventListener("click", closeStaffManagementModal);
  document.getElementById("createStaffForm")?.addEventListener("submit", handleCreateStaffSubmit);
  document.getElementById("printAccountsBtn")?.addEventListener("click", () => window.print());

  // Change Password Modal
  document.getElementById("openChangePassBtn")?.addEventListener("click", openChangePasswordModal);
  document.getElementById("closeChangePasswordBtn")?.addEventListener("click", closeChangePasswordModal);
  document.getElementById("cancelChangePasswordBtn")?.addEventListener("click", closeChangePasswordModal);
  document.getElementById("changePasswordForm")?.addEventListener("submit", handleChangePasswordSubmit);

  // Agronomist Form Submit
  document.getElementById("agroForm")?.addEventListener("submit", handleAgroSubmit);

  // Consultation Form Submit
  document.getElementById("consultForm")?.addEventListener("submit", handleConsultSubmit);

  // Export CSV (Staff and Admin only)
  document.getElementById("exportCsvBtn")?.addEventListener("click", async () => {
    if (!appState.currentUser) {
      showToast("Eksport qilish uchun xodim hisobi bilan tizimga kiring", "info");
      openLoginModal();
      return;
    }
    window.location.href = `/api/agronomists/export?token=${encodeURIComponent(appState.token || '')}`;
  });

  // Print
  document.getElementById("printBtn")?.addEventListener("click", () => {
    window.print();
  });

  // Close modals when clicking overlay background or pressing ESC
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.hidden = true;
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.hidden = true;
      });
    }
  });

  // File Import Dropzone
  initDropzone();
}

// --------------------------------------------------------------------------
// LOGIN & LOGOUT HANDLERS
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// CAPTCHA VERIFICATION SYSTEM
// --------------------------------------------------------------------------
let currentLoginCaptcha = "";

function generateCaptchaText(len = 4) {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let res = "";
  for (let i = 0; i < len; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

function renderLoginCaptcha() {
  const canvas = document.getElementById("loginCaptchaCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  currentLoginCaptcha = generateCaptchaText(4);

  const w = canvas.width;
  const h = canvas.height;

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  ctx.fillStyle = isDark ? "#1e293b" : "#f1f5f9";
  ctx.fillRect(0, 0, w, h);

  // Background noise lines
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)";
    ctx.lineWidth = 1 + Math.random();
    ctx.beginPath();
    ctx.moveTo(Math.random() * w, Math.random() * h);
    ctx.lineTo(Math.random() * w, Math.random() * h);
    ctx.stroke();
  }

  // Draw characters
  const charColors = isDark
    ? ["#34d399", "#60a5fa", "#f472b6", "#fbbf24"]
    : ["#059669", "#2563eb", "#db2777", "#d97706"];

  ctx.font = "bold 20px 'JetBrains Mono', Consolas, monospace";
  ctx.textBaseline = "middle";

  const spacing = w / (currentLoginCaptcha.length + 1);
  for (let i = 0; i < currentLoginCaptcha.length; i++) {
    const char = currentLoginCaptcha[i];
    ctx.save();
    const x = spacing * (i + 1) + (Math.random() * 4 - 2);
    const y = h / 2 + (Math.random() * 4 - 2);
    const angle = (Math.random() * 24 - 12) * (Math.PI / 180);
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = charColors[i % charColors.length];
    ctx.fillText(char, -7, 0);
    ctx.restore();
  }

  // Foreground noise dots
  for (let i = 0; i < 18; i++) {
    ctx.fillStyle = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)";
    ctx.beginPath();
    ctx.arc(Math.random() * w, Math.random() * h, 1, 0, Math.PI * 2);
    ctx.fill();
  }

  const captchaInput = document.getElementById("loginCaptcha");
  if (captchaInput) {
    captchaInput.value = "";
  }
}

function openLoginModal() {
  document.getElementById("loginStatusMessage").hidden = true;
  document.getElementById("loginForm").reset();
  document.getElementById("loginModal").hidden = false;
  renderLoginCaptcha();
  setTimeout(() => document.getElementById("loginUsername")?.focus(), 100);
}

function closeLoginModal() {
  document.getElementById("loginModal").hidden = true;
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const captcha = (document.getElementById("loginCaptcha")?.value || "").trim().toUpperCase();
  const statusEl = document.getElementById("loginStatusMessage");
  const submitBtn = document.getElementById("submitLoginBtn");
  const t = window.I18N ? window.I18N.t : (k) => k;

  // Verify Captcha
  if (!captcha || captcha !== currentLoginCaptcha) {
    statusEl.className = "modal-status-message error";
    statusEl.textContent = t("err_captcha") || "Xavfsizlik kodi (kapcha) noto‘g‘ri kiritildi";
    statusEl.hidden = false;
    renderLoginCaptcha();
    const capInp = document.getElementById("loginCaptcha");
    if (capInp) {
      capInp.focus();
    }
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Tekshirilmoqda…';
  statusEl.hidden = true;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (data.ok && data.token) {
      setCurrentUser(data.user, data.token);
      showToast(data.message || "Tizimga muvaffaqiyatli kirdingiz", "success");
      closeLoginModal();
    } else {
      statusEl.className = "modal-status-message error";
      statusEl.textContent = data.error || "Login yoki parol noto‘g‘ri";
      statusEl.hidden = false;
      renderLoginCaptcha();
    }
  } catch (err) {
    statusEl.className = "modal-status-message error";
    statusEl.textContent = "Server bilan bog‘lanishda xatolik";
    statusEl.hidden = false;
    renderLoginCaptcha();
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-right-to-bracket"></i> <span>${t('btn_submit_login')}</span>`;
  }
}

async function handleLogout() {
  if (!confirm("Tizimdan chiqishni xohlaysizmi?")) return;

  try {
    await authFetch("/api/auth/logout", { method: "POST" });
  } catch (e) {
    // Ignore error on logout
  }

  clearCurrentUser();
  showToast("Tizimdan chiqildi", "info");
}

// --------------------------------------------------------------------------
// ROL 3: ADMIN - STAFF MANAGEMENT & USER CREATION
// --------------------------------------------------------------------------
async function openStaffManagementModal() {
  const modal = document.getElementById("manageStaffModal");
  document.getElementById("createStaffStatus").hidden = true;
  document.getElementById("createStaffForm").reset();
  modal.hidden = false;
  await loadStaffList();
}

function closeStaffManagementModal() {
  document.getElementById("manageStaffModal").hidden = true;
}

async function loadStaffList() {
  const tbody = document.getElementById("accountsTableBody");
  tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 1.5rem;"><i class="fas fa-spinner fa-spin"></i> Xodimlar ro‘yxati yuklanmoqda…</td></tr>';
  const getReg = window.I18N ? window.I18N.getRegionName : (r) => r;

  try {
    const res = await authFetch("/api/auth/users");
    const data = await res.json();

    if (data.ok && data.users) {
      tbody.innerHTML = "";
      data.users.forEach((acc, idx) => {
        const tr = document.createElement("tr");
        const lastLoginStr = acc.lastLogin ? new Date(acc.lastLogin * 1000).toLocaleString("uz-UZ") : "Hali kirmagan";
        const isAdm = acc.role === "admin";
        const localizedRegion = getReg(acc.region);

        tr.innerHTML = `
          <td>${idx + 1}</td>
          <td><strong>${escapeHtml(localizedRegion)}</strong></td>
          <td>
            <code class="credential-box">${escapeHtml(acc.username)}</code>
            <button class="btn-copy" onclick="copyText('${escapeHtml(acc.username)}')" title="Loginni nusxalash"><i class="fas fa-copy"></i></button>
          </td>
          <td>
            <code class="credential-box password-box">${escapeHtml(acc.password || '******')}</code>
            <button class="btn-copy" onclick="copyText('${escapeHtml(acc.password || '')}')" title="Parolni nusxalash"><i class="fas fa-copy"></i></button>
          </td>
          <td>${escapeHtml(acc.displayName || "—")}</td>
          <td><small>${escapeHtml(lastLoginStr)}</small></td>
          <td>
            <div class="table-actions">
              <button class="btn btn-xs btn-secondary" onclick="copyAccountInfo('${escapeHtml(localizedRegion)}', '${escapeHtml(acc.username)}', '${escapeHtml(acc.password || '')}')" title="Nusxalash">
                <i class="fas fa-share-nodes"></i>
              </button>
              ${!isAdm ? `
                <button class="btn btn-xs btn-outline-danger" onclick="deleteStaffAccount('${escapeHtml(acc.username)}')" title="Xodimni o‘chirish">
                  <i class="fas fa-trash-alt"></i>
                </button>
              ` : `<span class="badge badge-admin">Bosh Admin</span>`}
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    } else {
      tbody.innerHTML = `<tr><td colspan="7" class="text-danger" style="text-align:center; padding:1.5rem;">${data.error || 'Xodimlarni yuklab bo‘lmadi'}</td></tr>`;
    }
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-danger" style="text-align:center; padding:1.5rem;">Server bilan aloqa xatosi</td></tr>';
  }
}

async function handleCreateStaffSubmit(e) {
  e.preventDefault();
  const region = document.getElementById("newStaffRegion").value.trim();
  const username = document.getElementById("newStaffUsername").value.trim();
  const password = document.getElementById("newStaffPassword").value.trim();
  const displayName = document.getElementById("newStaffDisplayName").value.trim();
  const statusEl = document.getElementById("createStaffStatus");
  const submitBtn = document.getElementById("createStaffSubmitBtn");

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yaratilmoqda…';
  statusEl.hidden = true;

  try {
    const res = await authFetch("/api/auth/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ region, username, password, displayName })
    });
    const data = await res.json();

    if (data.ok) {
      showToast(data.message || "Yangi viloyat xodimi yaratildi", "success");
      document.getElementById("createStaffForm").reset();
      statusEl.className = "modal-status-message success";
      statusEl.textContent = `✅ Xodim "${username}" muvaffaqiyatli yaratildi!`;
      statusEl.hidden = false;
      await loadStaffList();
    } else {
      statusEl.className = "modal-status-message error";
      statusEl.textContent = data.error || "Xodimni yaratib bo‘lmadi";
      statusEl.hidden = false;
    }
  } catch (err) {
    statusEl.className = "modal-status-message error";
    statusEl.textContent = "Server bilan aloqa xatosi";
    statusEl.hidden = false;
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-plus"></i> <span>${window.I18N ? window.I18N.t('btn_create_staff') : 'Xodimni yaratish'}</span>`;
  }
}

window.deleteStaffAccount = async function (username) {
  if (!confirm(`Haqiqatan ham "${username}" xodim hisobini o‘chirmoqchimisiz?`)) return;

  try {
    const res = await authFetch(`/api/auth/users/${encodeURIComponent(username)}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (data.ok) {
      showToast(data.message || "Xodim o‘chirildi", "success");
      await loadStaffList();
    } else {
      showToast(data.error || "O‘chirishda xatolik", "error");
    }
  } catch (err) {
    showToast("Server bilan bog‘lanishda xatolik", "error");
  }
};

window.copyText = function (text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Nusxalandi: " + text, "success");
  }).catch(() => {
    showToast("Nusxalash imkoni bo‘lmadi", "error");
  });
};

window.copyAccountInfo = function (region, username, password) {
  const text = `🌿 Agrosanoatni Rivojlantirish Agentligi - Malakali Agronomlar Reyestri Tizimi:\nHudud: ${region}\nLogin: ${username}\nParol: ${password}\nSayt: ${window.location.origin}`;
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${region} hisob ma'lumotlari nusxalandi!`, "success");
  });
};

// --------------------------------------------------------------------------
// CHANGE PASSWORD
// --------------------------------------------------------------------------
function openChangePasswordModal() {
  document.getElementById("changePasswordStatus").hidden = true;
  document.getElementById("changePasswordForm").reset();
  document.getElementById("changePasswordModal").hidden = false;
}

function closeChangePasswordModal() {
  document.getElementById("changePasswordModal").hidden = true;
}

async function handleChangePasswordSubmit(e) {
  e.preventDefault();
  const oldPassword = document.getElementById("oldPassword").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();
  const confirmPassword = document.getElementById("confirmNewPassword").value.trim();
  const statusEl = document.getElementById("changePasswordStatus");
  const btn = document.getElementById("saveNewPasswordBtn");

  if (newPassword !== confirmPassword) {
    statusEl.className = "modal-status-message error";
    statusEl.textContent = "Yangi parollar bir-biriga mos kelmadi";
    statusEl.hidden = false;
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saqlanmoqda…';

  try {
    const res = await authFetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword })
    });
    const data = await res.json();

    if (data.ok) {
      showToast("Parolingiz muvaffaqiyatli yangilandi", "success");
      closeChangePasswordModal();
    } else {
      statusEl.className = "modal-status-message error";
      statusEl.textContent = data.error || "Parolni o‘zgartirib bo‘lmadi";
      statusEl.hidden = false;
    }
  } catch (err) {
    statusEl.className = "modal-status-message error";
    statusEl.textContent = "Server bilan bog‘lanishda xatolik";
    statusEl.hidden = false;
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-check"></i> <span>${window.I18N ? window.I18N.t('btn_save') : 'Saqlash'}</span>`;
  }
}

// --------------------------------------------------------------------------
// ROL 2 & 3: AGRO MODAL (ADD / EDIT)
// --------------------------------------------------------------------------
function openAgroModal(editItem = null) {
  const modal = document.getElementById("agroModal");
  const form = document.getElementById("agroForm");
  const title = document.getElementById("modalTitle");
  const status = document.getElementById("agroFormStatus");
  const lockBadge = document.getElementById("agroRegionLockBadge");
  const regionSelect = document.getElementById("agroRegion");
  const lockedRegionNameText = document.getElementById("lockedRegionNameText");
  const t = window.I18N ? window.I18N.t : (k) => k;
  const getReg = window.I18N ? window.I18N.getRegionName : (r) => r;

  status.hidden = true;

  const isRegional = appState.currentUser && appState.currentUser.role !== "admin";

  if (isRegional) {
    lockBadge.style.display = "flex";
    lockedRegionNameText.textContent = getReg(appState.currentUser.region);
  } else {
    lockBadge.style.display = "none";
  }

  if (editItem) {
    title.textContent = t("modal_agro_edit_title");
    document.getElementById("agroId").value = editItem.id;
    regionSelect.value = editItem.region || "";

    if (isRegional) {
      regionSelect.value = appState.currentUser.region;
      regionSelect.disabled = true;
    } else {
      regionSelect.disabled = false;
    }

    updateDistrictOptionsForModal(editItem.region || (isRegional ? appState.currentUser.region : ""), editItem.district);

    document.getElementById("agroFullName").value = editItem.fullName || "";
    document.getElementById("agroPhone").value = editItem.phone || "";
    document.getElementById("agroBirthDate").value = editItem.birthDate || "";
    document.getElementById("agroSpecialization").value = editItem.specialization || "Agronom";
    document.getElementById("agroUniversity").value = editItem.university || "";
    document.getElementById("agroGradYear").value = editItem.graduationYear || "";
    document.getElementById("agroDirection").value = editItem.direction || "";
    document.getElementById("agroExperience").value = editItem.experience || "";
    document.getElementById("agroStatus").value = editItem.status || "active";
  } else {
    title.textContent = t("modal_agro_add_title");
    form.reset();
    document.getElementById("agroId").value = "";

    if (isRegional) {
      regionSelect.value = appState.currentUser.region;
      regionSelect.disabled = true;
      updateDistrictOptionsForModal(appState.currentUser.region);
    } else {
      regionSelect.disabled = false;
      document.getElementById("agroDistrict").innerHTML = `<option value="">${t("filter_district_prompt")}</option>`;
      document.getElementById("agroDistrict").disabled = true;
    }

    document.getElementById("agroSpecialization").value = "Agronom";
  }

  modal.hidden = false;
}

function closeAgroModal() {
  document.getElementById("agroModal").hidden = true;
}

window.openEditModal = function (id) {
  if (!appState.currentUser) {
    showToast("Tahrirlash uchun xodim hisobi bilan tizimga kiring", "info");
    openLoginModal();
    return;
  }
  const item = appState.agronomists.find(a => a.id === id);
  if (item) {
    if (!canManageItem(item)) {
      showToast(`Siz faqat o‘z hududingiz (${appState.currentUser.region}) agronomlarini tahrirlashingiz mumkin`, "error");
      return;
    }
    openAgroModal(item);
  }
};

window.deleteAgronomist = async function (id) {
  if (!appState.currentUser) {
    showToast("O‘chirish uchun xodim hisobi bilan tizimga kiring", "info");
    openLoginModal();
    return;
  }

  const item = appState.agronomists.find(a => a.id === id);
  if (!item) return;

  if (!canManageItem(item)) {
    showToast(`Siz faqat o‘z hududingiz (${appState.currentUser.region}) agronomlarini o‘chirishingiz mumkin`, "error");
    return;
  }

  if (!confirm(`“${item.fullName}” agronom mutaxassisini ro‘yxatdan o‘chirishni tasdiqlaysizmi?`)) {
    return;
  }

  try {
    const res = await authFetch(`/api/agronomists/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) {
      showToast("Agronom muvaffaqiyatli o‘chirildi", "success");
      appState.agronomists = appState.agronomists.filter(a => a.id !== id);
      applyFilters();
    } else {
      showToast(data.error || "O‘chirishda xatolik", "error");
    }
  } catch (err) {
    showToast("Server bilan bog‘lanishda xatolik", "error");
  }
};

async function handleAgroSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("agroId").value;
  const statusEl = document.getElementById("agroFormStatus");
  const saveBtn = document.getElementById("saveAgroBtn");

  const regionVal = (appState.currentUser && appState.currentUser.role !== "admin")
    ? appState.currentUser.region
    : document.getElementById("agroRegion").value.trim();

  const payload = {
    region: regionVal,
    district: document.getElementById("agroDistrict").value.trim(),
    fullName: document.getElementById("agroFullName").value.trim(),
    phone: document.getElementById("agroPhone").value.trim(),
    birthDate: document.getElementById("agroBirthDate").value.trim(),
    specialization: document.getElementById("agroSpecialization").value.trim(),
    university: document.getElementById("agroUniversity").value.trim(),
    graduationYear: document.getElementById("agroGradYear").value.trim() || null,
    direction: document.getElementById("agroDirection").value.trim(),
    experience: document.getElementById("agroExperience").value.trim(),
    status: document.getElementById("agroStatus").value
  };

  saveBtn.disabled = true;
  statusEl.hidden = true;

  try {
    const url = id ? `/api/agronomists/${id}` : "/api/agronomists";
    const method = id ? "PUT" : "POST";

    const res = await authFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (data.ok) {
      showToast(id ? "Ma’lumotlar yangilandi" : "Yangi agronom bazaga kiritildi", "success");
      closeAgroModal();

      if (id) {
        const idx = appState.agronomists.findIndex(a => a.id === Number(id));
        if (idx !== -1) appState.agronomists[idx] = data.agronomist;
      } else {
        appState.agronomists.unshift(data.agronomist);
      }
      applyFilters();
    } else {
      statusEl.className = "modal-status-message error";
      statusEl.textContent = data.error || "Ma’lumotlarni saqlab bo‘lmadi";
      statusEl.hidden = false;
    }
  } catch (err) {
    statusEl.className = "modal-status-message error";
    statusEl.textContent = "Server bilan aloqa uzildi";
    statusEl.hidden = false;
  } finally {
    saveBtn.disabled = false;
  }
}

// --------------------------------------------------------------------------
// CONSULTATION MODAL (PUBLIC - FERMERLAR UCHUN)
// --------------------------------------------------------------------------
window.openConsultModal = function (agronomistId) {
  const item = appState.agronomists.find(a => a.id === agronomistId);
  const modal = document.getElementById("consultModal");
  const banner = document.getElementById("consultAgroBanner");
  const getReg = window.I18N ? window.I18N.getRegionName : (r) => r;

  document.getElementById("consultAgroId").value = agronomistId || "";
  if (item) {
    document.getElementById("consultAgroName").textContent = item.fullName;
    document.getElementById("consultAgroMeta").textContent = `${getReg(item.region)}, ${item.district} — ${item.specialization}`;
    banner.hidden = false;
  } else {
    banner.hidden = true;
  }

  document.getElementById("consultStatus").hidden = true;
  document.getElementById("consultForm").reset();
  modal.hidden = false;
};

function closeConsultModal() {
  document.getElementById("consultModal").hidden = true;
}

async function handleConsultSubmit(e) {
  e.preventDefault();
  const statusEl = document.getElementById("consultStatus");
  const sendBtn = document.getElementById("sendConsultBtn");

  const payload = {
    agronomistId: document.getElementById("consultAgroId").value || null,
    name: document.getElementById("farmerName").value.trim(),
    phone: document.getElementById("farmerPhone").value.trim(),
    topic: document.getElementById("consultTopic").value,
    message: document.getElementById("consultMessage").value.trim()
  };

  sendBtn.disabled = true;

  try {
    const res = await fetch("/api/consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (data.ok) {
      showToast(data.message || "Maslahat so‘rovi yuborildi", "success");
      closeConsultModal();
    } else {
      statusEl.className = "modal-status-message error";
      statusEl.textContent = data.error || "So‘rovni yuborib bo‘lmadi";
      statusEl.hidden = false;
    }
  } catch (err) {
    statusEl.className = "modal-status-message error";
    statusEl.textContent = "Server bilan aloqa uzildi";
    statusEl.hidden = false;
  } finally {
    sendBtn.disabled = false;
  }
}

// --------------------------------------------------------------------------
// BATCH IMPORT (EXCEL / CSV / JSON)
// --------------------------------------------------------------------------
function openImportModal() {
  document.getElementById("importModal").hidden = false;
  document.getElementById("importPreviewWrapper").hidden = true;
  document.getElementById("importStatus").hidden = true;
  document.getElementById("startImportBtn").disabled = true;
  appState.importQueue = [];

  const lockBadge = document.getElementById("importRegionLockBadge");
  const lockText = document.getElementById("importLockedRegionText");
  const getReg = window.I18N ? window.I18N.getRegionName : (r) => r;

  if (appState.currentUser && appState.currentUser.role !== "admin") {
    lockBadge.style.display = "flex";
    lockText.textContent = getReg(appState.currentUser.region);
  } else {
    lockBadge.style.display = "none";
  }
}

function closeImportModal() {
  document.getElementById("importModal").hidden = true;
}

function initDropzone() {
  const dropzone = document.getElementById("fileDropzone");
  const fileInput = document.getElementById("importFileInput");
  const browseBtn = document.getElementById("browseFileBtn");
  const templateBtn = document.getElementById("downloadTemplateBtn");

  browseBtn?.addEventListener("click", () => fileInput.click());
  dropzone?.addEventListener("click", (e) => {
    if (e.target !== browseBtn) fileInput.click();
  });

  dropzone?.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("dragover");
  });

  dropzone?.addEventListener("dragleave", () => {
    dropzone.classList.remove("dragover");
  });

  dropzone?.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    if (e.dataTransfer.files.length) {
      handleImportFile(e.dataTransfer.files[0]);
    }
  });

  fileInput?.addEventListener("change", (e) => {
    if (e.target.files.length) {
      handleImportFile(e.target.files[0]);
    }
  });

  // Download Sample Template
  templateBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    const csvContent = "\ufeffHudud;Tuman;F.I.SH.;Telefon raqami;Tug‘ilgan yili;Mutaxassisligi;Tamomlagan o‘quv yurti;Tamomlagan yili;Maslahat yo‘nalishi\n" +
      "Andijon;Paxtaobod;Temirov Omadjon Azimovich;97 982-82-27;1982;Agronom;Andijon qishloq xo‘jaligi instituti;2026;Bog‘dorchilik va intensiv agrotexnika\n" +
      "Qoraqalpog‘iston;Nukus;Allambergenov Djaxan;99 467-96-67;1967;Agronom;Toshkent Davlat Agrar Universiteti;1992;Bog‘dorchilik va tokchilik";
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "agronomlar_namuna_shablon.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Start Import Button
  document.getElementById("startImportBtn")?.addEventListener("click", executeBulkImport);
}

function handleImportFile(file) {
  const isExcel = file.name.endsWith(".xlsx") || file.name.endsWith(".xls");
  const isJson = file.name.endsWith(".json");

  if (isExcel && window.XLSX) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = window.XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawRows = window.XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });

        if (!rawRows || rawRows.length < 2) {
          showToast("Excel faylda ma'lumot topilmadi", "error");
          return;
        }

        const parsedRows = [];
        for (let i = 1; i < rawRows.length; i++) {
          const cols = rawRows[i];
          if (!cols || !cols.length) continue;
          const fullName = String(cols[2] || cols[0] || "").trim();
          if (!fullName) continue;

          parsedRows.push({
            region: String(cols[0] || "").trim(),
            district: String(cols[1] || "").trim(),
            fullName: fullName,
            phone: String(cols[3] || "").trim(),
            birthDate: String(cols[4] || "").trim(),
            specialization: String(cols[5] || "Agronom").trim(),
            university: String(cols[6] || "").trim(),
            graduationYear: cols[7] ? parseInt(cols[7], 10) : null,
            direction: String(cols[8] || "Bog‘dorchilik va uzumchilik").trim()
          });
        }

        if (!parsedRows.length) {
          showToast("Excel faylda yaroqli yozuvlar topilmadi", "error");
          return;
        }

        appState.importQueue = parsedRows;
        renderImportPreview(parsedRows);
      } catch (err) {
        showToast("Excel faylni o‘qishda xatolik yuz berdi: " + err.message, "error");
      }
    };
    reader.readAsArrayBuffer(file);
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    let parsedRows = [];

    if (isJson) {
      try {
        const raw = JSON.parse(text);
        parsedRows = Array.isArray(raw) ? raw : (raw.items || []);
      } catch (err) {
        showToast("JSON faylni o‘qib bo‘lmadi", "error");
        return;
      }
    } else {
      parsedRows = parseCsvText(text);
    }

    if (!parsedRows.length) {
      showToast("Faylda yaroqli yozuvlar topilmadi", "error");
      return;
    }

    appState.importQueue = parsedRows;
    renderImportPreview(parsedRows);
  };

  reader.readAsText(file, "UTF-8");
}

function parseCsvText(csvText) {
  const lines = csvText.split(/\r\n|\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];

  const firstLine = lines[0];
  let delimiter = ";";
  if (firstLine.includes("\t")) delimiter = "\t";
  else if (firstLine.includes(";") && !firstLine.includes(",")) delimiter = ";";
  else if (firstLine.includes(",")) delimiter = ",";

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(delimiter).map(c => c.replace(/^["']|["']$/g, "").trim());
    if (cols.length >= 3) {
      rows.push({
        region: cols[0] || cols[1] || "",
        district: cols[1] || cols[2] || "",
        fullName: cols[2] || cols[3] || cols[0] || "",
        phone: cols[3] || cols[4] || "",
        birthDate: cols[4] || "",
        specialization: cols[5] || "Agronom",
        university: cols[6] || "",
        graduationYear: cols[7] ? parseInt(cols[7], 10) : null,
        direction: cols[8] || "Bog‘dorchilik va uzumchilik"
      });
    }
  }
  return rows;
}

function renderImportPreview(rows) {
  const wrapper = document.getElementById("importPreviewWrapper");
  const countEl = document.getElementById("previewCount");
  const tbody = document.getElementById("previewTableBody");
  const importBtn = document.getElementById("startImportBtn");

  countEl.textContent = rows.length;
  tbody.innerHTML = "";

  const isRegional = appState.currentUser && appState.currentUser.role !== "admin";
  const getReg = window.I18N ? window.I18N.getRegionName : (r) => r;

  rows.slice(0, 8).forEach((r, idx) => {
    const tr = document.createElement("tr");
    const displayRegion = isRegional ? getReg(appState.currentUser.region) : getReg(r.region || "—");

    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${escapeHtml(displayRegion)}</td>
      <td>${escapeHtml(r.district || "—")}</td>
      <td><strong>${escapeHtml(r.fullName || "—")}</strong></td>
      <td>${escapeHtml(r.phone || "—")}</td>
      <td>${escapeHtml(r.specialization || "Agronom")}</td>
      <td>${escapeHtml(r.university || "—")}</td>
    `;
    tbody.appendChild(tr);
  });

  wrapper.hidden = false;
  importBtn.disabled = false;
}

async function executeBulkImport() {
  if (!appState.importQueue.length) return;

  const importBtn = document.getElementById("startImportBtn");
  const statusEl = document.getElementById("importStatus");
  importBtn.disabled = true;
  importBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuklanmoqda…';

  try {
    const res = await authFetch("/api/agronomists/bulk-import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: appState.importQueue })
    });
    const data = await res.json();

    if (data.ok) {
      showToast(`${data.added} ta agronom muvaffaqiyatli yuklandi`, "success");
      closeImportModal();
      loadData();
    } else {
      statusEl.className = "modal-status-message error";
      statusEl.textContent = data.error || "Ommaviy yuklashda xatolik yuz berdi";
      statusEl.hidden = false;
    }
  } catch (err) {
    statusEl.className = "modal-status-message error";
    statusEl.textContent = "Server bilan aloqa uzildi";
    statusEl.hidden = false;
  } finally {
    importBtn.disabled = false;
    importBtn.innerHTML = `<i class="fas fa-upload"></i> <span>${window.I18N ? window.I18N.t('btn_start_import') : 'Bazaga yuklash'}</span>`;
  }
}

// --------------------------------------------------------------------------
// UTILITIES
// --------------------------------------------------------------------------
function showToast(message, type = "info") {
  const toast = document.getElementById("toastMessage");
  if (!toast) return;

  toast.textContent = message;
  toast.className = `toast show ${type}`;

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.className = "toast";
  }, 4000);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
