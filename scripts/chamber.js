
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

///////

//courses info
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

//COURSES CONFIG
const coursesContainer = document.querySelector('.courses-columns');
const totalCreditsEl = document.getElementById('total-credits');

function displayCourses(filteredCourses) {
    coursesContainer.innerHTML = ''; // limpiar
    let totalCredits = 0;

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        card.classList.add(course.completed ? 'completed' : 'not-completed');
        card.innerHTML = `
          <h3>${course.subject} ${course.number}</h3>
          <p>${course.title}</p>
          <p>Credits: ${course.credits}</p>
        `;
        coursesContainer.appendChild(card);

        // sumar solo si está completado
        if (course.completed) {
            totalCredits += course.credits;
        }
    });

    totalCreditsEl.textContent = `The total credits for course listed above is: ${totalCredits}`;
}

// mostrar todos al inicio
displayCourses(courses);

// botones
document.getElementById('all-btn').addEventListener('click', () => {
    displayCourses(courses);
});

document.getElementById('cse-btn').addEventListener('click', () => {
    const cseCourses = courses.filter(c => c.subject === 'CSE');
    displayCourses(cseCourses);
});

document.getElementById('wdd-btn').addEventListener('click', () => {
    const wddCourses = courses.filter(c => c.subject === 'WDD');
    displayCourses(wddCourses);
});