// Данные о пользователях и суворовцах
const users = [
    // Администраторы
    { username: 'markiz', password: 'rasputin/25', role: 'developer', name: 'Разработчик' },
    { username: 'officer', password: 'adminsvu25', role: 'moderator', name: 'Офицер-воспитатель' },
    
    // Суворовцы (62 позывных)
    { username: 'star', password: 'star2025', role: 'cadet', cadetId: 1 },
    { username: 'rocket', password: 'rocket25', role: 'cadet', cadetId: 2 },
    { username: 'eagle', password: 'eagle2025', role: 'cadet', cadetId: 3 },
    { username: 'falcon', password: 'falcon25', role: 'cadet', cadetId: 4 },
    { username: 'thunder', password: 'thunder25', role: 'cadet', cadetId: 5 },
    { username: 'shadow', password: 'shadow25', role: 'cadet', cadetId: 6 },
    { username: 'alpha', password: 'alpha2025', role: 'cadet', cadetId: 7 },
    { username: 'bravo', password: 'bravo2025', role: 'cadet', cadetId: 8 },
    { username: 'charlie', password: 'charlie25', role: 'cadet', cadetId: 9 },
    { username: 'delta', password: 'delta2025', role: 'cadet', cadetId: 10 },
    { username: 'echo', password: 'echo2025', role: 'cadet', cadetId: 11 },
    { username: 'foxtrot', password: 'foxtrot25', role: 'cadet', cadetId: 12 },
    { username: 'golf', password: 'golf2025', role: 'cadet', cadetId: 13 },
    { username: 'hotel', password: 'hotel2025', role: 'cadet', cadetId: 14 },
    { username: 'india', password: 'india2025', role: 'cadet', cadetId: 15 },
    { username: 'juliet', password: 'juliet25', role: 'cadet', cadetId: 16 },
    { username: 'kilo', password: 'kilo2025', role: 'cadet', cadetId: 17 },
    { username: 'lima', password: 'lima2025', role: 'cadet', cadetId: 18 },
    { username: 'mike', password: 'mike2025', role: 'cadet', cadetId: 19 },
    { username: 'november', password: 'november25', role: 'cadet', cadetId: 20 },
    { username: 'oscar', password: 'oscar2025', role: 'cadet', cadetId: 21 },
    { username: 'papa', password: 'papa2025', role: 'cadet', cadetId: 22 },
    { username: 'quebec', password: 'quebec25', role: 'cadet', cadetId: 23 },
    { username: 'romeo', password: 'romeo2025', role: 'cadet', cadetId: 24 },
    { username: 'sierra', password: 'sierra25', role: 'cadet', cadetId: 25 },
    { username: 'tango', password: 'tango2025', role: 'cadet', cadetId: 26 },
    { username: 'mage', password: 'mage2025', role: 'cadet', cadetId: 27 },
    { username: 'victor', password: 'victor25', role: 'cadet', cadetId: 28 },
    { username: 'whiskey', password: 'whiskey25', role: 'cadet', cadetId: 29 },
    { username: 'xray', password: 'xray2025', role: 'cadet', cadetId: 30 },
    { username: 'yankee', password: 'yankee25', role: 'cadet', cadetId: 31 },
    { username: 'zulu', password: 'zulu2025', role: 'cadet', cadetId: 32 },
    { username: 'phoenix', password: 'phoenix25', role: 'cadet', cadetId: 33 },
    { username: 'dragon', password: 'dragon25', role: 'cadet', cadetId: 34 },
    { username: 'wolf', password: 'wolf2025', role: 'cadet', cadetId: 35 },
    { username: 'bear', password: 'bear2025', role: 'cadet', cadetId: 36 },
    { username: 'lion', password: 'lion2025', role: 'cadet', cadetId: 37 },
    { username: 'tiger', password: 'tiger2025', role: 'cadet', cadetId: 38 },
    { username: 'shark', password: 'shark2025', role: 'cadet', cadetId: 39 },
    { username: 'hawk', password: 'hawk2025', role: 'cadet', cadetId: 40 },
    { username: 'raven', password: 'raven2025', role: 'cadet', cadetId: 41 },
    { username: 'viper', password: 'viper2025', role: 'cadet', cadetId: 42 },
    { username: 'cobra', password: 'cobra2025', role: 'cadet', cadetId: 43 },
    { username: 'panther', password: 'panther25', role: 'cadet', cadetId: 44 },
    { username: 'lynx', password: 'lynx2025', role: 'cadet', cadetId: 45 },
    { username: 'jaguar', password: 'jaguar25', role: 'cadet', cadetId: 46 },
    { username: 'leopard', password: 'leopard25', role: 'cadet', cadetId: 47 },
    { username: 'cheetah', password: 'cheetah25', role: 'cadet', cadetId: 48 },
    { username: 'puma', password: 'puma2025', role: 'cadet', cadetId: 49 },
    { username: 'mustang', password: 'mustang25', role: 'cadet', cadetId: 50 },
    { username: 'stallion', password: 'stallion25', role: 'cadet', cadetId: 51 },
    { username: 'bronco', password: 'bronco25', role: 'cadet', cadetId: 52 },
    { username: 'maverick', password: 'maverick25', role: 'cadet', cadetId: 53 },
    { username: 'ghost', password: 'ghost2025', role: 'cadet', cadetId: 54 },
    { username: 'phantom', password: 'phantom25', role: 'cadet', cadetId: 55 },
    { username: 'specter', password: 'specter25', role: 'cadet', cadetId: 56 },
    { username: 'wraith', password: 'wraith25', role: 'cadet', cadetId: 57 },
    { username: 'banshee', password: 'banshee25', role: 'cadet', cadetId: 58 },
    { username: 'reaper', password: 'reaper25', role: 'cadet', cadetId: 59 },
    { username: 'hunter', password: 'hunter25', role: 'cadet', cadetId: 60 },
    { username: 'sniper', password: 'sniper25', role: 'cadet', cadetId: 61 },
    { username: 'warrior', password: 'warrior25', role: 'cadet', cadetId: 62 },
    { username: 'sentinel', password: 'sentinel25', role: 'cadet', cadetId: 63 },
    { username: 'guardian', password: 'guardian25', role: 'cadet', cadetId: 64 },
    { username: 'striker', password: 'striker25', role: 'cadet', cadetId: 65 }
];

