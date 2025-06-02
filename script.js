// Глобальные переменные
let currentUser = null;
let cadets = [];
let filteredCadets = [];
let selectedCadetId = null;
let selectedImageType = null;
let cardBorderColor = '#FF6B35';

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    setupEventListeners();
    checkAuthStatus();
});

// Инициализация данных
function initializeData() {
    // Проверяем сохраненные данные
    const savedCadets = localStorage.getItem('suvorovtsy_cadets');
    if (savedCadets) {
        cadets = JSON.parse(savedCadets);
    } else {
        // Если нет сохраненных данных, используем начальные
        cadets = [...initialCadets];
        saveDataToStorage();
    }
    
    // Проверяем сохраненный цвет рамки
    const savedBorderColor = localStorage.getItem('suvorovtsy_border_color');
    if (savedBorderColor) {
        cardBorderColor = savedBorderColor;
    }
    
    filteredCadets = [...cadets];
}

// Сохранение данных в хранилище
function saveDataToStorage() {
    localStorage.setItem('suvorovtsy_cadets', JSON.stringify(cadets));
}

// Установка обработчиков событий
function setupEventListeners() {
    // Форма авторизации
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Поиск и фильтрация
    document.getElementById('searchInput').addEventListener('input', handleSearchFilter);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    // Кнопки админ-панели
    document.getElementById('addCadetBtn')?.addEventListener('click', showAddCadetModal);
    document.getElementById('exportBtn')?.addEventListener('click', handleExport);
    document.getElementById('importBtn')?.addEventListener('click', showImportModal);
    
    // Кнопки в модальных окнах
    document.getElementById('closeProfile').addEventListener('click', () => hideModal('profileModal'));
    document.getElementById('closeEdit').addEventListener('click', () => hideModal('editModal'));
    document.getElementById('closeImage').addEventListener('click', () => hideModal('imageModal'));
    document.getElementById('cancelEdit').addEventListener('click', () => hideModal('editModal'));
    
    // Выход из системы
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Формы редактирования
    document.getElementById('editForm').addEventListener('submit', handleSaveCadet);
    document.getElementById('deleteCadet')?.addEventListener('click', handleDeleteCadet);
    
    // Обработка загрузки изображений
    document.getElementById('imageInput').addEventListener('change', handleImagePreview);
    document.getElementById('saveImage').addEventListener('click', handleSaveImage);
    document.getElementById('cancelImage').addEventListener('click', () => hideModal('imageModal'));
    
    // Кнопки разработчика
    document.getElementById('viewPasswordsBtn')?.addEventListener('click', showPasswordsList);
    document.getElementById('bulkAddBtn')?.addEventListener('click', showBulkAddModal);
    document.getElementById('manageAccountsBtn')?.addEventListener('click', showManageAccountsModal);
    document.getElementById('systemSettingsBtn')?.addEventListener('click', showSystemSettings);
}

// Проверка статуса авторизации
function checkAuthStatus() {
    const savedUser = sessionStorage.getItem('suvorovtsy_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainScreen();
    }
}

// Обработка входа в систему
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

// Обработка выхода из системы
function handleLogout() {
    currentUser = null;
    sessionStorage.removeItem('suvorovtsy_user');
    hideMainScreen();
}

// Показать основной экран
function showMainScreen() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainScreen').classList.remove('hidden');
    
    // Отображаем информацию о пользователе
    document.getElementById('currentUser').textContent = getUserDisplayName();
    
    // Показываем админ-панель для модератора и разработчика
    const isAdmin = currentUser.role === 'moderator' || currentUser.role === 'developer';
    document.getElementById('adminControls').style.display = isAdmin ? 'flex' : 'none';
    
    // Показываем панель разработчика только для разработчика
    document.getElementById('developerMenu').classList.toggle('hidden', currentUser.role !== 'developer');
    
    // Обновляем таблицу и статистику
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

// Обработка клика по кнопке фильтра
function handleFilterClick(event) {
    // Убираем активный класс со всех кнопок
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Добавляем активный класс нажатой кнопке
    event.target.classList.add('active');
    
    // Обновляем фильтрацию
    handleSearchFilter();
}

