# Основная логика для лидерной таблицы суворовцев

```javascript
// Глобальные переменные
let currentUser = null;
let filteredData = [];
let editingId = null;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadSavedData();
    updateDisplay();
    checkAuth();
});

// Инициализация приложения
function initializeApp() {
    filteredData = [...suvorovData];
    console.log('Приложение инициализировано');
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Поиск и фильтрация
    const searchInput = document.getElementById('searchInput');
    const platoonFilter = document.getElementById('platoonFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterData);
    }
    
    if (platoonFilter) {
        platoonFilter.addEventListener('change', filterData);
    }
    
    // Форма авторизации
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', handleLogin);
    }
    
    // Закрытие модальных окон при клике вне их
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Обработка нажатия Escape для закрытия модальных окон
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Загрузка сохраненных данных
function loadSavedData() {
    const savedData = localStorage.getItem('suvorovData');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            if (Array.isArray(parsedData) && parsedData.length > 0) {
                suvorovData.length = 0;
                suvorovData.push(...parsedData);
                filteredData = [...suvorovData];
                console.log('Данные загружены из localStorage');
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    }
}

// Сохранение данных
function saveData() {
    try {
        localStorage.setItem('suvorovData', JSON.stringify(suvorovData));
        console.log('Данные сохранены в localStorage');
    } catch (error) {
        console.error('Ошибка при сохранении данных:', error);
        alert('Ошибка при сохранении данных');
    }
}

// Обработка входа в систему
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    
    if (users[username] && users[username].password === password) {
        currentUser = {
            username: username,
            role: users[username].role
        };
        
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateAuthUI();
        
        // Очистка полей
        document.getElementById('loginInput').value = '';
        document.getElementById('passwordInput').value = '';
        
        alert(`Добро пожаловать, ${currentUser.role === 'admin' ? 'администратор' : 'пользователь'}!`);
    } else {
        alert('Неверные учетные данные');
    }
}

// Выход из системы
function logout() {
    currentUser = null;
    sessionStorage.removeItem('currentUser');
    updateAuthUI();
    alert('Вы вышли из системы');
}

// Обновление интерфейса авторизации
function updateAuthUI() {
    const userInfo = document.getElementById('userInfo');
    const adminControls = document.getElementById('adminControls');
    
    if (currentUser) {
        const roleText = currentUser.role === 'admin' ? 'Администратор' : 'Пользователь';
        userInfo.textContent = `${roleText}: ${currentUser.username}`;
        
        if (currentUser.role === 'admin' && adminControls) {
            adminControls.classList.add('show');
        }
    } else {
        userInfo.textContent = 'Не авторизован';
        if (adminControls) {
            adminControls.classList.remove('show');
        }
    }
    
    updateTable();
}

// Проверка сохраненной авторизации
function checkAuth() {
    const saved = sessionStorage.getItem('currentUser');
    if (saved) {
        try {
            currentUser = JSON.parse(saved);
            updateAuthUI();
        } catch (error) {
            console.error('Ошибка при восстановлении авторизации:', error);
            sessionStorage.removeItem('currentUser');
        }
    }
}

// Фильтрация данных
function filterData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const platoonFilter = document.getElementById('platoonFilter').value;
    
    filteredData = suvorovData.filter(suvorov => {
        const matchesSearch = searchTerm === '' || suvorov.name.toLowerCase().includes(searchTerm);
        const matchesPlatoon = platoonFilter === '' || suvorov.platoon === platoonFilter;
        return matchesSearch && matchesPlatoon;
    });
    
    updateTable();
}

// Обновление всего отображения
function updateDisplay() {
    updateTable();
    updateStats();
}

// Обновление таблицы
function updateTable() {
    const tbody = document.getElementById('suvorovTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Сортировка по результатам ФП
    const sortedData = [...filteredData].sort((a, b) => b.physicalTraining - a.physicalTraining);
    
    sortedData.forEach((suvorov, index) => {
        const row = document.createElement('tr');
        
        const rank = index + 1;
        let rankClass = 'rank-cell';
        if (rank === 1) rankClass += ' rank-1';
        else if (rank === 2) rankClass += ' rank-2';
        else if (rank === 3) rankClass += ' rank-3';
        
        let scoreClass = 'score-cell';
        if (suvorov.physicalTraining >= 85) scoreClass += ' score-excellent';
        else if (suvorov.physicalTraining >= 70) scoreClass += ' score-good';
        else scoreClass += ' score-average';
        
        row.innerHTML = `
            <td class="${rankClass}">${rank}</td>
            <td><strong>${suvorov.name}</strong></td>
            <td><span class="platoon-badge platoon-${suvorov.platoon}">${suvorov.platoon}</span></td>
            <td class="${scoreClass}">${suvorov.physicalTraining}</td>
            <td>${suvorov.averageScore}</td>
            <td>
                <button class="btn btn-primary btn-small" onclick="showDetails(${suvorov.id})">Подробнее</button>
                ${currentUser && currentUser.role === 'admin' ? `
                    <button class="btn btn-warning btn-small" onclick="editSuvorov(${suvorov.id})">Изменить</button>
                    <button class="btn btn-danger btn-small" onclick="deleteSuvorov(${suvorov.id})">Удалить</button>
                ` : ''}
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Обновление статистики
function updateStats() {
    const totalCount = suvorovData.length;
    const avgScore = totalCount > 0 ? (suvorovData.reduce((sum, s) => sum + s.physicalTraining, 0) / totalCount).toFixed(1) : 0;
    
    // Определение лучшего взвода
    const platoonScores = {};
    suvorovData.forEach(s => {
        if (!platoonScores[s.platoon]) {
            platoonScores[s.platoon] = { total: 0, count: 0 };
        }
        platoonScores[s.platoon].total += s.physicalTraining;
        platoonScores[s.platoon].count++;
    });
    
    let topPlatoon = '-';
    let topAverage = 0;
    Object.keys(platoonScores).forEach(platoon => {
        const avg = platoonScores[platoon].total / platoonScores[platoon].count;
        if (avg > topAverage) {
            topAverage = avg;
            topPlatoon = platoon;
        }
    });
    
    // Обновление элементов статистики
    const totalCountEl = document.getElementById('totalCount');
    const avgScoreEl = document.getElementById('avgScore');
    const topPlatoonEl = document.getElementById('topPlatoon');
    
    if (totalCountEl) totalCountEl.textContent = totalCount;
    if (avgScoreEl) avgScoreEl.textContent = avgScore;
    if (topPlatoonEl) topPlatoonEl.textContent = topPlatoon;
}