// Данные о суворовцах (создаем полный набор из 62 профилей)
const initialCadets = [
    // 31 взвод
    { id: 1, fio: "Арсен Т.М.", platoon: 31, rank: "ml_vserg", position: "заместитель командира взвода", birthdate: "2006-05-15", fp_score: 95, avg_score: 4.8, avatar: "", banner: "", awards: ["Поощрение начальника училища"], penalties: [], badges: ["zkv"] },
    { id: 2, fio: "Воронов Д.С.", platoon: 31, rank: "vserg", position: "командир отделения", birthdate: "2006-07-22", fp_score: 91, avg_score: 4.6, avatar: "", banner: "", awards: [], penalties: [], badges: ["ko"] },
    { id: 3, fio: "Горлов В.А.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2006-11-10", fp_score: 85, avg_score: 4.4, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 4, fio: "Гурьев О.С.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2007-01-05", fp_score: 83, avg_score: 4.2, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 5, fio: "Даутов М.А.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2007-03-18", fp_score: 82, avg_score: 4.3, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 6, fio: "Козлюк С.В.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2007-05-30", fp_score: 81, avg_score: 4.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 7, fio: "Рзаев И.Р.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2007-06-12", fp_score: 80, avg_score: 3.9, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 8, fio: "Агупов С.Д.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2007-08-25", fp_score: 77, avg_score: 3.8, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 9, fio: "Миронов Д.А.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2007-09-15", fp_score: 74, avg_score: 3.7, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 10, fio: "Мальцев В.А.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2007-10-08", fp_score: 69, avg_score: 3.6, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 11, fio: "Майоров Д.Э.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2007-11-20", fp_score: 67, avg_score: 3.5, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 12, fio: "Потопов Г.А.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2007-12-15", fp_score: 66, avg_score: 3.4, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 13, fio: "Егоров П.Ю.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2008-01-03", fp_score: 64, avg_score: 3.3, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 14, fio: "Деденко М.А.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2008-02-18", fp_score: 62, avg_score: 3.2, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 15, fio: "Горилов М.А.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2008-03-05", fp_score: 60, avg_score: 3.1, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    
    // 32 взвод
    { id: 16, fio: "Абакелов А.С.", platoon: 32, rank: "st_vserg", position: "заместитель командира взвода", birthdate: "2006-04-05", fp_score: 83, avg_score: 4.7, avatar: "", banner: "", awards: ["Поощрение начальника училища"], penalties: [], badges: ["zkv"] },
    { id: 17, fio: "Батдалов В.Н.", platoon: 32, rank: "vserg", position: "командир отделения", birthdate: "2006-05-12", fp_score: 80, avg_score: 4.6, avatar: "", banner: "", awards: [], penalties: [], badges: ["ko"] },
    { id: 18, fio: "Белов А.А.", platoon: 32, rank: "ml_vserg", position: "курсант", birthdate: "2006-06-22", fp_score: 89, avg_score: 4.5, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 19, fio: "Белов Е.А.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2006-08-15", fp_score: 87, avg_score: 4.4, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 20, fio: "Беляускас А.А.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2006-10-08", fp_score: 86, avg_score: 4.3, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 21, fio: "Володин И.И.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2006-11-20", fp_score: 85, avg_score: 4.2, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 22, fio: "Гордеева Н.А.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2007-01-05", fp_score: 76, avg_score: 4.1, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 23, fio: "Епишкин И.В.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2007-02-18", fp_score: 74, avg_score: 4.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 24, fio: "Мякишев О.В.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2007-03-30", fp_score: 71, avg_score: 3.9, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 25, fio: "Михайленко П.П.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2007-05-12", fp_score: 69, avg_score: 3.8, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 26, fio: "Скотинкин А.Р.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2007-06-25", fp_score: 68, avg_score: 3.7, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 27, fio: "Сутягин К.А.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2007-08-05", fp_score: 66, avg_score: 3.6, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 28, fio: "Чертков Е.В.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2007-09-18", fp_score: 65, avg_score: 3.5, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 29, fio: "Синюков А.Д.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2007-10-30", fp_score: 60, avg_score: 3.4, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 30, fio: "Шпак Г.Р.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2007-12-12", fp_score: 59, avg_score: 3.3, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    
    // 33 взвод
    { id: 31, fio: "Березков М.К.", platoon: 33, rank: "vstarshina", position: "заместитель командира взвода", birthdate: "2006-05-05", fp_score: 88, avg_score: 4.9, avatar: "", banner: "", awards: ["Поощрение начальника училища"], penalties: [], badges: ["zkv"] },
    { id: 32, fio: "Брускул П.А.", platoon: 33, rank: "vserg", position: "командир отделения", birthdate: "2006-06-12", fp_score: 81, avg_score: 4.8, avatar: "", banner: "", awards: [], penalties: [], badges: ["ko"] },
    { id: 33, fio: "Дорошев А.С.", platoon: 33, rank: "ml_vserg", position: "курсант", birthdate: "2006-07-22", fp_score: 85, avg_score: 4.7, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 34, fio: "Егорцев А.С.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2006-08-15", fp_score: 80, avg_score: 4.6, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 35, fio: "Жаринов О.М.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2006-10-08", fp_score: 79, avg_score: 4.5, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 36, fio: "Костин Н.А.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2006-11-20", fp_score: 77, avg_score: 4.4, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 37, fio: "Лысенко Е.А.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2007-01-05", fp_score: 70, avg_score: 4.3, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 38, fio: "Муравьев Е.Е.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2007-02-18", fp_score: 70, avg_score: 4.2, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 39, fio: "Хлебников И.А.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2007-03-30", fp_score: 67, avg_score: 4.1, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 40, fio: "Тряпкин Р.А.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2007-05-12", fp_score: 62, avg_score: 4.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 41, fio: "Мурашев Н.М.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2007-06-25", fp_score: 59, avg_score: 3.9, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 42, fio: "Нечаева Г.А.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2007-08-05", fp_score: 55, avg_score: 3.8, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 43, fio: "Петухов М.Н.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2007-09-18", fp_score: 52, avg_score: 3.7, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 44, fio: "Романов Д.А.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2007-10-30", fp_score: 51, avg_score: 3.6, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 45, fio: "Суханова К.А.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2007-12-12", fp_score: 50, avg_score: 3.5, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 46, fio: "Толстикова Т.Р.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2008-01-25", fp_score: 50, avg_score: 3.4, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    
    // Дополнительные курсанты для полного списка 62
    { id: 47, fio: "Андреев П.В.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2008-04-10", fp_score: 58, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 48, fio: "Богданов А.С.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2008-05-15", fp_score: 56, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 49, fio: "Васин М.И.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2008-06-20", fp_score: 54, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 50, fio: "Гаврилов Н.Д.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2008-07-25", fp_score: 52, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 51, fio: "Демин И.А.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2008-08-30", fp_score: 50, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 52, fio: "Ершов К.В.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2008-09-15", fp_score: 48, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 53, fio: "Жданов С.М.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2008-10-20", fp_score: 46, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 54, fio: "Зубов А.П.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2008-11-25", fp_score: 44, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 55, fio: "Ильин Д.С.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2008-12-30", fp_score: 42, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 56, fio: "Крылов В.И.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2009-01-15", fp_score: 40, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 57, fio: "Левин М.А.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2009-02-20", fp_score: 38, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 58, fio: "Медведь Н.В.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2009-03-25", fp_score: 36, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 59, fio: "Носов П.Д.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2009-04-30", fp_score: 34, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 60, fio: "Орехов А.М.", platoon: 32, rank: "suvorov", position: "курсант", birthdate: "2009-05-15", fp_score: 32, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 61, fio: "Петров С.К.", platoon: 33, rank: "suvorov", position: "курсант", birthdate: "2009-06-20", fp_score: 30, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] },
    { id: 62, fio: "Рыбаков И.Н.", platoon: 31, rank: "suvorov", position: "курсант", birthdate: "2009-07-25", fp_score: 28, avg_score: 3.0, avatar: "", banner: "", awards: [], penalties: [], badges: [] }
];

// Глобальные переменные
let currentUser = null;
let cadets = [];
let filteredCadets = [];
let selectedCadetId = null;
let selectedImageType = null;

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    setupEventListeners();
    checkAuthStatus();
});

