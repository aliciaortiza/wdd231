document.addEventListener("DOMContentLoaded", () => {
    // 1. Leer los parámetros de la URL
    const params = new URLSearchParams(window.location.search);

    const fname = params.get("fname") || "";
    const lname = params.get("lname") || "";
    const email = params.get("email") || "";
    const phone = params.get("phone") || "";
    const orgName = params.get("org-name") || "";
    const membership = params.get("membership") || "np";
    const description = params.get("description") || "";
    const rawTimestamp = params.get("timestamp");

    // Formatear la fecha
    let formattedDate = "N/A";
    if (rawTimestamp) {
        try {
            formattedDate = new Date(rawTimestamp).toLocaleString();
        } catch (e) {
            formattedDate = decodeURIComponent(rawTimestamp);
        }
    }

    // 2. Mostrar la información en el HTML
    document.getElementById("display-fname").textContent = fname || "N/A";
    document.getElementById("display-lname").textContent = lname || "N/A";
    document.getElementById("display-email").textContent = email || "N/A";
    document.getElementById("display-phone").textContent = phone || "N/A";
    document.getElementById("display-org").textContent = orgName || "N/A";
    document.getElementById("display-timestamp").textContent = formattedDate;

    // 3. Guardar en localStorage para simular la base de datos
    if (orgName) {
        const newMember = {
            name: orgName,
            phone: phone,
            email: email,
            website: "#", // Enlace temporal
            image: "images/placeholder.png",
            membershipLevel: membership.toUpperCase(),
            description: description,
            representative: `${fname} ${lname}`
        };

        // Obtener la lista de miembros locales ya guardada (o crear una vacía)
        let localMembers = JSON.parse(localStorage.getItem("customMembers")) || [];

        // Evitar duplicados si el usuario refresca la página de agradecimiento
        const alreadyExists = localMembers.some(member => member.name === newMember.name);

        if (!alreadyExists) {
            localMembers.push(newMember);
            localStorage.setItem("customMembers", JSON.stringify(localMembers));
        }
    }
});