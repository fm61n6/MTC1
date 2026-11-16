// Student records are stored in an array of objects.
let students = [];

const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchInput");

if (studentForm) {
studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = Number(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const course = document.getElementById("course").value;
    const marks = Number(document.getElementById("marks").value);

    if (name === "") {
        showMessage("Please enter the student's name.", "error");
        return;
    }

    if (!Number.isFinite(age) || age <= 0) {
        showMessage("Please enter a valid age.", "error");
        return;
    }

    if (gender === "") {
        showMessage("Please select a gender.", "error");
        return;
    }

    if (course === "") {
        showMessage("Please select a course.", "error");
        return;
    }

    if (!Number.isFinite(marks) || marks < 0 || marks > 100) {
        showMessage("Marks must be between 0 and 100.", "error");
        return;
    }

    const student = {
        id: Date.now(),
        name: name,
        age: age,
        gender: gender,
        course: course,
        marks: marks
    };

    students.push(student);

    displayStudents();
    updateStatistics();

    showMessage("Student registered successfully!", "success");
    studentForm.reset();
});
}

function getPerformance(marks) {
    if (marks >= 80) {
        return "Excellent";
    } else if (marks >= 70) {
        return "Very Good";
    } else if (marks >= 60) {
        return "Good";
    } else if (marks >= 50) {
        return "Average";
    } else {
        return "Failed";
    }
}

function displayStudents(studentList = students) {
    studentTableBody.innerHTML = "";

    if (studentList.length === 0) {
        studentTableBody.innerHTML = `
            <tr>
                <td colspan="7">No students found.</td>
            </tr>
        `;
        return;
    }

    studentList.forEach(function(student) {
        const row = document.createElement("tr");
        const performance = getPerformance(student.marks);

        let performanceClass = "";
        if (student.marks >= 80) performanceClass = "excellent";
        else if (student.marks >= 70) performanceClass = "very-good";
        else if (student.marks >= 60) performanceClass = "good";
        else if (student.marks >= 50) performanceClass = "average";
        else performanceClass = "failed";

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.gender}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
            <td><span class="performance-badge ${performanceClass}">${performance}</span></td>
            <td>
                <button class="action-btn" onclick="updateMarks(${student.id})">Update</button>
                <button class="action-btn" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });
}

function updateStatistics() {
    const total = students.length;
    let passed = 0;
    let failed = 0;
    let totalMarks = 0;

    for (let i = 0; i < students.length; i++) {
        totalMarks += students[i].marks;

        if (students[i].marks >= 50) {
            passed++;
        } else {
            failed++;
        }
    }

    let average = 0;

    if (students.length > 0) {
        average = totalMarks / students.length;
    }

    document.getElementById("totalStudents").textContent = total;
    document.getElementById("passedStudents").textContent = passed;
    document.getElementById("failedStudents").textContent = failed;
    document.getElementById("averageMarks").textContent = average.toFixed(2);
}

searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase();

    const results = students.filter(function(student) {
        return student.name.toLowerCase().includes(searchText);
    });

    displayStudents(results);
});

function deleteStudent(id) {
    if (!confirm("Delete this student?")) {
        return;
    }

    students = students.filter(function(student) {
        return student.id !== id;
    });

    displayStudents();
    updateStatistics();
}

function updateMarks(id) {
    const student = students.find(function(student) {
        return student.id === id;
    });

    if (!student) {
        return;
    }

    const newMarks = Number(prompt("Enter new marks:", student.marks));

    if (!Number.isFinite(newMarks) || newMarks < 0 || newMarks > 100) {
        alert("Marks must be between 0 and 100.");
        return;
    }

    student.marks = newMarks;

    displayStudents();
    updateStatistics();
}

function showMessage(message, type) {
    const messageBox = document.getElementById("formMessage");

    messageBox.textContent = message;
    messageBox.className = type;

    setTimeout(function() {
        messageBox.textContent = "";
    }, 3000);
}

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function() {
    navLinks.classList.toggle("show");
});

// Contact form validation
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();
        const box = document.getElementById("contactMessageBox");

        if (name === "" || email === "" || subject === "" || message === "") {
            box.textContent = "Please fill in all fields.";
            box.className = "error";
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            box.textContent = "Please enter a valid email.";
            box.className = "error";
            return;
        }

        if (message.length < 10) {
            box.textContent = "Message must be at least 10 characters.";
            box.className = "error";
            return;
        }

        box.textContent = "Thank you, your message has been sent.";
        box.className = "success";
        contactForm.reset();
    });
}

displayStudents();
updateStatistics();