// Показ детальной информации
function showDetails(id) {
    const suvorov = suvorovData.find(s => s.id === id);
    if (!suvorov) return;
    
    const modal = document.getElementById('detailModal');
    const title = document.getElementById('detailModalTitle');
    const content = document.getElementById('detailContent');
    
    if (!modal || !title || !content) return;
    
    title.textContent = `Детальная информация - ${suvorov.name}`;
    
    const birthDate = new Date(suvorov.birthdate);
    const formattedDate = birthDate.toLocaleDateString('ru-RU');
    
    const age = new Date().getFullYear() - birthDate.getFullYear();
    
    content.innerHTML = `
        <div class="detail-grid">
            <div class="detail-item">
                <div class="detail-label">ФИО</div>
                <div class="detail-value">${suvorov.name}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Учебный взвод</div>
                <div class="detail-value">${suvorov.platoon}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Дата рождения</div>
                <div class="detail-value">${formattedDate} (${age} лет)</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Физическая подготовка</div>
                <div class="detail-value">${suvorov.physicalTraining} баллов</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Средний балл аттестата</div>
                <div class="detail-value">${suvorov.averageScore}</div>
            </div>
        </div>
        
        <div class="detail-item">
            <div class="detail-label">Поощрения</div>
            <div class="detail-value">
                ${suvorov.awards.length > 0 ? 
                    `<ul class="awards-list">${suvorov.awards.map(award => `<li>${award}</li>`).join('')}</ul>` :
                    '<em>Нет поощрений</em>'
                }
            </div>
        </div>
        
        <div class="detail-item">
            <div class="detail-label">Взыскания</div>
            <div class="detail-value">
                ${suvorov.punishments.length > 0 ? 
                    `<ul class="punishments-list">${suvorov.punishments.map(punishment => `<li>${punishment}</li>`).join('')}</ul>` :
                    '<em>Нет взысканий</em>'
                }
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Показ модального окна добавления
function showAddModal() {
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Доступ запрещен');
        return;
    }
    
    editingId = null;
    const modalTitle = document.getElementById('editModalTitle');
    const form = document.getElementById('editForm');
    
    if (modalTitle) modalTitle.textContent = 'Добавить суворовца';
    if (form) form.reset();
    
    document.getElementById('editModal').style.display = 'block';
}

// Редактирование суворовца
function editSuvorov(id) {
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Доступ запрещен');
        return;
    }
    
    const suvorov = suvorovData.find(s => s.id === id);
    if (!suvorov) return;
    
    editingId = id;
    const modalTitle = document.getElementById('editModalTitle');
    if (modalTitle) modalTitle.textContent = 'Изменить данные суворовца';
    
    // Заполнение формы
    document.getElementById('editName').value = suvorov.name;
    document.getElementById('editPlatoon').value = suvorov.platoon;
    document.getElementById('editBirthdate').value = suvorov.birthdate;
    document.getElementById('editPhysicalTraining').value = suvorov.physicalTraining;
    document.getElementById('editAverageScore').value = suvorov.averageScore;
    document.getElementById('editAwards').value = suvorov.awards.join(', ');
    document.getElementById('editPunishments').value = suvorov.punishments.join(', ');
    
    document.getElementById('editModal').style.display = 'block';
}

// Сохранение суворовца
function saveSuvorov(event) {
    event.preventDefault();
    
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Доступ запрещен');
        return;
    }
    
    // Получение данных из формы
    const name = document.getElementById('editName').value.trim();
    const platoon = document.getElementById('editPlatoon').value;
    const birthdate = document.getElementById('editBirthdate').value;
    const physicalTraining = parseInt(document.getElementById('editPhysicalTraining').value);
    const averageScore = parseFloat(document.getElementById('editAverageScore').value);
    const awards = document.getElementById('editAwards').value
        .split(',')
        .map(s => s.trim())
        .filter(s => s);
    const punishments = document.getElementById('editPunishments').value
        .split(',')
        .map(s => s.trim())
        .filter(s => s);
    
    // Валидация
    if (!name || !platoon || !birthdate || isNaN(physicalTraining) || isNaN(averageScore)) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }
    
    if (physicalTraining < 0 || physicalTraining > 100) {
        alert('Баллы физической подготовки должны быть от 0 до 100');
        return;
    }
    
    if (averageScore < 1 || averageScore > 5) {
        alert('Средний балл должен быть от 1 до 5');
        return;
    }
    
    if (editingId) {
        // Редактирование
        const index = suvorovData.findIndex(s => s.id === editingId);
        if (index !== -1) {
            suvorovData[index] = {
                ...suvorovData[index],
                name, platoon, birthdate, physicalTraining, averageScore, awards, punishments
            };
        }
    } else {
        // Добавление
        const newId = Math.max(...suvorovData.map(s => s.id), 0) + 1;
        suvorovData.push({
            id: newId,
            name, platoon, birthdate, physicalTraining, averageScore, awards, punishments
        });
    }
    
    saveData();
    filterData();
    closeModal('editModal');
    alert(editingId ? 'Данные обновлены' : 'Суворовец добавлен');
}

// Удаление суворовца
function deleteSuvorov(id) {
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Доступ запрещен');
        return;
    }
    
    const suvorov = suvorovData.find(s => s.id === id);
    if (!suvorov) return;
    
    if (confirm(`Вы уверены, что хотите удалить ${suvorov.name}?`)) {
        const index = suvorovData.findIndex(s => s.id === id);
        if (index !== -1) {
            suvorovData.splice(index, 1);
            saveData();
            filterData();
            alert('Суворовец удален');
        }
    }
}

// Экспорт данных
function exportData() {
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Доступ запрещен');
        return;
    }
    
    const dataString = JSON.stringify(suvorovData, null, 2);
    const formattedData = `const suvorovData = ${dataString};`;
    
    // Создание и скачивание файла
    const blob = new Blob([formattedData], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'suvorov-data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Копирование в буфер обмена
    navigator.clipboard.writeText(formattedData).then(() => {
        alert('Данные экспортированы в файл и скопированы в буфер обмена');
    }).catch(() => {
        alert('Данные экспортированы в файл');
    });
}

// Показ модального окна импорта
function showImportModal() {
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Доступ запрещен');
        return;
    }
    
    document.getElementById('importModal').style.display = 'block';
}

// Импорт данных
function importData() {
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Доступ запрещен');
        return;
    }
    
    const importText = document.getElementById('importData').value.trim();
    
    if (!importText) {
        alert('Введите данные для импорта');
        return;
    }
    
    try {
        const importedData = JSON.parse(importText);
        
        if (Array.isArray(importedData) && importedData.length > 0) {
            // Валидация структуры данных
            const isValid = importedData.every(item => 
                item.hasOwnProperty('id') &&
                item.hasOwnProperty('name') &&
                item.hasOwnProperty('platoon') &&
                item.hasOwnProperty('physicalTraining') &&
                item.hasOwnProperty('averageScore')
            );
            
            if (!isValid) {
                alert('Неверная структура данных');
                return;
            }
            
            suvorovData.length = 0;
            suvorovData.push(...importedData);
            saveData();
            filterData();
            closeModal('importModal');
            alert('Данные успешно импортированы');
        } else {
            alert('Неверный формат данных');
        }
    } catch (error) {
        console.error('Ошибка импорта:', error);
        alert('Ошибка при импорте данных: ' + error.message);
    }
}

// Закрытие модального окна
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Закрытие всех модальных окон
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Утилитарные функции
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

function calculateAge(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

// Обработка ошибок
window.addEventListener('error', function(event) {
    console.error('Глобальная ошибка:', event.error);
});

// Обработка ошибок промисов
window.addEventListener('unhandledrejection', function(event) {
    console.error('Необработанное отклонение промиса:', event.reason);
});
```