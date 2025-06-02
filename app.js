// Данные приложения
let suvorovData = [
    {"id": 1, "name": "Зуенко К.М.", "platoon": "31", "physicalTraining": 95, "birthdate": "2005-03-15", "averageScore": 4.8, "awards": ["Поощрение начальника училища"], "punishments": []},
    {"id": 2, "name": "Катаев В.С.", "platoon": "31", "physicalTraining": 93, "birthdate": "2005-04-22", "averageScore": 4.7, "awards": [], "punishments": []},
    {"id": 3, "name": "Сережка А.Д.", "platoon": "31", "physicalTraining": 90, "birthdate": "2005-05-10", "averageScore": 4.5, "awards": [], "punishments": []},
    {"id": 4, "name": "Трунов Н.С.", "platoon": "31", "physicalTraining": 83, "birthdate": "2005-06-12", "averageScore": 4.2, "awards": [], "punishments": []},
    {"id": 5, "name": "Ниязов П.С.", "platoon": "31", "physicalTraining": 82, "birthdate": "2005-07-05", "averageScore": 4.3, "awards": [], "punishments": []},
    {"id": 6, "name": "Степанко М.И.", "platoon": "31", "physicalTraining": 80, "birthdate": "2005-08-18", "averageScore": 4.0, "awards": [], "punishments": ["Замечание по дисциплине"]},
    {"id": 7, "name": "Ельченко А.Ф.", "platoon": "31", "physicalTraining": 77, "birthdate": "2005-09-27", "averageScore": 3.9, "awards": [], "punishments": []},
    {"id": 8, "name": "Агупов С.Д.", "platoon": "31", "physicalTraining": 77, "birthdate": "2005-10-03", "averageScore": 3.8, "awards": [], "punishments": []},
    {"id": 16, "name": "Алексанян А.С.", "platoon": "32", "physicalTraining": 88, "birthdate": "2005-01-12", "averageScore": 4.7, "awards": ["Отличник боевой подготовки"], "punishments": []},
    {"id": 17, "name": "Бабочкин В.С.", "platoon": "32", "physicalTraining": 85, "birthdate": "2005-02-28", "averageScore": 4.6, "awards": [], "punishments": []},
    {"id": 18, "name": "Рыночкин А.В.", "platoon": "32", "physicalTraining": 83, "birthdate": "2005-03-15", "averageScore": 4.5, "awards": [], "punishments": []},
    {"id": 31, "name": "Бородин М.Р.", "platoon": "33", "physicalTraining": 95, "birthdate": "2005-01-05", "averageScore": 4.9, "awards": ["Отличник учебы", "Поощрение начальника училища"], "punishments": []},
    {"id": 32, "name": "Бородин А.Р.", "platoon": "33", "physicalTraining": 93, "birthdate": "2005-02-10", "averageScore": 4.8, "awards": ["Отличник боевой подготовки"], "punishments": []},
    {"id": 33, "name": "Дунаева Н.С.", "platoon": "33", "physicalTraining": 90, "birthdate": "2005-03-15", "averageScore": 4.7, "awards": [], "punishments": []}
];

const users = {
    "admin": {"password": "suvorov2024", "role": "admin"},
    "user": {"password": "view123", "role": "user"}
};

// Глобальные переменные состояния
let currentUser = null;
let filteredData = [...suvorovData];
let editingCadet = null;
let deletingCadet = null;

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateLeaderboard();
    updateStatistics();
});

// Инициализация приложения
function initializeApp() {
    // Проверяем, есть ли сохраненная сессия (используем переменную вместо localStorage)
    updateAuthUI();
    updateAdminPanel();
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Авторизация
    document.getElementById('auth-button').addEventListener('click', showAuthModal);
    document.getElementById('login-button').addEventListener('click', handleLogin);
    document.getElementById('logout-button').addEventListener('click', handleLogout);
    
    // Поиск и фильтры
    document.getElementById('search-input').addEventListener('input', handleSearch);
    document.getElementById('search-btn').addEventListener('click', handleSearch);
    document.getElementById('platoon-filter').addEventListener('change', handleFilter);
    document.getElementById('sort-by').addEventListener('change', handleSort);
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
    
    // Админ функции
    document.getElementById('add-suvorov-btn').addEventListener('click', showAddModal);
    document.getElementById('export-data-btn').addEventListener('click', exportData);
    document.getElementById('import-data-btn').addEventListener('click', () => {
        document.getElementById('import-file').click();
    });
    document.getElementById('import-file').addEventListener('change', importData);
    
    // Модальные окна
    document.addEventListener('click', handleModalClose);
    
    // Формы
    document.getElementById('edit-form').addEventListener('submit', handleSaveCadet);
    document.getElementById('cancel-edit').addEventListener('click', hideEditModal);
    document.getElementById('confirm-delete').addEventListener('click', handleDeleteCadet);
    document.getElementById('cancel-delete').addEventListener('click', hideDeleteModal);
    
    // Клавиши
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideAllModals();
        }
    });
}

