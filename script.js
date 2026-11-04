

const contactForm = document.getElementById("contact-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();

    formMessage.hidden = false;

    if (username === "" || email === "") {
        formMessage.textContent =
            "Please enter your name and email address.";
        formMessage.className = "message-error";
        return;
    }

   

    const birthYearText =
        document.getElementById("birth-year").value.trim();

    const studentRequested =
        document.getElementById("student-discount").checked;

    let extraMessage = "";

    if (birthYearText !== "") {
        const birthYear = parseInt(birthYearText, 10);
        const currentYear = new Date().getFullYear();

        if (
            !/^\d{4}$/.test(birthYearText) ||
            Number.isNaN(birthYear) ||
            birthYear < 1900 ||
            birthYear > currentYear
        ) {
            formMessage.textContent =
                "Please enter a valid four-digit birth year.";
            formMessage.className = "message-error";
            return;
        }

        const age = currentYear - birthYear;

        if (age >= 60) {
            extraMessage +=
                " You may qualify for a senior discount (age 60+).";
        }
    }

    if (studentRequested) {
        extraMessage +=
            " Your student discount request needs verification.";
    }

    formMessage.textContent =
        "Thank you, " + username +
        "! Your feedback has been received. " +
        "Your email is " + email +
        ". This is a demo; no information was sent to a server." +
        extraMessage;

    formMessage.className = "message-success";
});




const menuRows =
    document.querySelectorAll("#menu-table tbody tr");

menuRows.forEach(function (row) {
    const originalBackground = row.style.backgroundColor;

    row.addEventListener("mouseover", function () {
        row.style.backgroundColor = "#f6d6b8";
    });

    row.addEventListener("mouseout", function () {
        row.style.backgroundColor = originalBackground;
    });
});




const themeButton =
    document.getElementById("theme-toggle");

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "Switch to Light Mode";
    } else {
        themeButton.textContent = "Toggle Light/Dark Mode";
    }
});




const orderCheckboxes =
    document.querySelectorAll(".order-checkbox");

const totalDisplay =
    document.getElementById("total");

function updateTotal() {
    let total = 0;

    orderCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            total += Number(checkbox.dataset.price);
        }
    });

    totalDisplay.textContent =
        "Total: Rs. " + total.toLocaleString("en-PK");
}

orderCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateTotal);
});




const readMoreButton =
    document.getElementById("read-more-button");

const extraStory =
    document.getElementById("extra-story");

readMoreButton.addEventListener("click", function () {
    const isHidden =
        extraStory.style.display === "none" ||
        extraStory.style.display === "";

    if (isHidden) {
        extraStory.style.display = "block";
        readMoreButton.textContent = "Read Less";
    } else {
        extraStory.style.display = "none";
        readMoreButton.textContent = "Read More";
    }
});




const filterButtons =
    document.querySelectorAll(".filter-button");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory = button.dataset.filter;

        // Remove active class from all buttons
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Highlight the selected button
        button.classList.add("active");

        // Show or hide menu rows
        menuRows.forEach(function (row) {
            const rowCategory = row.dataset.category;

            if (
                selectedCategory === "all" ||
                rowCategory === selectedCategory
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
});




function updateOpeningStatus() {
    const now = new Date();

    const day = now.getDay();
    const hour = now.getHours();

    let openingHour;
    let closingHour;

    // Sunday: 9 AM - 10 PM
    if (day === 0) {
        openingHour = 9;
        closingHour = 22;
    }

    // Saturday: 9 AM - 11 PM
    else if (day === 6) {
        openingHour = 9;
        closingHour = 23;
    }

    // Friday: 8 AM - 11 PM
    else if (day === 5) {
        openingHour = 8;
        closingHour = 23;
    }

    // Monday to Thursday: 8 AM - 10 PM
    else {
        openingHour = 8;
        closingHour = 22;
    }

    const status =
        document.getElementById("opening-status");

    if (hour >= openingHour && hour < closingHour) {
        status.textContent = "We are Open!";
        status.className = "status-open";
    } else {
        const openingTime =
            openingHour < 12
                ? openingHour + " AM"
                : (openingHour - 12) + " PM";

        status.textContent =
            "Closed — Open at " + openingTime;

        status.className = "status-closed";
    }
}

updateOpeningStatus();




const notesInput =
    document.getElementById("special-notes");

const charCount =
    document.getElementById("char-count");

const maxCharacters = 100;

notesInput.addEventListener("input", function () {
    const remaining =
        maxCharacters - notesInput.value.length;

    charCount.textContent =
        remaining + " characters remaining";
});