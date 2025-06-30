// Настройка темной/светлой темы
const themeToggle = document.getElementById('theme-toggle');

if (localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    updateThemeIcon();
}

function switchTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', switchTheme);

// Навигация между секциями
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.add('active');
        
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

// Конфигурация
let allPlayerData = [];
let currentPage = 1;
const playersPerPage = 10;
const teamName = 'unicorn7love-fun-club';

// Получаем токен из переменной окружения
const LICHESS_TOKEN = window.LICHESS_API_TOKEN || '';

// Настройки GitHub API
const GITHUB_OWNER = 'toxicmarquis';  // Замените на ваш username
const GITHUB_REPO = 'uni7club';      // Замените на название вашего репозитория
const TOURNAMENTS_FOLDER = 'tournaments';

// Функция для получения списка CSV файлов из GitHub
async function getTournamentFiles() {
    try {
        const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${TOURNAMENTS_FOLDER}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const files = await response.json();
        
        // Фильтруем только CSV файлы, начинающиеся с lichess_tournament_
        const csvFiles = files
            .filter(file => 
                file.type === 'file' && 
                file.name.startsWith('lichess_tournament_') && 
                file.name.endsWith('.csv')
            )
            .map(file => ({
                name: file.name,
                downloadUrl: file.download_url
            }));
            
        console.log('Найдены CSV файлы:', csvFiles);
        return csvFiles;
        
    } catch (error) {
        console.error('Ошибка при получении списка файлов:', error);
        // Fallback на ручной список
        return [{
            name: 'lichess_tournament_2025.06.26_eeO2WrZ0_lichess-liga-5b.csv',
            downloadUrl: `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/${TOURNAMENTS_FOLDER}/lichess_tournament_2025.06.26_eeO2WrZ0_lichess-liga-5b.csv`
        }];
    }
}