// Инициализация данных
function initializeData() {
    const savedCadets = localStorage.getItem('suvorovtsy_cadets');
    if (savedCadets) {
        cadets = JSON.parse(savedCadets);
    } else {
        cadets = [...initialCadets];
        saveDataToStorage();
    }
    filteredCadets = [...cadets];
}

// Сохранение данных
function saveDataToStorage() {
    localStorage.setItem('suvorovtsy_cadets', JSON.stringify(cadets));
}

// Установка обработчиков событий
function setupEventListeners() {
    // Авторизация
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Поиск и фильтрация
    document.getElementById('searchInput').addEventListener('input', handleSearchFilter);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    // Административные кнопки
    document.getElementById('addCadetBtn')?.addEventListener('click', () => showEditModal());
    document.getElementById('exportBtn')?.addEventListener('click', handleExport);
    document.getElementById('importBtn')?.addEventListener('click', showImportModal);
    
    // Кнопки разработчика
    document.getElementById('viewPasswordsBtn')?.addEventListener('click', showPasswordsList);
    document.getElementById('bulkAddBtn')?.addEventListener('click', showBulkAddModal);
    document.getElementById('systemSettingsBtn')?.addEventListener('click', showSystemSettings);
    
    // Модальные окна
    document.getElementById('closeProfile').addEventListener('click', () => closeModal('profileModal'));
    document.getElementById('closeEdit').addEventListener('click', () => closeModal('editModal'));
    document.getElementById('closeImage').addEventListener('click', () => closeModal('imageModal'));
    document.getElementById('cancelEdit').addEventListener('click', () => closeModal('editModal'));
    document.getElementById('cancelImage').addEventListener('click', () => closeModal('imageModal'));
    
    // Формы
    document.getElementById('editForm').addEventListener('submit', handleSaveCadet);
    document.getElementById('deleteCadet')?.addEventListener('click', handleDeleteCadet);
    
    // Загрузка изображений
    document.getElementById('imageInput').addEventListener('change', handleImagePreview);
    document.getElementById('saveImage').addEventListener('click', handleSaveImage);
}

