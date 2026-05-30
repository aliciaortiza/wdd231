//footer

document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

//hamburguer menu
const navButton = document.querySelector('#menu-toggle');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

//members
async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    const container = document.getElementById('membersContainer');
    container.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');

        card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      <p><strong>Membership:</strong> ${member.membership}</p>
      <p>${member.info}</p>
    `;

        container.appendChild(card);
    });
}

document.getElementById('gridBtn').addEventListener('click', () => {
    document.getElementById('membersContainer').classList.add('grid-view');
    document.getElementById('membersContainer').classList.remove('list-view');
});

document.getElementById('listBtn').addEventListener('click', () => {
    document.getElementById('membersContainer').classList.add('list-view');
    document.getElementById('membersContainer').classList.remove('grid-view');
});

loadMembers();

// --- WEATHER API ---
const lat = 9.946;
const lon = -84.056;
const apiKey = '431808a61aed84eca387eaa5b8234d03'; // tu key válida

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();

        document.getElementById('current-temp').innerHTML = `${Math.round(data.main.temp)}&deg;C`;
        document.getElementById('weather-desc').textContent = data.weather[0].description;
        document.getElementById('high-temp').textContent = `${Math.round(data.main.temp_max)}°`;
        document.getElementById('low-temp').textContent = `${Math.round(data.main.temp_min)}°`;
        document.getElementById('humidity').textContent = data.main.humidity;

        const iconCode = data.weather[0].icon;
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const formatTime = (timestamp) => {
            return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };
        document.getElementById('sunrise').textContent = formatTime(data.sys.sunrise);
        document.getElementById('sunset').textContent = formatTime(data.sys.sunset);

        // Forecast
        const fResponse = await fetch(forecastUrl);
        const fData = await fResponse.json();

        const dailyForecast = fData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
        const forecastContainer = document.getElementById('forecast-content');

        forecastContainer.innerHTML = ""; // limpiar antes de agregar

        dailyForecast.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
            forecastContainer.innerHTML += `
                <div class="forecast-day">
                    <p><strong>${date}</strong>: ${Math.round(day.main.temp)}&deg;C</p>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

// --- MEMBER SPOTLIGHTS ---
async function getSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('No se pudo cargar el JSON de miembros');
        const members = await response.json();

        // Filtrar Gold (3) o Silver (2)
        const eligible = members.filter(m => m.membership === 3 || m.membership === 2);

        // Mezclar aleatoriamente
        const shuffled = eligible.sort(() => 0.5 - Math.random());

        // Tomar 3 (o 2 si hay pocos)
        const selected = shuffled.slice(0, 3);

        const container = document.getElementById('member-spotlights');
        container.innerHTML = "";

        selected.forEach(m => {
            const level = m.membership === 3 ? "Gold" : "Silver";
            container.innerHTML += `
                <article class="spotlight-card">
                    <img src="images/${m.image}" alt="${m.name}">
                    <h3>${m.name}</h3>
                    <p>${m.address}</p>
                    <p>${m.phone}</p>
                    <p><a href="${m.website}" target="_blank">Website</a></p>
                    <p class="membership-tag">${level} Member</p>
                </article>
            `;
        });

    } catch (error) {
        console.error("Error Miembros:", error);
        document.getElementById('member-spotlights').innerHTML = "Error loading members.";
    }
}

// EJECUTAR AL CARGAR
fetchWeather();
getSpotlights();