// Функция для загрузки CSV файла
async function loadCSV(fileInfo) {
    try {
        const response = await fetch(fileInfo.downloadUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        
        // Парсим CSV
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] ? values[index].trim() : '';
            });
            data.push(row);
        }
        
        // Извлекаем дату и лигу из имени файла
        const dateMatch = fileInfo.name.match(/(\d{4})\.(\d{2})\.(\d{2})/);
        const leagueMatch = fileInfo.name.match(/liga-(\d+[a-z]?)/i);
        
        const tournamentDate = dateMatch ? 
            `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : 
            new Date().toISOString().split('T')[0];
            
        const league = leagueMatch ? leagueMatch[1] : 'unknown';
        
        // Добавляем метаданные к каждой записи
        data.forEach(row => {
            row.tournament_date = tournamentDate;
            row.league = league;
            row.filename = fileInfo.name;
        });
        
        console.log(`Загружен файл ${fileInfo.name}: ${data.length} записей`);
        return data;
        
    } catch (error) {
        console.error('Ошибка при загрузке файла:', fileInfo.name, error);
        return [];
    }
}

// Функция для агрегации данных игроков
function aggregatePlayerData(rawData) {
    const playerStats = {};
    
    rawData.forEach(row => {
        if (row.Team !== teamName) return;
        
        const username = row.Username;
        if (!playerStats[username]) {
            playerStats[username] = {
                username: username,
                scores: [],
                performances: [],
                ratings: [],
                tournaments: [],
                leagues: [],
                total_score: 0,
                tournaments_count: 0
            };
        }
        
        const player = playerStats[username];
        const score = parseInt(row.Score) || 0;
        const performance = parseFloat(row.Performance) || 0;
        const rating = parseInt(row.Rating) || 0;
        
        player.scores.push(score);
        player.total_score += score;
        player.tournaments.push(row.tournament_date);
        player.leagues.push(row.league);
        player.tournaments_count++;
        
        if (performance > 0) {
            player.performances.push(performance);
        }
        
        if (rating > 0) {
            player.ratings.push(rating);
        }
    });
    
    // Вычисляем агрегированные статистики
    const result = Object.values(playerStats).map(player => {
        const avgPerformance = player.performances.length > 0 
            ? Math.round(player.performances.reduce((a, b) => a + b, 0) / player.performances.length)
            : 0;
            
        const maxPerformance = player.performances.length > 0 
            ? Math.max(...player.performances) 
            : 0;
            
        const avgRating = player.ratings.length > 0
            ? Math.round(player.ratings.reduce((a, b) => a + b, 0) / player.ratings.length)
            : 0;
            
        const maxRating = player.ratings.length > 0
            ? Math.max(...player.ratings)
            : 0;
            
        const maxScore = player.scores.length > 0
            ? Math.max(...player.scores)
            : 0;
            
        const firstTournament = player.tournaments.length > 0
            ? player.tournaments.sort()[0]
            : '-';
            
        return {
            ...player,
            avg_performance: avgPerformance,
            max_performance: maxPerformance,
            avg_rating: avgRating,
            max_rating: maxRating,
            max_score: maxScore,
            first_tournament: firstTournament
        };
    });
    
    return result;
}

// Функция сортировки игроков для топ-5
function sortPlayersForTop5(players) {
    return players.sort((a, b) => {
        if (b.total_score !== a.total_score) {
            return b.total_score - a.total_score;
        }
        if (b.tournaments_count !== a.tournaments_count) {
            return b.tournaments_count - a.tournaments_count;
        }
        return b.avg_performance - a.avg_performance;
    });
}

// Отображение топ-5 игроков
function renderTop5Players(players) {
    const sortedPlayers = sortPlayersForTop5([...players]);
    const top5 = sortedPlayers.slice(0, 5);
    
    top5.forEach((player, index) => {
        const rankElement = document.querySelector(`.top-player[data-rank="${index + 1}"]`);
        if (rankElement) {
            const nameElement = rankElement.querySelector('.player-name');
            const avgPerfElement = rankElement.querySelector('.avg-perf');
            const avgRatingElement = rankElement.querySelector('.avg-rating');
            const totalScoreElement = rankElement.querySelector('.total-score');
            const tournamentsElement = rankElement.querySelector('.tournaments');
            const firstDateElement = rankElement.querySelector('.first-date');
            
            if (nameElement) nameElement.textContent = player.username;
            if (avgPerfElement) avgPerfElement.textContent = player.avg_performance;
            if (avgRatingElement) avgRatingElement.textContent = player.avg_rating;
            if (totalScoreElement) totalScoreElement.textContent = player.total_score;
            if (tournamentsElement) tournamentsElement.textContent = player.tournaments_count;
            if (firstDateElement) firstDateElement.textContent = player.first_tournament;
        }
    });
}

// Отображение топ-1 в категориях
function renderCategories(players) {
    const categories = [
        { key: 'avg_performance', selector: '.category-item:nth-child(1)' },
        { key: 'tournaments_count', selector: '.category-item:nth-child(2)' },
        { key: 'max_score', selector: '.category-item:nth-child(3)' },
        { key: 'total_score', selector: '.category-item:nth-child(4)' },
        { key: 'max_rating', selector: '.category-item:nth-child(5)' }
    ];
    
    categories.forEach(category => {
        const winner = [...players].sort((a, b) => b[category.key] - a[category.key])[0];
        const categoryElement = document.querySelector(category.selector);
        
        if (categoryElement && winner) {
            const nameElement = categoryElement.querySelector('.winner-name');
            const valueElement = categoryElement.querySelector('.winner-value');
            
            if (nameElement) nameElement.textContent = winner.username;
            if (valueElement) valueElement.textContent = winner[category.key];
        }
    });
}

// Отображение таблицы игроков
function renderPlayersTable(players, page = 1) {
    const sortSelect = document.getElementById('sortSelect');
    const playerSearch = document.getElementById('playerSearch');
    
    if (!sortSelect || !playerSearch) return;
    
    const sortValue = sortSelect.value;
    const searchValue = playerSearch.value.toLowerCase();
    
    let filteredPlayers = players.filter(player => 
        player.username.toLowerCase().includes(searchValue)
    );
    
    filteredPlayers.sort((a, b) => {
        switch (sortValue) {
            case 'avg_performance':
                return b.avg_performance - a.avg_performance;
            case 'tournaments_count':
                return b.tournaments_count - a.tournaments_count;
            default:
                return b.total_score - a.total_score;
        }
    });
    
    const startIndex = (page - 1) * playersPerPage;
    const endIndex = startIndex + playersPerPage;
    const playersToShow = filteredPlayers.slice(startIndex, endIndex);
    
    const tbody = document.getElementById('playersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    playersToShow.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" class="player-link" data-username="${player.username}">${player.username}</a></td>
            <td>${player.total_score}</td>
            <td>${player.max_performance}</td>
            <td>${player.avg_performance}</td>
            <td>${player.avg_rating}</td>
            <td>${player.tournaments_count}</td>
            <td>${player.first_tournament}</td>
        `;
        tbody.appendChild(row);
    });
    
    const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
    const pageInfo = document.getElementById('pageInfo');
    if (pageInfo) {
        pageInfo.textContent = `Страница ${page} из ${totalPages}`;
    }
    
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    if (prevPage) prevPage.disabled = page <= 1;
    if (nextPage) nextPage.disabled = page >= totalPages;
    
    currentPage = page;
    
    // Добавляем обработчики кликов по именам игроков
    document.querySelectorAll('.player-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const username = e.target.getAttribute('data-username');
            showPlayerModal(username);
        });
    });
}