// Проверка статуса авторизации
function checkAuthStatus() {
    const savedUser = sessionStorage.getItem('suvorovtsy_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainScreen();
    }
}

// Обработка входа
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        sessionStorage.setItem('suvorovtsy_user', JSON.stringify(user));
        showMainScreen();
    } else {
        document.getElementById('loginError').textContent = 'Неверный логин или пароль';
    }
}

// Обработка выхода
function handleLogout() {
    currentUser = null;
    sessionStorage.removeItem('suvorovtsy_user');
    hideMainScreen();
}

// Показать основной экран
function showMainScreen() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainScreen').classList.remove('hidden');
    
    // Отображение информации о пользователе
    document.getElementById('currentUser').textContent = getUserDisplayName();
    
    // Показ админ-панели
    const isAdmin = currentUser.role === 'moderator' || currentUser.role === 'developer';
    document.getElementById('adminControls').style.display = isAdmin ? 'flex' : 'none';
    
    // Показ панели разработчика
    document.getElementById('developerMenu').classList.toggle('hidden', currentUser.role !== 'developer');
    
    updateTable();
    updateStatistics();
}

// Скрыть основной экран
function hideMainScreen() {
    document.getElementById('mainScreen').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('loginError').textContent = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Получить отображаемое имя пользователя
function getUserDisplayName() {
    if (currentUser.role === 'cadet') {
        const cadet = cadets.find(c => c.id === currentUser.cadetId);
        return cadet ? `${cadet.fio} (${currentUser.username})` : currentUser.username;
    } else {
        return `${currentUser.name} (${currentUser.username})`;
    }
}

// Обработка поиска и фильтрации
function handleSearchFilter() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const activePlatoon = document.querySelector('.filter-btn.active').getAttribute('data-platoon');
    
    filteredCadets = cadets.filter(cadet => {
        const matchesSearch = cadet.fio.toLowerCase().includes(searchValue);
        const matchesPlatoon = activePlatoon === 'all' || cadet.platoon.toString() === activePlatoon;
        return matchesSearch && matchesPlatoon;
    });
    
    updateTable();
}

