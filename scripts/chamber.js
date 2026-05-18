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

document.getElementById("last-modified").textContent =
    "Last Modification: " + document.lastModified;