// Система авторизации
function showAuthModal() {
    document.getElementById('auth-modal').classList.remove('hidden');
    document.getElementById('username').focus();
}

function hideAuthModal() {
    document.getElementById('auth-modal').classList.add('hidden');
    clearAuthForm();
}

function clearAuthForm() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('auth-error').classList.add('hidden');
}

function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (users[username] && users[username].password === password) {
        currentUser = {
            username: username,
            role: users[username].role
        };
        hideAuthModal();
        updateAuthUI();
        updateAdminPanel();
        showNotification('Успешная авторизация!', 'success');
    } else {
        document.getElementById('auth-error').classList.remove('hidden');
    }
}

function handleLogout() {
    currentUser = null;
    updateAuthUI();
    updateAdminPanel();
    showNotification('Вы вышли из системы', 'info');
}

function updateAuthUI() {
    const authButton = document.getElementById('auth-button');
    const userPanel = document.getElementById('user-panel');
    const userName = document.getElementById('user-name');
    
    if (currentUser) {
        authButton.classList.add('hidden');
        userPanel.classList.remove('hidden');
        userName.textContent = `${currentUser.username} (${currentUser.role === 'admin' ? 'Админ' : 'Пользователь'})`;
    } else {
        authButton.classList.remove('hidden');
        userPanel.classList.add('hidden');
    }
}

function updateAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    if (currentUser && currentUser.role === 'admin') {
        adminPanel.classList.remove('hidden');
    } else {
        adminPanel.classList.add('hidden');
    }
}

// Поиск и фильтрация
function handleSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    const platoonFilter = document.getElementById('platoon-filter').value;
    
    filteredData = suvorovData.filter(cadet => {
        const matchesSearch = cadet.name.toLowerCase().includes(searchTerm);
        const matchesPlatoon = platoonFilter === 'all' || cadet.platoon === platoonFilter;
        return matchesSearch && matchesPlatoon;
    });
    
    updateLeaderboard();
}

function handleFilter() {
    handleSearch(); // Вызываем поиск, который учитывает все фильтры
}

function handleSort() {
    const sortBy = document.getElementById('sort-by').value;
    
    filteredData.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'platoon':
                return a.platoon.localeCompare(b.platoon);
            case 'physicalTraining':
                return b.physicalTraining - a.physicalTraining;
            case 'averageScore':
                return b.averageScore - a.averageScore;
            case 'rank':
            default:
                return getRank(b) - getRank(a);
        }
    });
    
    updateLeaderboard();
}

function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('platoon-filter').value = 'all';
    document.getElementById('sort-by').value = 'rank';
    filteredData = [...suvorovData];
    updateLeaderboard();
}

// Расчет рейтинга
function getRank(cadet) {
    return cadet.physicalTraining * 0.6 + cadet.averageScore * 20 * 0.4;
}