// Обработка клика по фильтру
function handleFilterClick(event) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    handleSearchFilter();
}

// Обновление таблицы
function updateTable() {
    const cadetsList = document.getElementById('cadetsList');
    cadetsList.innerHTML = '';
    
    const sortedCadets = [...filteredCadets].sort((a, b) => b.fp_score - a.fp_score);
    
    sortedCadets.forEach(cadet => {
        const card = createCadetCard(cadet);
        cadetsList.appendChild(card);
    });
}

// Создание карточки курсанта
function createCadetCard(cadet) {
    const card = document.createElement('div');
    card.className = 'cadet-card';
    
    const avatarContent = cadet.avatar ? 
        `<img src="${cadet.avatar}" alt="${cadet.fio}">` : 
        cadet.fio.split(' ').map(part => part[0]).join('');
    
    const badges = cadet.badges.map(badge => 
        `<span class="badge badge-${badge}" title="${getBadgeTitle(badge)}"></span>`
    ).join('');
    
    card.innerHTML = `
        <div class="card-header">
            <div class="avatar-container">
                <div class="avatar">
                    ${avatarContent}
                    <div class="rank-insignia rank-${cadet.rank}"></div>
                </div>
            </div>
            <div class="cadet-info">
                <div class="cadet-name">
                    ${cadet.fio}
                    ${badges}
                    <span class="platoon-badge platoon-${cadet.platoon}">${cadet.platoon}</span>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="score-grid">
                <div class="score-item">
                    <div class="score-label">ФП</div>
                    <div class="score-value">${cadet.fp_score}</div>
                </div>
                <div class="score-item">
                    <div class="score-label">Ср. балл</div>
                    <div class="score-value">${cadet.avg_score}</div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <button class="btn btn--primary" onclick="showCadetProfile(${cadet.id})">Подробнее</button>
        </div>
    `;
    
    return card;
}

// Получить название значка
function getBadgeTitle(badge) {
    switch (badge) {
        case 'zkv': return 'Заместитель командира взвода';
        case 'ko': return 'Командир отделения';
        case 'developer': return 'Разработчик';
        default: return badge;
    }
}

// Обновление статистики
function updateStatistics() {
    document.getElementById('totalCadets').textContent = cadets.length;
    
    // Лучший взвод по среднему баллу ФП
    const platoons = {
        31: { count: 0, totalFp: 0 },
        32: { count: 0, totalFp: 0 },
        33: { count: 0, totalFp: 0 }
    };
    
    cadets.forEach(cadet => {
        const platoon = platoons[cadet.platoon];
        platoon.count++;
        platoon.totalFp += cadet.fp_score;
    });
    
    let bestPlatoon = 31;
    let bestAvg = 0;
    
    Object.entries(platoons).forEach(([platoonNumber, data]) => {
        const avg = data.count > 0 ? data.totalFp / data.count : 0;
        if (avg > bestAvg) {
            bestAvg = avg;
            bestPlatoon = platoonNumber;
        }
    });
    
    document.getElementById('bestPlatoon').textContent = bestPlatoon;
    
    // Средний балл ФП всех курсантов
    const totalFp = cadets.reduce((sum, cadet) => sum + cadet.fp_score, 0);
    const avgFp = cadets.length > 0 ? (totalFp / cadets.length).toFixed(1) : '0.0';
    document.getElementById('avgScore').textContent = avgFp;
}

