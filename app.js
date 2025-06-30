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
const GITHUB_OWNER = 'toxicmarquis';
const GITHUB_REPO = 'uni7club';
const TOURNAMENTS_FOLDER = 'tournaments';

// Система уровней
const LEVEL_MULTIPLIER = 1.7;
const BASE_XP = 50;

// Загрузка титулов из JSON
let titlesData = {};

async function loadTitles() {
    try {
        const response = await fetch('titles.json');
        if (response.ok) {
            titlesData = await response.json();
        }
    } catch (error) {
        console.error('Ошибка загрузки титулов:', error);
    }
}

// Функция для получения списка CSV файлов из GitHub
async function getTournamentFiles() {
    try {
        const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${TOURNAMENTS_FOLDER}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const files = await response.json();

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

        const dateMatch = fileInfo.name.match(/(\d{4})\.(\d{2})\.(\d{2})/);
        const leagueMatch = fileInfo.name.match(/liga-(\d+[a-z]?)/i);

        const tournamentDate = dateMatch ? 
            `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : 
            new Date().toISOString().split('T')[0];

        const league = leagueMatch ? leagueMatch[1] : 'unknown';

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

// Функция для расчета коэффициента полезности
function calculateUtilityCoeff(player) {
    return 1000000 * player.total_score + 1000 * player.tournaments_count + player.avg_performance;
}

// Функция для расчета уровня и опыта
function calculateLevel(player) {
    const xp = player.total_score * 10 + player.tournaments_count * 25 + Math.floor(player.avg_performance / 100);

    let level = 0;
    let totalXpNeeded = 0;
    let currentLevelXp = BASE_XP;

    while (totalXpNeeded + currentLevelXp <= xp) {
        totalXpNeeded += currentLevelXp;
        level++;
        currentLevelXp = Math.floor(BASE_XP * Math.pow(LEVEL_MULTIPLIER, level));
    }

    const nextLevelXp = Math.floor(BASE_XP * Math.pow(LEVEL_MULTIPLIER, level));
    const currentXp = xp - totalXpNeeded;
    const progress = Math.min(100, Math.floor((currentXp / nextLevelXp) * 100));

    return {
        level: level,
        currentXp: currentXp,
        nextLevelXp: nextLevelXp,
        progress: progress,
        totalXp: xp
    };
}

// Функция для получения роли игрока
function getPlayerRole(username) {
    const roles = {
        'Unicorn7Love': { role: 'owner', icon: '👑' },
        'ModerMark': { role: 'admin', icon: '👁️' }
    };
    return roles[username] || null;
}

// Функция для получения титула игрока
async function getPlayerTitle(username) {
    // Сначала проверяем локальный JSON
    if (titlesData[username]) {
        return titlesData[username];
    }

    // Затем запрашиваем у Lichess API
    try {
        const headers = {};
        if (LICHESS_TOKEN) {
            headers['Authorization'] = `Bearer ${LICHESS_TOKEN}`;
        }

        const response = await fetch(`https://lichess.org/api/user/${username}`, { headers });
        if (response.ok) {
            const data = await response.json();
            return data.title || null;
        }
    } catch (error) {
        console.error('Ошибка получения титула:', error);
    }

    return null;
}

// Функция для получения рейтингов Lichess
async function getLichessRatings(username) {
    try {
        const headers = {};
        if (LICHESS_TOKEN) {
            headers['Authorization'] = `Bearer ${LICHESS_TOKEN}`;
        }

        const response = await fetch(`https://lichess.org/api/user/${username}`, { headers });
        if (response.ok) {
            const data = await response.json();
            return {
                classical: data.perfs?.classical?.rating || null,
                rapid: data.perfs?.rapid?.rating || null,
                blitz: data.perfs?.blitz?.rating || null,
                bullet: data.perfs?.bullet?.rating || null
            };
        }
    } catch (error) {
        console.error('Ошибка получения рейтингов:', error);
    }

    return { classical: null, rapid: null, blitz: null, bullet: null };
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

        const playerWithStats = {
            ...player,
            avg_performance: avgPerformance,
            max_performance: maxPerformance,
            avg_rating: avgRating,
            max_rating: maxRating,
            max_score: maxScore,
            first_tournament: firstTournament
        };

        // Добавляем коэффициент полезности и уровень
        playerWithStats.utility_coeff = calculateUtilityCoeff(playerWithStats);
        playerWithStats.level_info = calculateLevel(playerWithStats);

        return playerWithStats;
    });

    return result;
}

// Функция сортировки по коэффициенту полезности
function sortPlayersByUtility(players) {
    return players.sort((a, b) => b.utility_coeff - a.utility_coeff);
}

