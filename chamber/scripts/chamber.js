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
