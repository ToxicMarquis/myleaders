// Конфигурация приложения и GitHub
const GITHUB_CONFIG = {
    token: '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',
    owner: 'ToxicMarquis',
    repo: 'myleaders',
    branch: 'main'
};

// Основные данные приложения
let APP_DATA = {
    github: GITHUB_CONFIG,
    users: {
        markiz: {
            password: 'rasputin/25',
            role: 'developer',
            name: 'Распутин Марк Александрович',
            fullName: 'Распутин Марк Александрович',
            rank: 'Вице-старшина',
            position: 'Разработчик',
            platoon: 31,
            birthDate: '2007-03-15',
            physicalResults: 95,
            averageGrade: 4.8,
            avatar: '',
            banner: '',
            rewards: ['Благодарность за разработку системы', 'Лучший программист 2025'],
            penalties: []
        },
        officer: {
            password: 'adminsvu25',
            role: 'moderator',
            name: 'Офицер Модератор',
            fullName: 'Офицер Модератор',
            rank: 'Офицер',
            position: 'Модератор',
            platoon: 31,
            birthDate: '1985-05-20',
            physicalResults: 100,
            averageGrade: 5.0,
            avatar: '',
            banner: '',
            rewards: ['Медаль за службу', 'Орден за заслуги'],
            penalties: []
        }
    },
    names: [
        'Амельченя Алексей Сергеевич', 'Аушев Руслан Магомет-Баширович', 'Бахарев Владислав Сергеевич',
        'Богданов Дмитрий Сергеевич', 'Богданов Матвей Русланович', 'Болдышев Владислав Максимович',
        'Бурыкин Кирилл Андреевич', 'Быков Евгений Артёмович', 'Варламов Егор Алексеевич',
        'Васильев Дмитрий Федорович', 'Величко Даниил Евгеньевич', 'Гармашов Тимур Артемович',
        'Горбатенко Иван Алексеевич', 'Гурьев Павел Сергеевич', 'Дорохов Игорь Сергеевич',
        'Егоршин Андрей Александрович', 'Елескин Никита Владимирович', 'Жаданов Олег Михайлович',
        'Иванов Алексей Олегович', 'Инякин Даниил Юрьевич', 'Калмыков Игорь Дмитриевич',
        'Коншаев Намыс Витальевич', 'Костяков Матвей Александрович', 'Курзин Дмитрий Олегович',
        'Левченко Артём Владимирович', 'Легач Арсений Иванович', 'Ликин Лев Константинович',
        'Лисовский Виктор Алексеевич', 'Макаров Артём Александрович', 'Малащук Ярослав Александрович',
        'Малхасьян Эдуард Аркадьевич', 'Манджиев Давид Эрендженович', 'Матвейков Михаил Романович',
        'Михайлов Павел Павлович', 'Мишаков Артур Леонидович', 'Монин Виктор Владимирович',
        'Муравьев Николай Игоревич', 'Мурзин Дмитрий Константинович', 'Николаев Григорий Викторович',
        'Панченко Глеб Алексеевич', 'Погодин Максим Артурович', 'Псарев Никита Сергеевич',
        'Путилов Никита Владимирович', 'Райский Демьян Михайлович', 'Решнёв Дмитрий Павлович',
        'Сапронов Андрей Евгеньевич', 'Селифонов Андрей Андреевич', 'Смирнов Кирилл Антонович',
        'Суглобов Иван Андреевич', 'Сусликов Кирилл Викторович', 'Тимохин Ярослав Геннадьевич',
        'Толпеко Павел Павлович', 'Трепагин Артём Юрьевич', 'Филиппов Дмитрий Сергеевич',
        'Филиппов Иван Александрович', 'Ховалкин Иван Романович', 'Хомутов Кирилл Алексеевич',
        'Чеканов Егор Дмитриевич', 'Чечеткин Алексей Викторович', 'Шарапов Клим Русланович',
        'Янов Георгий Владимирович'
    ],
    callsigns: [
        'star', 'rocket', 'eagle', 'falcon', 'thunder', 'shadow', 'alpha', 'bravo', 'charlie', 'delta',
        'echo', 'foxtrot', 'golf', 'hotel', 'india', 'juliet', 'kilo', 'lima', 'mike', 'november',
        'oscar', 'papa', 'quebec', 'romeo', 'sierra', 'tango', 'mage', 'victor', 'whiskey', 'xray',
        'yankee', 'zulu', 'phoenix', 'dragon', 'wolf', 'bear', 'lion', 'tiger', 'shark', 'hawk',
        'raven', 'viper', 'cobra', 'panther', 'lynx', 'jaguar', 'leopard', 'cheetah', 'puma',
        'mustang', 'stallion', 'bronco', 'maverick', 'ghost', 'phantom', 'specter', 'wraith',
        'banshee', 'reaper', 'hunter', 'sniper', 'warrior', 'sentinel', 'guardian', 'striker'
    ],
    lastUpdate: 'Никогда',
    syncStatus: 'Не синхронизировано'
};

