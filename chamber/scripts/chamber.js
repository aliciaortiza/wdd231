// --- FOOTER ---
const currentYearEl = document.getElementById("currentyear");
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

const lastModifiedEl = document.getElementById("lastModified");
if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
}

// --- HAMBURGER MENU ---
const navButton = document.querySelector('#menu-toggle');
const navBar = document.querySelector('#nav-bar');

if (navButton && navBar) {
    navButton.addEventListener('click', () => {
        navButton.classList.toggle('show');
        navBar.classList.toggle('show');
    });
}

// --- MEMBERS DIRECTORY ---
async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        const localMembers = JSON.parse(localStorage.getItem('customMembers')) || [];

        const allMembers = [...members, ...localMembers];

        displayMembers(allMembers);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    const container = document.getElementById('membersContainer');
    if (!container) return;

    container.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');

        let levelText = member.membership;
        if (member.membership === 3) levelText = "Gold";
        else if (member.membership === 2) levelText = "Silver";
        else if (member.membership === 1) levelText = "Bronze";
        else if (member.membership === 0) levelText = "Non-Profit";

        card.innerHTML = `
          <img src="images/${member.image}" alt="${member.name}">
          <h3>${member.name}</h3>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><a href="${member.website}" target="_blank">Visit Website</a></p>
          <p><strong>Membership:</strong> ${levelText}</p>
          <p>${member.info}</p>
        `;

        container.appendChild(card);
    });
}

const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const membersContainer = document.getElementById('membersContainer');

if (gridBtn && listBtn && membersContainer) {
    gridBtn.addEventListener('click', () => {
        membersContainer.classList.add('grid-view');
        membersContainer.classList.remove('list-view');
    });

    listBtn.addEventListener('click', () => {
        membersContainer.classList.add('list-view');
        membersContainer.classList.remove('grid-view');
    });

    loadMembers();
}

// --- WEATHER API ---
const lat = 9.946;
const lon = -84.056;
const apiKey = '431808a61aed84eca387eaa5b8234d03';

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function fetchWeather() {
    if (!document.getElementById('current-temp')) return;

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

        const fResponse = await fetch(forecastUrl);
        const fData = await fResponse.json();

        const dailyForecast = fData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
        const forecastContainer = document.getElementById('forecast-content');

        if (forecastContainer) {
            forecastContainer.innerHTML = "";
            dailyForecast.forEach(day => {
                const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
                forecastContainer.innerHTML += `
                    <div class="forecast-day">
                        <p><strong>${date}</strong>: ${Math.round(day.main.temp)}&deg;C</p>
                    </div>
                `;
            });
        }

    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

// --- MEMBER SPOTLIGHTS ---
async function getSpotlights() {
    const container = document.getElementById('member-spotlights');
    if (!container) return;

    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('No se pudo cargar el JSON de miembros');
        const members = await response.json();

        const localMembers = JSON.parse(localStorage.getItem('customMembers')) || [];

        const allMembers = [...members, ...localMembers];

        const eligible = allMembers.filter(m => m.membership === 3 || m.membership === 2);

        const shuffled = eligible.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

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
        container.innerHTML = "Error loading members.";
    }
}

fetchWeather();
getSpotlights();

// --- JOIN FORM LOGIC & MODALS ---
document.addEventListener("DOMContentLoaded", () => {
    // Set hidden field load timestamp
    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    // Modal display handlers
    const infoLinks = document.querySelectorAll(".info-link");
    infoLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const modalId = link.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    // Close button handler for dialogs
    const closeBtns = document.querySelectorAll(".close-btn");
    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

    // Optional: Close modal if clicking outside the modal box
    const modals = document.querySelectorAll(".membership-modal");
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            const rect = modal.getBoundingClientRect();
            const isInDialog = (
                rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                rect.left <= e.clientX && e.clientX <= rect.left + rect.width
            );
            if (!isInDialog) {
                modal.close();
            }
        });
    });
});