// Показать профиль курсанта
function showCadetProfile(cadetId) {
    const cadet = cadets.find(c => c.id === cadetId);
    if (!cadet) return;
    
    selectedCadetId = cadetId;
    
    document.getElementById('profileTitle').textContent = `Профиль курсанта: ${cadet.fio}`;
    
    // Баннер и аватар
    const profileBanner = document.getElementById('profileBanner');
    profileBanner.style.backgroundImage = cadet.banner ? `url(${cadet.banner})` : '';
    
    const profileAvatar = document.getElementById('profileAvatar');
    if (cadet.avatar) {
        profileAvatar.innerHTML = `<img src="${cadet.avatar}" alt="${cadet.fio}">`;
    } else {
        const initials = cadet.fio.split(' ').map(part => part[0]).join('');
        profileAvatar.innerHTML = initials;
    }
    
    // Информация
    document.getElementById('profileFio').textContent = cadet.fio;
    document.getElementById('profilePosition').textContent = cadet.position;
    document.getElementById('profileBirthdate').textContent = formatDate(cadet.birthdate);
    document.getElementById('profilePlatoon').textContent = `${cadet.platoon} взвод`;
    document.getElementById('profileFpScore').textContent = `${cadet.fp_score} баллов`;
    document.getElementById('profileAvgScore').textContent = cadet.avg_score;
    
    // Поощрения и взыскания
    const awardsContainer = document.getElementById('profileAwards');
    awardsContainer.innerHTML = cadet.awards.length > 0 ? 
        cadet.awards.map(award => `<div class="award-item">${award}</div>`).join('') :
        '<div style="color: var(--color-text-secondary);">Нет поощрений</div>';
    
    const penaltiesContainer = document.getElementById('profilePenalties');
    penaltiesContainer.innerHTML = cadet.penalties.length > 0 ? 
        cadet.penalties.map(penalty => `<div class="penalty-item">${penalty}</div>`).join('') :
        '<div style="color: var(--color-text-secondary);">Нет взысканий</div>';
    
    // Управление кнопками
    const isOwnProfile = currentUser.role === 'cadet' && currentUser.cadetId === cadetId;
    const isAdmin = currentUser.role === 'moderator' || currentUser.role === 'developer';
    
    document.getElementById('editProfileBtn').classList.toggle('hidden', !isAdmin);
    document.getElementById('changeAvatarBtn').classList.toggle('hidden', !(isAdmin || isOwnProfile));
    document.getElementById('changeBannerBtn').classList.toggle('hidden', !(isAdmin || isOwnProfile));
    
    // Обработчики кнопок
    document.getElementById('editProfileBtn').onclick = () => showEditModal(cadetId);
    document.getElementById('changeAvatarBtn').onclick = () => showImageUploadModal('avatar');
    document.getElementById('changeBannerBtn').onclick = () => showImageUploadModal('banner');
    
    showModal('profileModal');
}

// Показать модальное окно редактирования
function showEditModal(cadetId) {
    const isNewCadet = cadetId === undefined;
    const title = isNewCadet ? 'Добавление нового суворовца' : 'Редактирование профиля';
    document.getElementById('editTitle').textContent = title;
    
    document.getElementById('editForm').reset();
    
    if (!isNewCadet) {
        const cadet = cadets.find(c => c.id === cadetId);
        if (!cadet) return;
        
        document.getElementById('editFio').value = cadet.fio;
        document.getElementById('editPlatoon').value = cadet.platoon;
        document.getElementById('editRank').value = cadet.rank;
        document.getElementById('editPosition').value = cadet.position;
        document.getElementById('editBirthdate').value = cadet.birthdate;
        document.getElementById('editFpScore').value = cadet.fp_score;
        document.getElementById('editAvgScore').value = cadet.avg_score;
        document.getElementById('editAwards').value = cadet.awards.join(', ');
        document.getElementById('editPenalties').value = cadet.penalties.join(', ');
        
        document.querySelectorAll('input[name="badges"]').forEach(checkbox => {
            checkbox.checked = cadet.badges.includes(checkbox.value);
        });
        
        document.getElementById('deleteCadet').classList.remove('hidden');
    } else {
        document.getElementById('deleteCadet').classList.add('hidden');
    }
    
    selectedCadetId = cadetId;
    showModal('editModal');
}