// Состояние приложения
let currentUser = null;
let editingUser = null;

// Инициализация профилей суворовцев
function initializeCadets() {
    const ranks = ['Суворовец', 'Младший вице-сержант', 'Вице-сержант', 'Старший вице-сержант', 'Вице-старшина'];
    const positions = ['', 'ЗКВ', 'КО'];
    
    APP_DATA.callsigns.forEach((callsign, index) => {
        if (index < APP_DATA.names.length) {
            // Создаем специальные роли для первых суворовцев
            let position = '';
            if (index === 0) position = 'ЗКВ';
            else if (index === 1) position = 'КО';
            else if (index < 5 && Math.random() > 0.7) {
                position = positions[Math.floor(Math.random() * positions.length)];
            }
            
            APP_DATA.users[callsign] = {
                password: `${callsign}2025`,
                role: 'cadet',
                name: APP_DATA.names[index],
                fullName: APP_DATA.names[index],
                rank: ranks[Math.floor(Math.random() * ranks.length)],
                position: position,
                platoon: 31 + (index % 3),
                birthDate: `2007-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                physicalResults: Math.floor(Math.random() * 41) + 60,
                averageGrade: Math.round((Math.random() * 2 + 3) * 10) / 10,
                avatar: '',
                banner: '',
                rewards: getRandomRewards(),
                penalties: getRandomPenalties()
            };
        }
    });
}

function getRandomRewards() {
    const rewards = [
        'Грамота за отличную учебу', 'Благодарность за примерное поведение',
        'Диплом за спортивные достижения', 'Грамота за участие в олимпиаде',
        'Благодарность за помощь товарищам', 'Отличник боевой подготовки'
    ];
    const count = Math.floor(Math.random() * 4);
    const result = [];
    for (let i = 0; i < count; i++) {
        const reward = rewards[Math.floor(Math.random() * rewards.length)];
        if (!result.includes(reward)) result.push(reward);
    }
    return result;
}

function getRandomPenalties() {
    const penalties = [
        'Замечание за нарушение дисциплины', 'Выговор за опоздание',
        'Дополнительный наряд', 'Замечание за неопрятный внешний вид'
    ];
    const count = Math.floor(Math.random() * 2);
    const result = [];
    for (let i = 0; i < count; i++) {
        const penalty = penalties[Math.floor(Math.random() * penalties.length)];
        if (!result.includes(penalty)) result.push(penalty);
    }
    return result;
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    initializeCadets();
    setupEventListeners();
    showLoginForm();
});

// Настройка обработчиков событий
function setupEventListeners() {
    // Авторизация
    document.getElementById('authForm').addEventListener('submit', handleLogin);
    
    // Фильтры и поиск
    document.getElementById('platoonFilter').addEventListener('change', filterCadets);
    document.getElementById('searchInput').addEventListener('input', filterCadets);
    
    // Загрузка изображений
    document.getElementById('bannerInput').addEventListener('change', handleImageUpload);
    document.getElementById('avatarInput').addEventListener('change', handleImageUpload);
    
    // Формы
    document.getElementById('editForm').addEventListener('submit', handleProfileSave);
    document.getElementById('createAccountForm').addEventListener('submit', handleCreateAccount);
    
    // Панель разработчика
    document.getElementById('viewPasswordsBtn').addEventListener('click', showAllPasswords);
    document.getElementById('syncGitHubBtn').addEventListener('click', syncWithGitHub);
    document.getElementById('resetDataBtn').addEventListener('click', resetData);
    document.getElementById('closeDevModal').addEventListener('click', closeDeveloperModal);
    document.getElementById('closePasswordsModal').addEventListener('click', closePasswordsModal);
}

// Авторизация
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (APP_DATA.users[username] && APP_DATA.users[username].password === password) {
        currentUser = username;
        showMainContent();
        hideLoginError();
    } else {
        showLoginError('Неверный логин или пароль');
    }
}

function logout() {
    currentUser = null;
    showLoginForm();
}

function showLoginError(message) {
    const errorDiv = document.getElementById('loginError');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

function hideLoginError() {
    document.getElementById('loginError').classList.add('hidden');
}

// Управление интерфейсом
function showLoginForm() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('mainContent').classList.add('hidden');
    document.getElementById('developerMenu').classList.add('hidden');
}

function showMainContent() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    
    updateUserInfo();
    updateStatistics();
    renderCadetsTable();
    setupPermissions();
}

function updateUserInfo() {
    const user = APP_DATA.users[currentUser];
    const roleText = user.role === 'developer' ? 'Разработчик' : 
                    user.role === 'moderator' ? 'Модератор' : 'Суворовец';
    document.getElementById('userInfo').textContent = `${user.name} (${roleText})`;
}

function setupPermissions() {
    const user = APP_DATA.users[currentUser];
    
    if (user.role === 'developer') {
        document.getElementById('developerMenu').classList.remove('hidden');
    }
    
    if (user.role === 'moderator' || user.role === 'developer') {
        document.getElementById('moderatorActions').classList.remove('hidden');
    } else {
        document.getElementById('moderatorActions').classList.add('hidden');
    }
}

// Статистика
function updateStatistics() {
    const users = Object.values(APP_DATA.users).filter(u => u.role === 'cadet');
    const totalCadets = users.length;
    
    const avgGrade = users.reduce((sum, user) => sum + user.averageGrade, 0) / totalCadets;
    const avgPhysical = users.reduce((sum, user) => sum + user.physicalResults, 0) / totalCadets;
    
    // Определение лучшего взвода
    const platoonStats = {};
    users.forEach(user => {
        if (!platoonStats[user.platoon]) {
            platoonStats[user.platoon] = { total: 0, count: 0 };
        }
        platoonStats[user.platoon].total += user.averageGrade;
        platoonStats[user.platoon].count++;
    });
    
    let bestPlatoon = '';
    let bestAvg = 0;
    for (const [platoon, stats] of Object.entries(platoonStats)) {
        const avg = stats.total / stats.count;
        if (avg > bestAvg) {
            bestAvg = avg;
            bestPlatoon = platoon;
        }
    }
    
    // Обновление интерфейса
    document.getElementById('totalCadets').textContent = totalCadets;
    document.getElementById('averageGrade').textContent = avgGrade.toFixed(1);
    document.getElementById('averagePhysical').textContent = Math.round(avgPhysical);
    document.getElementById('bestPlatoon').textContent = bestPlatoon ? `${bestPlatoon} взвод` : '-';
    
    // Обновление панели разработчика
    document.getElementById('totalAccounts').textContent = Object.keys(APP_DATA.users).length;
    document.getElementById('lastUpdate').textContent = APP_DATA.lastUpdate;
    document.getElementById('syncStatus').textContent = APP_DATA.syncStatus;
}

// Рендеринг таблицы суворовцев
function renderCadetsTable() {
    const container = document.getElementById('cadetsGrid');
    const users = Object.entries(APP_DATA.users)
        .filter(([_, user]) => user.role === 'cadet')
        .sort((a, b) => b[1].averageGrade - a[1].averageGrade);
    
    const tableHTML = `
        <table class="cadets-table">
            <thead>
                <tr>
                    <th>Лычки</th>
                    <th>ФИО</th>
                    <th>Значки</th>
                    <th>Взвод</th>
                    <th>ФП</th>
                    <th>Балл</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(([username, user]) => createCadetRow(username, user)).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = tableHTML;
}

function createCadetRow(username, user) {
    const badgeIcon = user.position === 'Разработчик' ? '⚙️' : 
                     user.position === 'ЗКВ' ? '⭐' : 
                     user.position === 'КО' ? '🛡️' : '';
    
    return `
        <tr class="cadet-row">
            <td class="rank-cell">
                ${createRankBadgeInline(user.rank)}
            </td>
            <td class="name-cell">
                <div class="cadet-avatar-small">
                    ${user.avatar ? `<img src="${user.avatar}" alt="${user.name}">` : 
                      user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                ${user.name}
            </td>
            <td class="badges-cell">
                ${badgeIcon ? `<span class="position-badge">${badgeIcon}</span>` : ''}
            </td>
            <td class="platoon-cell">
                <span class="platoon-badge platoon--${user.platoon}">${user.platoon} взвод</span>
            </td>
            <td class="fp-cell">${user.physicalResults}</td>
            <td class="grade-cell">${user.averageGrade.toFixed(1)}</td>
            <td class="actions-cell">
                <button class="btn btn--outline btn--sm" onclick="showProfile('${username}')">Подробнее</button>
            </td>
        </tr>
    `;
}

function createRankBadgeInline(rank) {
    const badges = {
        'Суворовец': '',
        'Младший вице-сержант': '<span class="rank-stripe-inline rank-stripe-inline--2"></span>',
        'Вице-сержант': '<span class="rank-stripe-inline rank-stripe-inline--3"></span>',
        'Старший вице-сержант': '<span class="rank-stripe-inline rank-stripe-inline--large"></span>',
        'Вице-старшина': '<span class="rank-stripe-inline rank-stripe-inline--vertical"></span>'
    };
    return badges[rank] || '';
}

function createRankBadge(rank) {
    const badges = {
        'Суворовец': '',
        'Младший вице-сержант': '<div class="rank-stripe rank-stripe--single"></div><div class="rank-stripe rank-stripe--single"></div>',
        'Вице-сержант': '<div class="rank-stripe rank-stripe--single"></div><div class="rank-stripe rank-stripe--single"></div><div class="rank-stripe rank-stripe--single"></div>',
        'Старший вице-сержант': '<div class="rank-stripe rank-stripe--double"></div>',
        'Вице-старшина': '<div class="rank-stripe rank-stripe--vertical"></div>'
    };
    return badges[rank] ? `<div class="rank-badge">${badges[rank]}</div>` : '';
}

// Фильтрация
function filterCadets() {
    const platoonFilter = document.getElementById('platoonFilter').value;
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    
    const rows = document.querySelectorAll('.cadet-row');
    
    rows.forEach(row => {
        const nameCell = row.querySelector('.name-cell');
        const platoonCell = row.querySelector('.platoon-cell');
        
        if (!nameCell || !platoonCell) return;
        
        const name = nameCell.textContent.toLowerCase();
        const platoon = platoonCell.textContent.replace(' взвод', '');
        
        const matchesPlatoon = !platoonFilter || platoon === platoonFilter;
        const matchesSearch = !searchQuery || name.includes(searchQuery);
        
        row.style.display = (matchesPlatoon && matchesSearch) ? 'table-row' : 'none';
    });
}

// Панель разработчика
function toggleDeveloperPanel() {
    document.getElementById('devModal').classList.remove('hidden');
}

function closeDeveloperModal() {
    document.getElementById('devModal').classList.add('hidden');
}

function showAllPasswords() {
    const passwordsList = document.getElementById('passwordsList');
    const passwords = Object.entries(APP_DATA.users).map(([username, user]) => 
        `<div class="password-item">
            <span class="password-login">${username}</span>
            <span class="password-value">${user.password}</span>
        </div>`
    ).join('');
    
    passwordsList.innerHTML = passwords;
    document.getElementById('passwordsModal').classList.remove('hidden');
}

function closePasswordsModal() {
    document.getElementById('passwordsModal').classList.add('hidden');
}

async function syncWithGitHub() {
    try {
        await saveToGitHub('Manual sync from developer panel');
        APP_DATA.syncStatus = 'Синхронизировано';
        APP_DATA.lastUpdate = new Date().toLocaleString('ru-RU');
        updateStatistics();
        alert('Синхронизация с GitHub завершена успешно!');
    } catch (error) {
        alert('Ошибка синхронизации: ' + error.message);
    }
}

function resetData() {
    if (confirm('Вы уверены, что хотите сбросить все данные? Это действие необратимо!')) {
        const adminUsers = {
            markiz: APP_DATA.users.markiz,
            officer: APP_DATA.users.officer
        };
        APP_DATA.users = adminUsers;
        initializeCadets();
        renderCadetsTable();
        updateStatistics();
        saveToGitHub('Data reset by developer');
        alert('Данные сброшены!');
    }
}

function handleCreateAccount(e) {
    e.preventDefault();
    
    const login = document.getElementById('newAccountLogin').value.trim();
    const password = document.getElementById('newAccountPassword').value;
    const fio = document.getElementById('newAccountFio').value.trim();
    
    if (!login || !password || !fio) {
        alert('Заполните все поля!');
        return;
    }
    
    if (APP_DATA.users[login]) {
        alert('Пользователь с таким логином уже существует!');
        return;
    }
    
    APP_DATA.users[login] = {
        password: password,
        role: 'cadet',
        name: fio,
        fullName: fio,
        rank: 'Суворовец',
        position: '',
        platoon: 31,
        birthDate: '2007-01-01',
        physicalResults: 80,
        averageGrade: 4.0,
        avatar: '',
        banner: '',
        rewards: [],
        penalties: []
    };
    
    document.getElementById('createAccountForm').reset();
    
    renderCadetsTable();
    updateStatistics();
    saveToGitHub('Created new account: ' + login);
    alert('Аккаунт создан успешно!');
}

// Управление профилями
function showProfile(username) {
    const user = APP_DATA.users[username];
    if (!user) return;
    
    // Установка баннера
    const bannerImg = document.getElementById('profileBannerImg');
    const bannerContainer = document.getElementById('profileBanner');
    if (user.banner) {
        bannerImg.src = user.banner;
        bannerImg.classList.remove('hidden');
        bannerContainer.style.background = 'none';
    } else {
        bannerImg.classList.add('hidden');
        bannerContainer.style.background = 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)';
    }
    
    // Установка аватара
    const avatar = document.getElementById('profileAvatar');
    if (user.avatar) {
        avatar.innerHTML = `<img src="${user.avatar}" alt="${user.name}">`;
    } else {
        avatar.innerHTML = user.name.split(' ').map(n => n[0]).join('').substring(0, 2);
    }
    
    // Установка лычек
    document.getElementById('profileRankBadge').innerHTML = createRankBadge(user.rank);
    
    // Заполнение информации о профиле
    document.getElementById('profileName').textContent = user.name;
    
    const badgesContainer = document.getElementById('profileBadges');
    const badgeIcon = user.position === 'Разработчик' ? '⚙️' : 
                     user.position === 'ЗКВ' ? '⭐' : 
                     user.position === 'КО' ? '🛡️' : '';
    badgesContainer.innerHTML = badgeIcon ? `<span class="cadet-badge">${badgeIcon}</span>` : '';
    
    document.getElementById('profilePosition').textContent = user.position || 'Нет должности';
    document.getElementById('profileRank').textContent = user.rank;
    document.getElementById('profilePlatoon').innerHTML = `<span class="cadet-platoon cadet-platoon--${user.platoon}">${user.platoon} взвод</span>`;
    document.getElementById('profileBirthdate').textContent = formatDate(user.birthDate);
    document.getElementById('profilePhysical').textContent = `${user.physicalResults} баллов`;
    document.getElementById('profileGrade').textContent = user.averageGrade.toFixed(1);
    
    // Поощрения и взыскания
    const rewardsList = document.getElementById('profileRewards');
    rewardsList.innerHTML = user.rewards.map(reward => `<li>${reward}</li>`).join('');
    
    const penaltiesList = document.getElementById('profilePenalties');
    penaltiesList.innerHTML = user.penalties.map(penalty => `<li>${penalty}</li>`).join('');
    
    // Кнопки действий
    const actionsContainer = document.getElementById('profileActions');
    const currentUserData = APP_DATA.users[currentUser];
    
    let actions = [];
    
    if (currentUser === username) {
        actions.push('<button class="btn btn--secondary btn--sm" onclick="editProfile(\'' + username + '\')">Редактировать изображения</button>');
    }
    
    if (currentUserData.role === 'moderator' || currentUserData.role === 'developer') {
        actions.push('<button class="btn btn--primary btn--sm" onclick="editProfile(\'' + username + '\')">Редактировать профиль</button>');
        if (currentUserData.role === 'developer') {
            actions.push('<button class="btn btn--outline btn--sm" onclick="deleteProfile(\'' + username + '\')">Удалить профиль</button>');
        }
    }
    
    actionsContainer.innerHTML = actions.join('');
    
    document.getElementById('profileModal').classList.remove('hidden');
}

function closeProfileModal() {
    document.getElementById('profileModal').classList.add('hidden');
}

function editProfile(username) {
    editingUser = username;
    const user = APP_DATA.users[username];
    const currentUserData = APP_DATA.users[currentUser];
    
    // Заполнение формы текущими данными
    document.getElementById('editName').value = user.fullName;
    document.getElementById('editBirthdate').value = user.birthDate;
    document.getElementById('editRank').value = user.rank;
    document.getElementById('editPosition').value = user.position || '';
    document.getElementById('editPlatoon').value = user.platoon;
    document.getElementById('editPhysical').value = user.physicalResults;
    document.getElementById('editGrade').value = user.averageGrade;
    document.getElementById('editRewards').value = user.rewards.join('\n');
    document.getElementById('editPenalties').value = user.penalties.join('\n');
    
    // Разграничение прав доступа
    const isOwner = currentUser === username;
    const isModerator = currentUserData.role === 'moderator' || currentUserData.role === 'developer';
    
    const restrictedFields = ['editName', 'editBirthdate', 'editRank', 'editPosition', 'editPlatoon', 'editPhysical', 'editGrade', 'editRewards', 'editPenalties'];
    
    restrictedFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.disabled = isOwner && !isModerator;
    });
    
    document.getElementById('editModal').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
    editingUser = null;
    
    document.getElementById('bannerPreview').innerHTML = '';
    document.getElementById('avatarPreview').innerHTML = '';
}

function handleProfileSave(e) {
    e.preventDefault();
    
    if (!editingUser) return;
    
    const user = APP_DATA.users[editingUser];
    const currentUserData = APP_DATA.users[currentUser];
    const isModerator = currentUserData.role === 'moderator' || currentUserData.role === 'developer';
    
    // Обновление изображений
    const bannerPreview = document.getElementById('bannerPreview');
    const avatarPreview = document.getElementById('avatarPreview');
    
    if (bannerPreview.querySelector('img')) {
        user.banner = bannerPreview.querySelector('img').src;
    }
    
    if (avatarPreview.querySelector('img')) {
        user.avatar = avatarPreview.querySelector('img').src;
    }
    
    // Обновление других полей только для модератора/разработчика
    if (isModerator) {
        user.name = document.getElementById('editName').value;
        user.fullName = document.getElementById('editName').value;
        user.birthDate = document.getElementById('editBirthdate').value;
        user.rank = document.getElementById('editRank').value;
        user.position = document.getElementById('editPosition').value;
        user.platoon = parseInt(document.getElementById('editPlatoon').value);
        user.physicalResults = parseInt(document.getElementById('editPhysical').value);
        user.averageGrade = parseFloat(document.getElementById('editGrade').value);
        user.rewards = document.getElementById('editRewards').value.split('\n').filter(r => r.trim());
        user.penalties = document.getElementById('editPenalties').value.split('\n').filter(p => p.trim());
    }
    
    closeEditModal();
    closeProfileModal();
    
    updateStatistics();
    renderCadetsTable();
    
    saveToGitHub('Updated profile: ' + user.name);
}

// Обработка изображений
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Проверка размера файла (максимум 2MB)
    if (file.size > 2 * 1024 * 1024) {
        alert('Файл слишком большой. Максимальный размер: 2MB');
        return;
    }
    
    const reader = new FileReader();
    const previewId = e.target.id === 'bannerInput' ? 'bannerPreview' : 'avatarPreview';
    
    reader.onload = function(event) {
        const img = document.createElement('img');
        img.src = event.target.result;
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        
        const preview = document.getElementById(previewId);
        preview.innerHTML = '';
        preview.appendChild(img);
    };
    
    reader.readAsDataURL(file);
}

