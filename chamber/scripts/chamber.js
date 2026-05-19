function filterCourses(type) {
    const courses = document.querySelectorAll("#course-list li");
    courses.forEach(course => {
        if (type === "all" || course.dataset.type === type) {
            course.style.display = "list-item";
        } else {
            course.style.display = "none";
        }
    });
}

document.querySelector("#year");
const today = new Date();
year.innerHTML = ` <span class="highlight">${today.getFullYear()}</span>`;


document.getElementById("last-modified").textContent =
    "Last Modification: " + document.lastModified;
