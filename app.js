
// Настройка темной/светлой темы
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    if (localStorage.getItem('theme') === 'dark') themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

function switchTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

themeToggle.addEventListener('click', switchTheme);

// Навигация между секциями
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.section.active').classList.remove('active');
        const target = document.querySelector(link.getAttribute('href'));
        target.classList.add('active');
    });
});

// Загрузка данных CSV и формирование статистики
const tournamentsFolder = 'tournaments/';
const tournamentFiles = [
    'lichess_tournament_2025.06.26_eeO2WrZ0_lichess-liga-5b.csv'
    // Добавьте сюда новые файлы при появлении
];

let rawData = [];
let playerStats = {};
let currentPage = 1;
const rowsPerPage = 10;

function loadCSV(file) {
    return fetch(tournamentsFolder + file)
        .then(response => response.text())
        .then(text => Papa.parse(text.trim(), { header: true }).data);
}

function aggregateData() {
    rawData.forEach(row => {
        const username = row.Username;
        if (!playerStats[username]) {
            playerStats[username] = {
                username: username,
                total_score: 0,
                performances: [],
                ratings: [],
                tournaments_count: 0,
                first_tournament_date: new Date()
            };
        }
        const player = playerStats[username];
        player.total_score += parseInt(row.Score);
        if (row.Performance) player.performances.push(parseFloat(row.Performance));
        player.ratings.push(parseInt(row.Rating));
        player.tournaments_count += 1;
        // Для примера используем дату из имени файла
        const datePart = fileDateFromName(row.sheet || filedatePlaceholder);
        if (datePart && datePart < player.first_tournament_date) player.first_tournament_date = datePart;
    });

    // Преобразуем в массив
    playerStats = Object.values(playerStats).map(p => {
        return {
            ...p,
            avg_performance: p.performances.length ? average(p.performances) : 0,
            max_performance: p.performances.length ? Math.max(...p.performances) : 0,
            avg_rating: average(p.ratings),
            max_rating: Math.max(...p.ratings)
        };
    });
}

function average(arr) {
    return arr.length ? Math.round(arr.reduce((a,b) => a + b, 0) / arr.length) : 0;
}

function fileDateFromName(name) {
    const match = name.match(/(\d{4})\.(\d{2})\.(\d{2})/);
    if (match) return new Date(`${match[1]}-${match[2]}-${match[3]}`);
    return null;
}

function renderTopPlayers() {
    const topFive = [...playerStats].sort((a,b) => b.total_score - a.total_score).slice(0,5);
    topFive.forEach((player, index) => {
        const container = document.querySelector(`.top-player[data-rank='${index+1}']`);
        if (container) {
            container.querySelector('.player-name').textContent = player.username;
            container.querySelector('.player-stats').textContent = `${player.total_score} очков | ${player.avg_performance} перф.`;
        }
    });
}

function renderTable(page = 1) {
    currentPage = page;
    const tbody = document.getElementById('playersTable');
    tbody.innerHTML = '';
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const sorted = sortPlayers();
    sorted.slice(start, end).forEach(player => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="player-link" data-username="${player.username}">${player.username}</td>
            <td>${player.total_score}</td>
            <td>${player.avg_performance}</td>
            <td>${player.max_performance}</td>
            <td>${player.avg_rating}</td>
            <td>${player.max_rating}</td>
            <td>${player.tournaments_count}</td>
            <td>${player.first_tournament_date.toISOString().slice(0,10)}</td>
        `;
        tbody.appendChild(tr);
    });

    // Обновляем пагинацию
    const totalPages = Math.ceil(playerStats.length / rowsPerPage);
    document.getElementById('pageInfo').textContent = `Страница ${currentPage} из ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

function sortPlayers() {
    const sortBy = document.getElementById('sortBy').value;
    return [...playerStats].sort((a,b) => b[sortBy] - a[sortBy]);
}

document.getElementById('sortBy').addEventListener('change', () => renderTable(1));

document.getElementById('prevPage').addEventListener('click', () => renderTable(currentPage - 1));
document.getElementById('nextPage').addEventListener('click', () => renderTable(currentPage + 1));

document.getElementById('playersTable').addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('player-link')) {
        const username = target.dataset.username;
        showPlayerProfile(username);
    }
});

// Работа с модальным окном и API Lichess
const modal = document.getElementById('playerModal');
const modalContent = document.getElementById('playerProfile');
const spanClose = document.querySelector('.close');
spanClose.onclick = () => modal.style.display = 'none';
window.onclick = (event) => {
    if (event.target === modal) modal.style.display = 'none';
};

function showPlayerProfile(username) {
    const token = 'll';
    fetch(`https://lichess.org/api/user/${username}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        modalContent.innerHTML = `
            <h2>${data.username}</h2>
            <p>Рейтинг Blitz: ${data.perfs?.blitz?.rating || 'N/A'}</p>
            <p>Рейтинг Rapid: ${data.perfs?.rapid?.rating || 'N/A'}</p>
            <p>Игры всего: ${data.count?.all || 'N/A'}</p>
            <a href="https://lichess.org/@/${data.username}" target="_blank">Перейти на Lichess</a>
        `;
        modal.style.display = 'block';
    })
    .catch(() => {
        modalContent.innerHTML = '<p>Не удалось загрузить профиль игрока.</p>';
        modal.style.display = 'block';
    });
}

// Загрузка всех файлов и инициализация
Promise.all(tournamentFiles.map(loadCSV)).then(results => {
    rawData = results.flat();
    aggregateData();
    renderTopPlayers();
    renderTable();
});