// Обновление таблицы
function updateTable() {
    const cadetsList = document.getElementById('cadetsList');
    cadetsList.innerHTML = '';
    
    // Сортируем по результатам ФП (от большего к меньшему)
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
    card.style.borderColor = cardBorderColor;
    
    const avatarInitials = cadet.fio.split(' ').map(part => part[0]).join('');
    
    card.innerHTML = `
        <div class="card-header">
            <div class="avatar-container">
                <div class="avatar">
                    ${cadet.avatar ? `<img src="${cadet.avatar}" alt="${cadet.fio}">` : avatarInitials}
                    <div class="rank-insignia rank-${cadet.rank}"></div>
                </div>
            </div>
            <div class="cadet-info">
                <div class="cadet-name">
                    ${cadet.fio}
                    ${cadet.badges.map(badge => `<span class="badge badge-${badge}" title="${getBadgeTitle(badge)}"></span>`).join('')}
                    <span class="platoon-badge platoon-${cadet.platoon}">${cadet.platoon}</span>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="score-grid">
                <div class="score-item">
                    <div class="score-label">ФП</div>
                    <div class="score-value fp-score">${cadet.fp_score}</div>
                </div>
                <div class="score-item">
                    <div class="score-label">Ср. балл</div>
                    <div class="score-value avg-score">${cadet.avg_score}</div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <button class="btn btn-primary" onclick="showCadetProfile(${cadet.id})">Подробнее</button>
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
    
    // Находим лучший взвод
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
    
    // Средний балл всех курсантов
    const totalFp = cadets.reduce((sum, cadet) => sum + cadet.fp_score, 0);
    const avgFp = cadets.length > 0 ? (totalFp / cadets.length).toFixed(1) : '0.0';
    document.getElementById('avgScore').textContent = avgFp;
}

// Показать профиль курсанта
function showCadetProfile(cadetId) {
    const cadet = cadets.find(c => c.id === cadetId);
    if (!cadet) return;
    
    selectedCadetId = cadetId;
    
    // Заполняем данные профиля
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
    
    // Добавляем знаки различия
    const rankInsignia = document.createElement('div');
    rankInsignia.className = `rank-insignia rank-${cadet.rank}`;
    profileAvatar.appendChild(rankInsignia);
    
    // Информация
    document.getElementById('profileFio').textContent = cadet.fio;
    document.getElementById('profilePosition').textContent = cadet.position;
    document.getElementById('profileBirthdate').textContent = formatDate(cadet.birthdate);
    document.getElementById('profilePlatoon').textContent = `${cadet.platoon} взвод`;
    document.getElementById('profileFpScore').textContent = `${cadet.fp_score} баллов`;
    document.getElementById('profileAvgScore').textContent = cadet.avg_score;
    
    // Поощрения и взыскания
    const awardsContainer = document.getElementById('profileAwards');
    awardsContainer.innerHTML = '';
    if (cadet.awards.length > 0) {
        cadet.awards.forEach(award => {
            const awardItem = document.createElement('div');
            awardItem.className = 'award-item';
            awardItem.textContent = award;
            awardsContainer.appendChild(awardItem);
        });
    } else {
        awardsContainer.innerHTML = '<div class="empty-list">Нет поощрений</div>';
    }
    
    const penaltiesContainer = document.getElementById('profilePenalties');
    penaltiesContainer.innerHTML = '';
    if (cadet.penalties.length > 0) {
        cadet.penalties.forEach(penalty => {
            const penaltyItem = document.createElement('div');
            penaltyItem.className = 'penalty-item';
            penaltyItem.textContent = penalty;
            penaltiesContainer.appendChild(penaltyItem);
        });
    } else {
        penaltiesContainer.innerHTML = '<div class="empty-list">Нет взысканий</div>';
    }
    
    // Управление кнопками действий
    const isOwnProfile = currentUser.role === 'cadet' && currentUser.cadetId === cadetId;
    const isAdmin = currentUser.role === 'moderator' || currentUser.role === 'developer';
    
    document.getElementById('editProfileBtn').classList.toggle('hidden', !isAdmin);
    document.getElementById('changeAvatarBtn').classList.toggle('hidden', !(isAdmin || isOwnProfile));
    document.getElementById('changeBannerBtn').classList.toggle('hidden', !(isAdmin || isOwnProfile));
    
    // Добавляем обработчики для кнопок
    document.getElementById('editProfileBtn').onclick = () => showEditModal(cadetId);
    document.getElementById('changeAvatarBtn').onclick = () => showImageUploadModal('avatar');
    document.getElementById('changeBannerBtn').onclick = () => showImageUploadModal('banner');
    
    // Показываем модальное окно
    showModal('profileModal');
}

// Показать модальное окно редактирования
function showEditModal(cadetId) {
    const isNewCadet = cadetId === undefined;
    const title = isNewCadet ? 'Добавление нового суворовца' : 'Редактирование профиля';
    document.getElementById('editTitle').textContent = title;
    
    // Очищаем форму
    document.getElementById('editForm').reset();
    
    // Если редактируем существующего суворовца
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
        
        // Отмечаем значки
        document.querySelectorAll('input[name="badges"]').forEach(checkbox => {
            checkbox.checked = cadet.badges.includes(checkbox.value);
        });
        
        // Показываем кнопку удаления
        document.getElementById('deleteCadet').classList.remove('hidden');
    } else {
        // Скрываем кнопку удаления для нового суворовца
        document.getElementById('deleteCadet').classList.add('hidden');
    }
    
    // Сохраняем ID редактируемого суворовца
    selectedCadetId = cadetId;
    
    showModal('editModal');
}

// Показать модальное окно добавления суворовца
function showAddCadetModal() {
    showEditModal();
}

// Обработка сохранения данных суворовца
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
        awards: document.getElementById('editAwards').value.split(',').map(award => award.trim()).filter(Boolean),
        penalties: document.getElementById('editPenalties').value.split(',').map(penalty => penalty.trim()).filter(Boolean),
        badges: Array.from(document.querySelectorAll('input[name="badges"]:checked')).map(checkbox => checkbox.value)
    };
    
    // Проверяем, новый суворовец или редактирование
    if (selectedCadetId !== undefined) {
        // Редактирование существующего
        const index = cadets.findIndex(c => c.id === selectedCadetId);
        if (index !== -1) {
            // Сохраняем существующие аватар и баннер
            formData.avatar = cadets[index].avatar;
            formData.banner = cadets[index].banner;
            formData.id = selectedCadetId;
            
            cadets[index] = formData;
        }
    } else {
        // Добавление нового
        const newId = cadets.length > 0 ? Math.max(...cadets.map(c => c.id)) + 1 : 1;
        formData.id = newId;
        formData.avatar = '';
        formData.banner = '';
        
        cadets.push(formData);
    }
    
    // Сохраняем данные и обновляем интерфейс
    saveDataToStorage();
    updateTable();
    updateStatistics();
    
    // Закрываем модальное окно
    hideModal('editModal');
}

// Обработка удаления суворовца
function handleDeleteCadet() {
    if (!selectedCadetId) return;
    
    if (confirm('Вы уверены, что хотите удалить этого суворовца?')) {
        cadets = cadets.filter(c => c.id !== selectedCadetId);
        saveDataToStorage();
        updateTable();
        updateStatistics();
        hideModal('editModal');
    }
}

// Показать модальное окно загрузки изображения
function showImageUploadModal(type) {
    selectedImageType = type;
    
    const title = type === 'avatar' ? 'Загрузка аватара' : 'Загрузка баннера';
    document.getElementById('imageTitle').textContent = title;
    
    // Очищаем предыдущее изображение
    document.getElementById('imagePreview').src = '';
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
        
        // Обновляем профиль
        showCadetProfile(selectedCadetId);
    }
    
    hideModal('imageModal');
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
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Импорт данных</h2>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Выберите JSON-файл с данными:</label>
                    <input type="file" id="importFile" accept=".json">
                </div>
                <div class="form-actions">
                    <button id="importSubmit" class="btn btn-primary">Импортировать</button>
                    <button id="importCancel" class="btn btn-secondary">Отмена</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Обработчики событий
    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    document.getElementById('importCancel').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    document.getElementById('importSubmit').addEventListener('click', () => {
        const fileInput = document.getElementById('importFile');
        const file = fileInput.files[0];
        if (!file) {
            alert('Выберите файл для импорта');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                if (Array.isArray(importedData)) {
                    cadets = importedData;
                    saveDataToStorage();
                    updateTable();
                    updateStatistics();
                    document.body.removeChild(modal);
                    alert('Данные успешно импортированы');
                } else {
                    alert('Неверный формат данных');
                }
            } catch (error) {
                alert('Ошибка при импорте данных: ' + error.message);
            }
        };
        reader.readAsText(file);
    });
}

// Показать список паролей (только для разработчика)
function showPasswordsList() {
    if (currentUser.role !== 'developer') return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    let usersTable = '<table class="table"><thead><tr><th>Логин</th><th>Пароль</th><th>Роль</th></tr></thead><tbody>';
    users.forEach(user => {
        usersTable += `<tr><td>${user.username}</td><td>${user.password}</td><td>${user.role}</td></tr>`;
    });
    usersTable += '</tbody></table>';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Список учетных записей</h2>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                ${usersTable}
                <div class="form-actions">
                    <button id="closeUsersList" class="btn btn-secondary">Закрыть</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Обработчики событий
    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    document.getElementById('closeUsersList').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

// Показать форму массового добавления суворовцев
function showBulkAddModal() {
    if (currentUser.role !== 'developer') return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Массовое добавление суворовцев</h2>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Выберите взвод:</label>
                    <select id="bulkPlatoon">
                        <option value="31">31 взвод</option>
                        <option value="32">32 взвод</option>
                        <option value="33">33 взвод</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Список ФИО (по одному на строку):</label>
                    <textarea id="bulkNames" rows="10" class="form-input"></textarea>
                </div>
                <div class="form-actions">
                    <button id="bulkAddSubmit" class="btn btn-primary">Добавить</button>
                    <button id="bulkAddCancel" class="btn btn-secondary">Отмена</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Обработчики событий
    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    document.getElementById('bulkAddCancel').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    document.getElementById('bulkAddSubmit').addEventListener('click', () => {
        const platoon = parseInt(document.getElementById('bulkPlatoon').value);
        const namesText = document.getElementById('bulkNames').value.trim();
        
        if (!namesText) {
            alert('Введите ФИО суворовцев');
            return;
        }
        
        const names = namesText.split('\n').map(name => name.trim()).filter(Boolean);
        
        if (names.length > 0) {
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
            document.body.removeChild(modal);
            alert(`Добавлено ${names.length} суворовцев`);
        }
    });
}

// Показать форму управления учетными записями
function showManageAccountsModal() {
    // Реализация по необходимости
}

// Показать настройки системы
function showSystemSettings() {
    if (currentUser.role !== 'developer') return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Настройки системы</h2>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Цвет рамки карточки:</label>
                    <input type="color" id="borderColorPicker" value="${cardBorderColor}">
                </div>
                <div class="form-actions">
                    <button id="saveSettings" class="btn btn-primary">Сохранить</button>
                    <button id="cancelSettings" class="btn btn-secondary">Отмена</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Обработчики событий
    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    document.getElementById('cancelSettings').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    document.getElementById('saveSettings').addEventListener('click', () => {
        const newBorderColor = document.getElementById('borderColorPicker').value;
        cardBorderColor = newBorderColor;
        localStorage.setItem('suvorovtsy_border_color', newBorderColor);
        
        updateTable();
        document.body.removeChild(modal);
    });
}

// Форматирование даты
function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

// Показать модальное окно
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Скрыть модальное окно
function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}