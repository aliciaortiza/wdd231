import interests from '../data/interest.mjs';

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mostrar el mensaje de visitas basado en localStorage
    const messageContainer = document.getElementById("visitor-message");
    if (messageContainer) {
        const lastVisit = localStorage.getItem("lastVisit");
        const now = Date.now();
        let messageText = "";

        if (!lastVisit) {
            messageText = "Welcome! Let us know if you have any questions.";
        } else {
            const diffTime = now - Number(lastVisit);
            const msPerDay = 24 * 60 * 60 * 1000;

            if (diffTime < msPerDay) {
                messageText = "Back so soon! Awesome!";
            } else {
                const diffDays = Math.floor(diffTime / msPerDay);
                if (diffDays === 1) {
                    messageText = "You last visited 1 day ago.";
                } else {
                    messageText = `You last visited ${diffDays} days ago.`;
                }
            }
        }
        messageContainer.textContent = messageText;
        localStorage.setItem("lastVisit", now.toString());
    }

    const gridContainer = document.querySelector(".discover-grid");
    if (gridContainer) {
        interests.forEach(item => {
            const card = document.createElement("div");
            card.className = `card interest-card ${item.id}`;

            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure class="interest-figure">
                    <img class="interest-img" src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
                </figure>
                <address class="interest-address">${item.address}</address>
                <p class="interest-desc">${item.description}</p>
                <button type="button" class="learn-more-btn">Learn More</button>
            `;
            gridContainer.appendChild(card);
        });
    }
});