// Показать модальное окно профиля игрока
async function showPlayerModal(username) {
    const modal = document.getElementById('playerModal');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal || !modalContent) return;
    
    modalContent.innerHTML = '<p>Загрузка профиля игрока...</p>';
    modal.style.display = 'block';
    
    try {
        const headers = {};
        if (LICHESS_TOKEN) {
            headers['Authorization'] = `Bearer ${LICHESS_TOKEN}`;
        }
        
        const response = await fetch(`https://lichess.org/api/user/${username}`, { headers });
        
        if (response.ok) {
            const data = await response.json();
            modalContent.innerHTML = `
                <h2>${data.username}</h2>
                <div class="modal-stats">
                    <p><strong>Рейтинг Blitz:</strong> ${data.perfs?.blitz?.rating || 'N/A'}</p>
                    <p><strong>Рейтинг Rapid:</strong> ${data.perfs?.rapid?.rating || 'N/A'}</p>
                    <p><strong>Рейтинг Classical:</strong> ${data.perfs?.classical?.rating || 'N/A'}</p>
                    <p><strong>Всего игр:</strong> ${data.count?.all || 'N/A'}</p>
                    <p><strong>Дата регистрации:</strong> ${new Date(data.createdAt).toLocaleDateString()}</p>
                </div>
                <a href="https://lichess.org/@/${username}" target="_blank" class="lichess-link">
                    <i class="fas fa-external-link-alt"></i> Открыть профиль на Lichess
                </a>
            `;
        } else {
            throw new Error('Не удалось загрузить профиль');
        }
    } catch (error) {
        modalContent.innerHTML = `
            <h2>${username}</h2>
            <p>Не удалось загрузить дополнительную информацию о профиле игрока.</p>
            <a href="https://lichess.org/@/${username}" target="_blank" class="lichess-link">
                <i class="fas fa-external-link-alt"></i> Открыть профиль на Lichess
            </a>
        `;
    }
}

// Инициализация приложения
async function initApp() {
    try {
        console.log('Инициализация приложения...');
        
        // Получаем список CSV файлов из GitHub
        const tournamentFiles = await getTournamentFiles();
        console.log('Найдены файлы турниров:', tournamentFiles);
        
        // Загружаем все файлы
        const allRawData = [];
        for (const fileInfo of tournamentFiles) {
            const data = await loadCSV(fileInfo);
            allRawData.push(...data);
        }
        
        console.log('Загружено записей:', allRawData.length);
        
        // Агрегируем данные игроков
        allPlayerData = aggregatePlayerData(allRawData);
        console.log('Обработано игроков:', allPlayerData.length);
        
        // Отображаем данные
        renderTop5Players(allPlayerData);
        renderCategories(allPlayerData);
        renderPlayersTable(allPlayerData);
        
        console.log('Инициализация завершена');
        
    } catch (error) {
        console.error('Ошибка при инициализации:', error);
    }
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    
    // Поиск игроков
    const playerSearch = document.getElementById('playerSearch');
    if (playerSearch) {
        playerSearch.addEventListener('input', () => {
            renderPlayersTable(allPlayerData, 1);
        });
    }
    
    // Сортировка
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            renderPlayersTable(allPlayerData, 1);
        });
    }
    
    // Пагинация
    const prevPage = document.getElementById('prevPage');
    if (prevPage) {
        prevPage.addEventListener('click', () => {
            if (currentPage > 1) {
                renderPlayersTable(allPlayerData, currentPage - 1);
            }
        });
    }
    
    const nextPage = document.getElementById('nextPage');
    if (nextPage) {
        nextPage.addEventListener('click', () => {
            const totalPages = Math.ceil(allPlayerData.length / playersPerPage);
            if (currentPage < totalPages) {
                renderPlayersTable(allPlayerData, currentPage + 1);
            }
        });
    }
    
    // Закрытие модального окна
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            const modal = document.getElementById('playerModal');
            if (modal) modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('playerModal');
        if (modal && e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