// Отображение топ-5 игроков с новым дизайном
async function renderTop5Players(players) {
    const sortedPlayers = sortPlayersByUtility([...players]);
    const top5 = sortedPlayers.slice(0, 5);

    for (let i = 0; i < top5.length; i++) {
        const player = top5[i];
        const rankElement = document.querySelector(`.top-player[data-rank="${i + 1}"]`);

        if (rankElement) {
            // Получаем дополнительные данные
            const title = await getPlayerTitle(player.username);
            const role = getPlayerRole(player.username);
            const ratings = await getLichessRatings(player.username);

            // Обновляем элементы
            const nameElement = rankElement.querySelector('.player-name');
            const titleElement = rankElement.querySelector('.player-title');
            const roleElement = rankElement.querySelector('.player-role');
            const levelElement = rankElement.querySelector('.player-level');
            const xpBarElement = rankElement.querySelector('.xp-bar-fill');
            const xpTextElement = rankElement.querySelector('.xp-text');
            const firstDateElement = rankElement.querySelector('.first-date');

            // Рейтинги
            const classicalElement = rankElement.querySelector('.rating-classical');
            const rapidElement = rankElement.querySelector('.rating-rapid');
            const blitzElement = rankElement.querySelector('.rating-blitz');
            const bulletElement = rankElement.querySelector('.rating-bullet');

            if (nameElement) nameElement.textContent = player.username;
            if (titleElement) titleElement.textContent = title || '';
            if (roleElement) roleElement.textContent = role ? role.icon : '';
            if (levelElement) levelElement.textContent = `Lv.${player.level_info.level}`;
            if (xpBarElement) xpBarElement.style.width = `${player.level_info.progress}%`;
            if (xpTextElement) xpTextElement.textContent = `${player.level_info.currentXp}/${player.level_info.nextLevelXp}`;
            if (firstDateElement) firstDateElement.textContent = player.first_tournament;

            if (classicalElement) classicalElement.textContent = ratings.classical || '-';
            if (rapidElement) rapidElement.textContent = ratings.rapid || '-';
            if (blitzElement) blitzElement.textContent = ratings.blitz || '-';
            if (bulletElement) bulletElement.textContent = ratings.bullet || '-';
        }
    }
}

// Отображение таблицы игроков с новой сортировкой
function renderPlayersTable(players, page = 1) {
    const sortSelect = document.getElementById('sortSelect');
    const playerSearch = document.getElementById('playerSearch');

    if (!sortSelect || !playerSearch) return;

    const sortValue = sortSelect.value;
    const searchValue = playerSearch.value.toLowerCase();

    let filteredPlayers = players.filter(player => 
        player.username.toLowerCase().includes(searchValue)
    );

    // Сортируем по коэффициенту полезности по умолчанию
    filteredPlayers.sort((a, b) => {
        switch (sortValue) {
            case 'avg_performance':
                return b.avg_performance - a.avg_performance;
            case 'tournaments_count':
                return b.tournaments_count - a.tournaments_count;
            default:
                return b.utility_coeff - a.utility_coeff;
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

    document.querySelectorAll('.player-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const username = e.target.getAttribute('data-username');
            showPlayerModal(username);
        });
    });
}

// Функции для трансляции партий
async function checkTeamPlayersOnline() {
    if (!allPlayerData.length) return null;

    const sortedPlayers = sortPlayersByUtility([...allPlayerData]);

    for (const player of sortedPlayers) {
        try {
            const headers = {};
            if (LICHESS_TOKEN) {
                headers['Authorization'] = `Bearer ${LICHESS_TOKEN}`;
            }

            const response = await fetch(`https://lichess.org/api/user/${player.username}/current-game`, { headers });
            if (response.ok) {
                const gameData = await response.json();
                if (gameData && gameData.id) {
                    return {
                        gameId: gameData.id,
                        player: player.username
                    };
                }
            }
        } catch (error) {
            console.error(`Ошибка проверки игрока ${player.username}:`, error);
        }
    }

    return null;
}

async function getRandomBulletGame() {
    try {
        const response = await fetch('https://lichess.org/api/tv/bullet');
        if (response.ok) {
            const gameData = await response.json();
            return {
                gameId: gameData.id,
                player: 'Random Player'
            };
        }
    } catch (error) {
        console.error('Ошибка получения случайной партии:', error);
    }
    return null;
}

async function startGameStream() {
    const gameStreamContainer = document.getElementById('game-stream');
    if (!gameStreamContainer) return;

    // Сначала проверяем игроков команды
    let currentGame = await checkTeamPlayersOnline();

    if (!currentGame) {
        // Если никто не играет, берем случайную партию
        currentGame = await getRandomBulletGame();
    }

    if (currentGame) {
        gameStreamContainer.innerHTML = `
            <div class="game-stream-header">
                <h3>🔴 Live Game</h3>
                <p>Playing: ${currentGame.player}</p>
            </div>
            <iframe 
                src="https://lichess.org/embed/${currentGame.gameId}?theme=auto&bg=auto" 
                width="100%" 
                height="400" 
                frameborder="0">
            </iframe>
        `;
    } else {
        gameStreamContainer.innerHTML = `
            <div class="game-stream-header">
                <h3>📺 No Live Games</h3>
                <p>No active games found</p>
            </div>
        `;
    }
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

        // Загружаем титулы
        await loadTitles();

        const tournamentFiles = await getTournamentFiles();
        console.log('Найдены файлы турниров:', tournamentFiles);

        const allRawData = [];
        for (const fileInfo of tournamentFiles) {
            const data = await loadCSV(fileInfo);
            allRawData.push(...data);
        }

        console.log('Загружено записей:', allRawData.length);

        allPlayerData = aggregatePlayerData(allRawData);
        console.log('Обработано игроков:', allPlayerData.length);

        await renderTop5Players(allPlayerData);
        renderPlayersTable(allPlayerData);

        // Запускаем трансляцию партий
        await startGameStream();

        // Обновляем трансляцию каждые 30 секунд
        setInterval(startGameStream, 30000);

        console.log('Инициализация завершена');

    } catch (error) {
        console.error('Ошибка при инициализации:', error);
    }
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    initApp();

    const playerSearch = document.getElementById('playerSearch');
    if (playerSearch) {
        playerSearch.addEventListener('input', () => {
            renderPlayersTable(allPlayerData, 1);
        });
    }

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            renderPlayersTable(allPlayerData, 1);
        });
    }

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