// Вспомогательные функции
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

function deleteProfile(username) {
    if (confirm(`Вы уверены, что хотите удалить профиль ${APP_DATA.users[username].name}?`)) {
        delete APP_DATA.users[username];
        closeProfileModal();
        renderCadetsTable();
        updateStatistics();
        saveToGitHub('Deleted profile: ' + username);
    }
}

function addNewCadet() {
    document.getElementById('devModal').classList.remove('hidden');
}

// Интеграция с GitHub API
async function saveToGitHub(commitMessage = 'Update data') {
    try {
        const { github } = APP_DATA;
        
        // Получение текущего файла
        const getResponse = await fetch(`https://api.github.com/repos/${github.owner}/${github.repo}/contents/data.js`, {
            headers: {
                'Authorization': `token ${github.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        let sha = null;
        if (getResponse.ok) {
            const fileData = await getResponse.json();
            sha = fileData.sha;
        }
        
        // Подготовка нового содержимого
        const content = `// Application data\nconst APP_DATA = ${JSON.stringify(APP_DATA, null, 2)};`;
        const encodedContent = btoa(unescape(encodeURIComponent(content)));
        
        // Обновление файла
        const updateData = {
            message: commitMessage,
            content: encodedContent,
            branch: github.branch
        };
        
        if (sha) {
            updateData.sha = sha;
        }
        
        const updateResponse = await fetch(`https://api.github.com/repos/${github.owner}/${github.repo}/contents/data.js`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${github.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        
        if (!updateResponse.ok) {
            throw new Error(`GitHub API error: ${updateResponse.status}`);
        }
        
        APP_DATA.lastUpdate = new Date().toLocaleString('ru-RU');
        APP_DATA.syncStatus = 'Синхронизировано';
        updateStatistics();
        
        console.log('Successfully saved to GitHub');
    } catch (error) {
        console.error('Error saving to GitHub:', error);
        throw error;
    }
}