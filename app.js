// Настройка темной/светлой темы
const themeToggle = document.getElementById('theme-toggle');

// Применяем сохраненную тему при загрузке
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

        // Убираем активный класс у всех секций
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Показываем нужную секцию
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.add('active');

        // Обновляем активную ссылку в навигации
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

// Переменные для работы с данными
let allPlayerData = [];
let currentPage = 1;
const playersPerPage = 10;
const teamName = 'unicorn7love-fun-club';

// URL для загрузки файлов из GitHub (замените на ваш репозиторий)
const githubBaseUrl = 'https://raw.githubusercontent.com/toxicmarquis/uni7club/main/tournaments/';

// Список файлов турниров (можно автоматизировать через GitHub API)
const tournamentFiles = [
    'lichess_tournament_2025.06.26_eeO2WrZ0_lichess-liga-5b.csv'
    // Добавьте другие файлы здесь
];

// Функция для загрузки CSV файла
async function loadCSV(filename) {
    try {
        // Для локального тестирования используем локальные файлы
        const response = await fetch(filename);
        const text = await response.text();

        // Парсим CSV
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',');

        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const row = {};
            headers.forEach((header, index) => {
                row[header.trim()] = values[index] ? values[index].trim() : '';
            });
            data.push(row);
        }

        // Извлекаем дату из имени файла
        const dateMatch = filename.match(/(\d{4})\.(\d{2})\.(\d{2})/);
        const tournamentDate = dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : new Date().toISOString().split('T')[0];

        // Добавляем дату турнира к каждой записи
        data.forEach(row => {
            row.tournament_date = tournamentDate;
        });

        return data;
    } catch (error) {
        console.error('Ошибка при загрузке файла:', filename, error);
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

// Функция сортировки игроков по критериям топ-5
function sortPlayersForTop5(players) {
    return players.sort((a, b) => {
        // Первый критерий: сумма очков
        if (b.total_score !== a.total_score) {
            return b.total_score - a.total_score;
        }

        // Второй критерий: количество турниров
        if (b.tournaments_count !== a.tournaments_count) {
            return b.tournaments_count - a.tournaments_count;
        }

        // Третий критерий: средний перформанс
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
            rankElement.querySelector('.player-name').textContent = player.username;
            rankElement.querySelector('.avg-perf').textContent = player.avg_performance;
            rankElement.querySelector('.avg-rating').textContent = player.avg_rating;
            rankElement.querySelector('.total-score').textContent = player.total_score;
            rankElement.querySelector('.tournaments').textContent = player.tournaments_count;
            rankElement.querySelector('.first-date').textContent = player.first_tournament;
        }
    });
}

// Отображение топ-1 в категориях
function renderCategories(players) {
    const categories = [
        {
            key: 'avg_performance',
            title: 'Максимальный средний перформанс',
            selector: '.category-item:nth-child(1)'
        },
        {
            key: 'tournaments_count',
            title: 'Наибольшее количество турниров',
            selector: '.category-item:nth-child(2)'
        },
        {
            key: 'max_score',
            title: 'Максимальные очки за турнир',
            selector: '.category-item:nth-child(3)'
        },
        {
            key: 'total_score',
            title: 'Наибольшая сумма очков',
            selector: '.category-item:nth-child(4)'
        },
        {
            key: 'max_rating',
            title: 'Максимальный рейтинг',
            selector: '.category-item:nth-child(5)'
        }
    ];

    categories.forEach(category => {
        const winner = [...players].sort((a, b) => b[category.key] - a[category.key])[0];
        const categoryElement = document.querySelector(category.selector);

        if (categoryElement && winner) {
            categoryElement.querySelector('.winner-name').textContent = winner.username;
            categoryElement.querySelector('.winner-value').textContent = winner[category.key];
        }
    });
}

// Отображение таблицы игроков
function renderPlayersTable(players, page = 1) {
    const sortValue = document.getElementById('sortSelect').value;
    const searchValue = document.getElementById('playerSearch').value.toLowerCase();

    // Фильтруем игроков по поиску
    let filteredPlayers = players.filter(player => 
        player.username.toLowerCase().includes(searchValue)
    );

    // Сортируем игроков
    filteredPlayers.sort((a, b) => {
        switch (sortValue) {
            case 'avg_performance':
                return b.avg_performance - a.avg_performance;
            case 'tournaments_count':
                return b.tournaments_count - a.tournaments_count;
            default: // total_score
                return b.total_score - a.total_score;
        }
    });

    // Пагинация
    const startIndex = (page - 1) * playersPerPage;
    const endIndex = startIndex + playersPerPage;
    const playersToShow = filteredPlayers.slice(startIndex, endIndex);

    // Отображаем таблицу
    const tbody = document.getElementById('playersTableBody');
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

    // Обновляем информацию о пагинации
    const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
    document.getElementById('pageInfo').textContent = `Страница ${page} из ${totalPages}`;

    // Обновляем кнопки пагинации
    document.getElementById('prevPage').disabled = page <= 1;
    document.getElementById('nextPage').disabled = page >= totalPages;

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

    modalContent.innerHTML = '<p>Загрузка профиля игрока...</p>';
    modal.style.display = 'block';

    try {
        // Загружаем данные игрока через Lichess API
        const response = await fetch(`https://lichess.org/api/user/${username}`, {
            headers: {
                'Authorization': 'Bearer lip_KwozD2M4hihAzGKGareq'
            }
        });

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
        // Загружаем все файлы турниров
        const allRawData = [];
        for (const filename of tournamentFiles) {
            const data = await loadCSV(filename);
            allRawData.push(...data);
        }

        // Агрегируем данные игроков
        allPlayerData = aggregatePlayerData(allRawData);

        // Отображаем данные
        renderTop5Players(allPlayerData);
        renderCategories(allPlayerData);
        renderPlayersTable(allPlayerData);

        console.log('Данные загружены:', allPlayerData);

    } catch (error) {
        console.error('Ошибка при инициализации:', error);
    }
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем приложение
    initApp();

    // Поиск игроков
    document.getElementById('playerSearch').addEventListener('input', () => {
        renderPlayersTable(allPlayerData, 1);
    });

    // Сортировка
    document.getElementById('sortSelect').addEventListener('change', () => {
        renderPlayersTable(allPlayerData, 1);
    });

    // Пагинация
    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            renderPlayersTable(allPlayerData, currentPage - 1);
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        const totalPages = Math.ceil(allPlayerData.length / playersPerPage);
        if (currentPage < totalPages) {
            renderPlayersTable(allPlayerData, currentPage + 1);
        }
    });

    // Закрытие модального окна
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('playerModal').style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        const modal = document.getElementById('playerModal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