// Обработка сохранения курсанта
function handleSaveCadet(event) {
    event.preventDefault();
    
    const formData = {
        fio: document.getElementById('editFio').value.trim(),
        platoon: parseInt(document.getElementById('editPlatoon').value),
        rank: document.getElementById('editRank').value,
        position: document.getElementById('editPosition').value.trim(),
        birthdate: document.getElementById('editBirthdate').value,
        fp_score: parseInt(document.getElementById('editFpScore').value),
        avg_score: parseFloat(document.getElementById('editAvgScore').value),
        awards: document.getElementById('editAwards').value.split(',').map(a => a.trim()).filter(Boolean),
        penalties: document.getElementById('editPenalties').value.split(',').map(p => p.trim()).filter(Boolean),
        badges: Array.from(document.querySelectorAll('input[name="badges"]:checked')).map(cb => cb.value)
    };
    
    if (selectedCadetId !== undefined) {
        // Редактирование
        const index = cadets.findIndex(c => c.id === selectedCadetId);
        if (index !== -1) {
            formData.avatar = cadets[index].avatar;
            formData.banner = cadets[index].banner;
            formData.id = selectedCadetId;
            cadets[index] = formData;
        }
    } else {
        // Добавление
        const newId = cadets.length > 0 ? Math.max(...cadets.map(c => c.id)) + 1 : 1;
        formData.id = newId;
        formData.avatar = '';
        formData.banner = '';
        cadets.push(formData);
    }
    
    saveDataToStorage();
    updateTable();
    updateStatistics();
    closeModal('editModal');
}

// Обработка удаления курсанта
function handleDeleteCadet() {
    if (!selectedCadetId) return;
    
    if (confirm('Вы уверены, что хотите удалить этого суворовца?')) {
        cadets = cadets.filter(c => c.id !== selectedCadetId);
        saveDataToStorage();
        updateTable();
        updateStatistics();
        closeModal('editModal');
    }
}

// Показать модальное окно загрузки изображения
function showImageUploadModal(type) {
    selectedImageType = type;
    
    const title = type === 'avatar' ? 'Загрузка аватара' : 'Загрузка баннера';
    document.getElementById('imageTitle').textContent = title;
    
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('imagePreview').src = '';
    document.getElementById('imagePlaceholder').style.display = 'block';
    document.getElementById('imageInput').value = '';
    
    showModal('imageModal');
}

// Обработка предпросмотра изображения
function handleImagePreview(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('imagePreview').src = e.target.result;
        document.getElementById('imagePreview').style.display = 'block';
        document.getElementById('imagePlaceholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// Обработка сохранения изображения
function handleSaveImage() {
    const previewImage = document.getElementById('imagePreview');
    if (!previewImage.src || !selectedCadetId || !selectedImageType) {
        return;
    }
    
    const index = cadets.findIndex(c => c.id === selectedCadetId);
    if (index !== -1) {
        cadets[index][selectedImageType] = previewImage.src;
        saveDataToStorage();
        showCadetProfile(selectedCadetId);
    }
    
    closeModal('imageModal');
}

// Обработка экспорта данных
function handleExport() {
    const data = JSON.stringify(cadets, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'suvorovtsy_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Показать модальное окно импорта
function showImportModal() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.addEventListener('change', handleImport);
    fileInput.click();
}

// Обработка импорта
function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (Array.isArray(importedData)) {
                cadets = importedData;
                saveDataToStorage();
                updateTable();
                updateStatistics();
                alert('Данные успешно импортированы');
            } else {
                alert('Неверный формат данных');
            }
        } catch (error) {
            alert('Ошибка при импорте данных: ' + error.message);
        }
    };
    reader.readAsText(file);
}