// Обновление таблицы лидеров
function updateLeaderboard() {
    const tbody = document.getElementById('leaderboard-body');
    const noResults = document.getElementById('no-results');
    
    if (filteredData.length === 0) {
        tbody.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    
    // Сортируем по рейтингу для определения места
    const sortedData = [...filteredData].sort((a, b) => getRank(b) - getRank(a));
    
    tbody.innerHTML = sortedData.map((cadet, index) => {
        const rank = index + 1;
        const rankClass = rank <= 3 ? `rank-${rank}` : 'rank-other';
        
        return `
            <tr>
                <td>
                    <div class="rank-badge ${rankClass}">${rank}</div>
                </td>
                <td>${cadet.name}</td>
                <td>
                    <span class="platoon-badge platoon-${cadet.platoon}">${cadet.platoon} взвод</span>
                </td>
                <td>
                    <span class="physical-score">${cadet.physicalTraining}</span>
                </td>
                <td>${cadet.averageScore.toFixed(1)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn--outline btn--sm" onclick="showDetailsModal(${cadet.id})">
                            <i class="fas fa-eye"></i> Подробнее
                        </button>
                        ${currentUser && currentUser.role === 'admin' ? `
                            <button class="btn btn--secondary btn--sm" onclick="showEditModal(${cadet.id})">
                                <i class="fas fa-edit"></i> Изменить
                            </button>
                            <button class="btn btn--error btn--sm" onclick="showDeleteModal(${cadet.id})">
                                <i class="fas fa-trash"></i> Удалить
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Обновление статистики
function updateStatistics() {
    const totalCadets = suvorovData.length;
    const avgPhysical = (suvorovData.reduce((sum, cadet) => sum + cadet.physicalTraining, 0) / totalCadets).toFixed(1);
    const avgAcademic = (suvorovData.reduce((sum, cadet) => sum + cadet.averageScore, 0) / totalCadets).toFixed(1);
    
    // Определяем лучший взвод по среднему баллу ФП
    const platoonStats = {};
    suvorovData.forEach(cadet => {
        if (!platoonStats[cadet.platoon]) {
            platoonStats[cadet.platoon] = { total: 0, count: 0 };
        }
        platoonStats[cadet.platoon].total += cadet.physicalTraining;
        platoonStats[cadet.platoon].count++;
    });
    
    let bestPlatoon = '';
    let bestAvg = 0;
    Object.keys(platoonStats).forEach(platoon => {
        const avg = platoonStats[platoon].total / platoonStats[platoon].count;
        if (avg > bestAvg) {
            bestAvg = avg;
            bestPlatoon = platoon;
        }
    });
    
    document.getElementById('total-cadets').textContent = totalCadets;
    document.getElementById('avg-physical').textContent = avgPhysical;
    document.getElementById('avg-academic').textContent = avgAcademic;
    document.getElementById('best-platoon').textContent = bestPlatoon ? `${bestPlatoon} взвод` : '-';
}

// Модальные окна
function showDetailsModal(cadetId) {
    const cadet = suvorovData.find(c => c.id === cadetId);
    if (!cadet) return;
    
    document.getElementById('detail-name').textContent = cadet.name;
    document.getElementById('detail-platoon').textContent = `${cadet.platoon} взвод`;
    document.getElementById('detail-birthdate').textContent = formatDate(cadet.birthdate);
    document.getElementById('detail-physicalTraining').textContent = cadet.physicalTraining;
    document.getElementById('detail-averageScore').textContent = cadet.averageScore.toFixed(1);
    
    const awardsList = document.getElementById('detail-awards');
    awardsList.innerHTML = cadet.awards.length > 0 
        ? cadet.awards.map(award => `<li>${award}</li>`).join('')
        : '<li>Нет поощрений</li>';
        
    const punishmentsList = document.getElementById('detail-punishments');
    punishmentsList.innerHTML = cadet.punishments.length > 0 
        ? cadet.punishments.map(punishment => `<li>${punishment}</li>`).join('')
        : '<li>Нет взысканий</li>';
    
    document.getElementById('details-modal').classList.remove('hidden');
}

function showEditModal(cadetId) {
    if (!currentUser || currentUser.role !== 'admin') return;
    
    const cadet = suvorovData.find(c => c.id === cadetId);
    if (!cadet) return;
    
    editingCadet = cadet;
    
    document.getElementById('edit-modal-title').textContent = 'Редактирование данных';
    document.getElementById('edit-id').value = cadet.id;
    document.getElementById('edit-name').value = cadet.name;
    document.getElementById('edit-platoon').value = cadet.platoon;
    document.getElementById('edit-birthdate').value = cadet.birthdate;
    document.getElementById('edit-physicalTraining').value = cadet.physicalTraining;
    document.getElementById('edit-averageScore').value = cadet.averageScore;
    document.getElementById('edit-awards').value = cadet.awards.join(', ');
    document.getElementById('edit-punishments').value = cadet.punishments.join(', ');
    
    document.getElementById('edit-modal').classList.remove('hidden');
}

function showAddModal() {
    if (!currentUser || currentUser.role !== 'admin') return;
    
    editingCadet = null;
    
    document.getElementById('edit-modal-title').textContent = 'Добавление суворовца';
    document.getElementById('edit-form').reset();
    document.getElementById('edit-id').value = '';
    
    document.getElementById('edit-modal').classList.remove('hidden');
}

function showDeleteModal(cadetId) {
    if (!currentUser || currentUser.role !== 'admin') return;
    
    const cadet = suvorovData.find(c => c.id === cadetId);
    if (!cadet) return;
    
    deletingCadet = cadet;
    document.getElementById('delete-name').textContent = cadet.name;
    document.getElementById('delete-modal').classList.remove('hidden');
}

function hideEditModal() {
    document.getElementById('edit-modal').classList.add('hidden');
    editingCadet = null;
}

function hideDeleteModal() {
    document.getElementById('delete-modal').classList.add('hidden');
    deletingCadet = null;
}

function hideAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
    editingCadet = null;
    deletingCadet = null;
}

function handleModalClose(e) {
    if (e.target.classList.contains('modal') || e.target.classList.contains('close-modal')) {
        hideAllModals();
    }
}

// CRUD операции
function handleSaveCadet(e) {
    e.preventDefault();
    
    if (!currentUser || currentUser.role !== 'admin') return;
    
    const formData = new FormData(e.target);
    const cadetData = {
        name: document.getElementById('edit-name').value.trim(),
        platoon: document.getElementById('edit-platoon').value,
        birthdate: document.getElementById('edit-birthdate').value,
        physicalTraining: parseInt(document.getElementById('edit-physicalTraining').value),
        averageScore: parseFloat(document.getElementById('edit-averageScore').value),
        awards: document.getElementById('edit-awards').value.split(',').map(s => s.trim()).filter(s => s),
        punishments: document.getElementById('edit-punishments').value.split(',').map(s => s.trim()).filter(s => s)
    };
    
    if (editingCadet) {
        // Редактирование
        const index = suvorovData.findIndex(c => c.id === editingCadet.id);
        if (index !== -1) {
            suvorovData[index] = { ...suvorovData[index], ...cadetData };
            showNotification('Данные успешно обновлены!', 'success');
        }
    } else {
        // Добавление
        const newId = Math.max(...suvorovData.map(c => c.id)) + 1;
        suvorovData.push({ id: newId, ...cadetData });
        showNotification('Суворовец успешно добавлен!', 'success');
    }
    
    hideEditModal();
    updateLeaderboard();
    updateStatistics();
    handleSearch(); // Обновляем фильтрованные данные
}

function handleDeleteCadet() {
    if (!currentUser || currentUser.role !== 'admin' || !deletingCadet) return;
    
    const index = suvorovData.findIndex(c => c.id === deletingCadet.id);
    if (index !== -1) {
        suvorovData.splice(index, 1);
        showNotification('Суворовец удален из списка', 'success');
        hideDeleteModal();
        updateLeaderboard();
        updateStatistics();
        handleSearch(); // Обновляем фильтрованные данные
    }
}

// Экспорт/импорт данных
function exportData() {
    if (!currentUser || currentUser.role !== 'admin') return;
    
    const dataToExport = {
        suvorovData: suvorovData,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `suvorov_data_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Данные экспортированы!', 'success');
}

function importData(e) {
    if (!currentUser || currentUser.role !== 'admin') return;
    
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const importedData = JSON.parse(event.target.result);
            
            if (importedData.suvorovData && Array.isArray(importedData.suvorovData)) {
                suvorovData = importedData.suvorovData;
                updateLeaderboard();
                updateStatistics();
                handleSearch();
                showNotification('Данные успешно импортированы!', 'success');
            } else {
                showNotification('Неверный формат файла!', 'error');
            }
        } catch (error) {
            showNotification('Ошибка при чтении файла!', 'error');
        }
    };
    
    reader.readAsText(file);
    e.target.value = ''; // Сброс input
}

// Уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: var(--bg-secondary);
        color: var(--text-primary);
        border-radius: 8px;
        border-left: 4px solid var(--accent-primary);
        box-shadow: var(--shadow-medium);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    if (type === 'error') {
        notification.style.borderLeftColor = 'var(--error)';
    } else if (type === 'success') {
        notification.style.borderLeftColor = 'var(--success)';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Утилиты
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Дополнительные стили для уведомлений
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);