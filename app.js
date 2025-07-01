// Константы системы уровней и конфигурации
const BASE_EXPERIENCE = 50;
const LEVEL_MULTIPLIER = 1.1;

// Переменные для работы с данными
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
const USER_DATA_FOLDER = 'user';

// База титулов игроков
const TITLE_DATABASE = {
    "Unicorn7Love": "IM",
    "ModerMark": "AIM",
    "Tom_and_Jerry2024": "AFM"
};

// Настройка темной/светлой темы
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon();
    
    themeToggle.addEventListener('click', switchTheme);
}

function switchTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Навигация между секциями
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Убираем активный класс у всех секций
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });

            // Показываем нужную секцию
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Обновляем активную ссылку в навигации
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });
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

// Функция для загрузки пользовательских данных
async function loadUserData(username) {
  const fileLocal = `user/${username.toLowerCase()}.json`;          // ✓ тот же origin
  const fileRaw   = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/${USER_DATA_FOLDER}/${username.toLowerCase()}.json`;

  try {
    // 1) пытаемся взять локальный файл (не наткнёмся на CORS)
    let res = await fetch(fileLocal, {cache:'no-store'});
    if (res.ok) return await res.json();
    // 2) резерв: пробуем GitHub Raw (нужен, если сайт развёрнут НЕ из той же ветки)
    res = await fetch(fileRaw, {cache:'no-store'});
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('loadUserData:', e);
  }
  return null;            // ничего не нашли — работаем с дефолтами
}


// Функция для вычисления уровня и опыта
function calculateLevel(totalScore, attendanceCount, avgPerformance) {
    const experience = totalScore * 10 + attendanceCount * 25 + Math.floor(avgPerformance / 100);

    let level = 0;
    let requiredExp = BASE_EXPERIENCE;
    let totalRequiredExp = 0;

    while (experience >= totalRequiredExp + requiredExp) {
        totalRequiredExp += requiredExp;
        level++;
        requiredExp = Math.floor(BASE_EXPERIENCE * Math.pow(LEVEL_MULTIPLIER, level));
    }

    const currentLevelExp = experience - totalRequiredExp;
    const nextLevelExp = requiredExp;
    const progressPercent = Math.floor((currentLevelExp / nextLevelExp) * 100);

    return {
        level,
        experience,
        currentLevelExp,
        nextLevelExp,
        progressPercent
    };
}

// Функция определения типа рамки по уровню
function getFrameType(level) {
    if (level >= 20) return 'epic';
    if (level >= 15) return 'colored';
    if (level >= 10) return 'basic';
    return 'none';
}

// Функция для получения титула игрока
async function getPlayerTitle(username) {
    if (TITLE_DATABASE.hasOwnProperty(username)) {
        return TITLE_DATABASE[username];
    }

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
        console.error('Ошибка при получении титула:', error);
    }

    return null;
}

// Функция для получения рейтингов игрока
async function getPlayerRatings(username) {
    try {
        const headers = {};
        if (LICHESS_TOKEN) {
            headers['Authorization'] = `Bearer ${LICHESS_TOKEN}`;
        }

        const response = await fetch(`https://lichess.org/api/user/${username}`, { headers });

        if (response.ok) {
            const data = await response.json();
            return {
                bullet: data.perfs?.bullet?.rating || '-',
                blitz: data.perfs?.blitz?.rating || '-',
                rapid: data.perfs?.rapid?.rating || '-',
                classical: data.perfs?.classical?.rating || '-'
            };
        }
    } catch (error) {
        console.error('Ошибка при получении рейтингов:', error);
    }

    return {
        bullet: '-',
        blitz: '-',
        rapid: '-',
        classical: '-'
    };
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

        // Вычисляем коэффициент полезности
        const utilityCoefficient = player.total_score * 1000000 + player.tournaments_count * 1000 + avgPerformance;

        // Вычисляем уровень
        const levelInfo = calculateLevel(player.total_score, player.tournaments_count, avgPerformance);

        return {
            ...player,
            avg_performance: avgPerformance,
            max_performance: maxPerformance,
            avg_rating: avgRating,
            max_rating: maxRating,
            max_score: maxScore,
            first_tournament: firstTournament,
            utility_coefficient: utilityCoefficient,
            ...levelInfo
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
async function renderTop5Players(players) {
    const sortedPlayers = sortPlayersForTop5([...players]);
    const top5 = sortedPlayers.slice(0, 5);

    for (let i = 0; i < top5.length; i++) {
        const player = top5[i];
        const rankElement = document.querySelector(`.top-player[data-rank="${i + 1}"]`);

        if (rankElement) {
            const title = await getPlayerTitle(player.username);
            const ratings = await getPlayerRatings(player.username);

            const titleElement = rankElement.querySelector('.player-title');
            const nameElement = rankElement.querySelector('.player-name');
            const levelElement = rankElement.querySelector('.level-number');
            const expFillElement = rankElement.querySelector('.experience-fill');
            const expValueElement = rankElement.querySelector('.experience-value');
            const ratingElements = rankElement.querySelectorAll('.rating-value');
            const firstDateElement = rankElement.querySelector('.first-date');

            if (titleElement && title) {
                titleElement.textContent = title;
                titleElement.style.display = 'inline-block';
            } else if (titleElement) {
                titleElement.style.display = 'none';
            }

            if (nameElement) nameElement.textContent = player.username;
            if (levelElement) levelElement.textContent = player.level;
            if (expFillElement) expFillElement.style.width = `${player.progressPercent}%`;
            if (expValueElement) expValueElement.textContent = `${player.progressPercent}%`;
            if (firstDateElement) firstDateElement.textContent = player.first_tournament;

            if (ratingElements.length >= 4) {
                ratingElements[0].textContent = ratings.bullet;
                ratingElements[1].textContent = ratings.blitz;
                ratingElements[2].textContent = ratings.rapid;
                ratingElements[3].textContent = ratings.classical;
            }
        }
    }
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
            case 'total_score':
                return b.total_score - a.total_score;
            default:
                return b.utility_coefficient - a.utility_coefficient;
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

// Показать модальное окно профиля игрока
async function showPlayerModal(username) {
    const modal = document.getElementById('playerModal');
    const modalContent = document.getElementById('modalContent');
    const modalWrapper = document.getElementById('modalContentWrapper');
    const epicEffects = document.getElementById('modalEpicEffects');

    if (!modal || !modalContent) return;

    modalContent.innerHTML = '<p style="padding: 2rem; text-align: center;">Загрузка профиля игрока...</p>';
    modal.style.display = 'block';

    try {
        const player = allPlayerData.find(p => p.username === username);
        if (!player) {
            throw new Error('Игрок не найден');
        }

        const userData = await loadUserData(username);
        const title = await getPlayerTitle(username);
        const ratings = await getPlayerRatings(username);

        const frameType = getFrameType(player.level);
        
        // Очищаем предыдущие классы
        if (modalWrapper) {
            modalWrapper.className = 'modal-content';
            if (frameType !== 'none') {
                modalWrapper.classList.add(`frame-${frameType}`);
            }
        }
        
        if (epicEffects) {
            epicEffects.className = 'modal-epic-effects';
            if (frameType === 'epic') {
                epicEffects.classList.add('level-20');
            }
        }

        // Устанавливаем цвет рамки
        if (userData?.color_frame) {
            document.documentElement.style.setProperty('--frame-color', userData.color_frame);
            document.documentElement.style.setProperty('--epic-color', userData.color_frame);
        }

        const profileHTML = `
            <div class="modal-player-profile">
                ${userData?.banner ? `
                    <img src="${userData.banner}" alt="Баннер ${player.username}" class="modal-player-banner">
                ` : `
                    <div class="modal-player-banner" style="background: linear-gradient(135deg, var(--primary-color), var(--primary-light)); height: 150px;"></div>
                `}
                
                ${userData?.avatar ? `
                    <img src="${userData.avatar}" alt="Аватар ${player.username}" class="modal-player-avatar">
                ` : `
                    <div class="modal-player-avatar" style="background: var(--card-bg); display: flex; align-items: center; justify-content: center; font-size: 2rem; width: 100px; height: 100px; border-radius: 50%; position: absolute; top: 100px; left: 50%; transform: translateX(-50%); border: 4px solid var(--card-bg);">
                        ${player.username.charAt(0).toUpperCase()}
                    </div>
                `}
                
                <div class="modal-player-info">
                    <h2 class="modal-player-name">
                        ${title ? `<span class="modal-player-title">${title}</span> ` : ''}
                        ${player.username}
                    </h2>
                    
                    <div class="modal-level-display">
                        <span class="level-text">Уровень ${player.level}</span>
                        <div class="experience-bar">
                            <div class="experience-fill" style="width: ${player.progressPercent}%;"></div>
                        </div>
                        <span class="experience-value">${player.currentLevelExp} / ${player.nextLevelExp}</span>
                    </div>

                    <div class="modal-ratings-grid">
                        <div class="modal-rating-item">
                            <span class="rating-icon bullet"></span>
                            <span>Bullet: ${ratings.bullet}</span>
                        </div>
                        <div class="modal-rating-item">
                            <span class="rating-icon blitz"></span>
                            <span>Blitz: ${ratings.blitz}</span>
                        </div>
                        <div class="modal-rating-item">
                            <span class="rating-icon rapid"></span>
                            <span>Rapid: ${ratings.rapid}</span>
                        </div>
                        <div class="modal-rating-item">
                            <span class="rating-icon classic"></span>
                            <span>Class.: ${ratings.classical}</span>
                        </div>
                    </div>

                    <div style="margin: 1.5rem 0;">
                        <p><strong>Первый турнир:</strong> ${player.first_tournament}</p>
                        <p><strong>Всего турниров:</strong> ${player.tournaments_count}</p>
                        <p><strong>Средний перформанс:</strong> ${player.avg_performance}</p>
                    </div>

                    <div class="modal-links">
                        <a href="https://lichess.org/@/${player.username}" target="_blank" class="lichess-link">
                            <i class="fas fa-external-link-alt"></i> Открыть профиль на Lichess
                        </a>
                    </div>
                </div>
            </div>
        `;

        modalContent.innerHTML = profileHTML;

    } catch (error) {
        modalContent.innerHTML = `
            <div style="padding: 2rem; text-align: center;">
                <h2>${username}</h2>
                <p>Не удалось загрузить профиль игрока.</p>
                <a href="https://lichess.org/@/${username}" target="_blank" class="lichess-link">
                    <i class="fas fa-external-link-alt"></i> Открыть профиль на Lichess
                </a>
            </div>
        `;
    }
}

// Инициализация приложения
async function initApp() {
    try {
        console.log('Инициализация приложения...');

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
        await initLiveGame();

        console.log('Инициализация завершена');

    } catch (error) {
        console.error('Ошибка при инициализации:', error);
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация темы
    initTheme();

    // Инициализация навигации
    initNavigation();

    // Инициализация приложения
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
            const epicEffects = document.getElementById('modalEpicEffects');
            const modalWrapper = document.getElementById('modalContentWrapper');

            if (modal) modal.style.display = 'none';
            if (epicEffects) epicEffects.className = 'modal-epic-effects';
            if (modalWrapper) modalWrapper.className = 'modal-content';

            document.documentElement.style.removeProperty('--frame-color');
            document.documentElement.style.removeProperty('--epic-color');
        });
    }

    window.addEventListener('click', (e) => {
        const modal = document.getElementById('playerModal');
        if (modal && e.target === modal) {
            closeButton.click();
        }
    });
});