// Показать список паролей (только для разработчика)
function showPasswordsList() {
    if (currentUser.role !== 'developer') return;
    
    const modal = createModal('Список учетных записей');
    let usersTable = '<table style="width: 100%; border-collapse: collapse;"><thead><tr><th style="border: 1px solid var(--color-border); padding: 8px;">Логин</th><th style="border: 1px solid var(--color-border); padding: 8px;">Пароль</th><th style="border: 1px solid var(--color-border); padding: 8px;">Роль</th></tr></thead><tbody>';
    users.forEach(user => {
        usersTable += `<tr><td style="border: 1px solid var(--color-border); padding: 8px;">${user.username}</td><td style="border: 1px solid var(--color-border); padding: 8px;">${user.password}</td><td style="border: 1px solid var(--color-border); padding: 8px;">${user.role}</td></tr>`;
    });
    usersTable += '</tbody></table>';
    
    modal.body.innerHTML = usersTable + '<div style="margin-top: 20px; text-align: center;"><button class="btn btn--secondary" onclick="document.body.removeChild(this.closest(\'.modal\'))">Закрыть</button></div>';
}

// Показать форму массового добавления
function showBulkAddModal() {
    if (currentUser.role !== 'developer') return;
    
    const modal = createModal('Массовое добавление суворовцев');
    modal.body.innerHTML = `
        <div class="form-group">
            <label>Выберите взвод:</label>
            <select id="bulkPlatoon" class="form-control">
                <option value="31">31 взвод</option>
                <option value="32">32 взвод</option>
                <option value="33">33 взвод</option>
            </select>
        </div>
        <div class="form-group">
            <label>Список ФИО (по одному на строку):</label>
            <textarea id="bulkNames" rows="10" class="form-control"></textarea>
        </div>
        <div style="display: flex; gap: 10px; justify-content: flex-end;">
            <button id="bulkAddSubmit" class="btn btn--primary">Добавить</button>
            <button class="btn btn--secondary" onclick="document.body.removeChild(this.closest('.modal'))">Отмена</button>
        </div>
    `;
    
    document.getElementById('bulkAddSubmit').addEventListener('click', () => {
        const platoon = parseInt(document.getElementById('bulkPlatoon').value);
        const namesText = document.getElementById('bulkNames').value.trim();
        
        if (!namesText) {
            alert('Введите ФИО суворовцев');
            return;
        }
        
        const names = namesText.split('\n').map(name => name.trim()).filter(Boolean);
        const lastId = cadets.length > 0 ? Math.max(...cadets.map(c => c.id)) : 0;
        
        names.forEach((name, index) => {
            cadets.push({
                id: lastId + index + 1,
                fio: name,
                platoon: platoon,
                rank: 'suvorov',
                position: 'курсант',
                birthdate: '2008-01-01',
                fp_score: 50,
                avg_score: 3.0,
                avatar: '',
                banner: '',
                awards: [],
                penalties: [],
                badges: []
            });
        });
        
        saveDataToStorage();
        updateTable();
        updateStatistics();
        document.body.removeChild(modal.element);
        alert(`Добавлено ${names.length} суворовцев`);
    });
}

// Показать настройки системы
function showSystemSettings() {
    if (currentUser.role !== 'developer') return;
    
    const modal = createModal('Настройки системы');
    modal.body.innerHTML = `
        <div class="form-group">
            <label>Цвет акцента интерфейса:</label>
            <input type="color" id="accentColorPicker" value="#FF6B35" class="form-control">
        </div>
        <div style="display: flex; gap: 10px; justify-content: flex-end;">
            <button id="saveSettings" class="btn btn--primary">Сохранить</button>
            <button class="btn btn--secondary" onclick="document.body.removeChild(this.closest('.modal'))">Отмена</button>
        </div>
    `;
    
    document.getElementById('saveSettings').addEventListener('click', () => {
        const newColor = document.getElementById('accentColorPicker').value;
        document.documentElement.style.setProperty('--color-primary', newColor);
        localStorage.setItem('suvorovtsy_accent_color', newColor);
        document.body.removeChild(modal.element);
        alert('Настройки сохранены');
    });
}

// Создать модальное окно
function createModal(title) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.innerHTML = `<h2>${title}</h2><span class="close" onclick="document.body.removeChild(this.closest('.modal'))">&times;</span>`;
    
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    return { element: modal, body: modalBody };
}

// Показать модальное окно
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Закрыть модальное окно
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Форматирование даты
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

// Загрузка сохраненных настроек при запуске
window.addEventListener('DOMContentLoaded', () => {
    const savedAccentColor = localStorage.getItem('suvorovtsy_accent_color');
    if (savedAccentColor) {
        document.documentElement.style.setProperty('--color-primary', savedAccentColor);
    }
});