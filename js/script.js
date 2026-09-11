const menuToggle = document.getElementById("menu-toggle");

const mobileMenu = document.getElementById("mobile-menu");


// Open and close mobile menu
menuToggle.addEventListener("click", function () {

    mobileMenu.classList.toggle("active");

});


// Close menu when a mobile link is clicked
const mobileLinks = mobileMenu.querySelectorAll("a");

mobileLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        mobileMenu.classList.remove("active");

    });

});


// Smooth scrolling for navigation links
const allLinks = document.querySelectorAll('a[href^="#"]');

allLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        const targetSection = document.querySelector(targetId);

        if (targetSection) {

            event.preventDefault();

            // Highlight selected service card
            document.querySelectorAll(".service-card").forEach(function (card) {
                card.classList.remove("selected-service");
            });

            if (targetSection.classList.contains("service-card")) {
                targetSection.classList.add("selected-service");
            }

            const navbarHeight =
                document.querySelector(".navbar").offsetHeight;

            let extraOffset = 15;

            // Give service cards a little more space below the navbar
            if (targetSection.classList.contains("service-card")) {
                extraOffset = -15;
            }

            const targetPosition =
                targetSection.getBoundingClientRect().top +
                window.pageYOffset -
                navbarHeight +
                extraOffset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }

    });

});


// =========================================================
// CONTACT FORM VALIDATION & SUBMISSION
// =========================================================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Get form fields
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const service = document.getElementById("service");
const message = document.getElementById("message");
const submitButton = contactForm.querySelector(".submit-button");


// =========================================================
// LIVE INPUT VALIDATION
// =========================================================

// NAME FIELD
// Allow letters, spaces and accented letters only
name.addEventListener("input", function () {

    this.value = this.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");

});


// PHONE FIELD
// Allow numbers, spaces and + only
// The + sign is allowed only at the beginning
phone.addEventListener("input", function () {

    this.value = this.value
        .replace(/[^0-9+\s]/g, "")
        .replace(/(?!^)\+/g, "");

});


// =========================================================
// FORM SUBMISSION
// =========================================================

contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Remove previous validation messages
    formStatus.textContent = "";
    formStatus.className = "";


    // Trim unnecessary spaces
    name.value = name.value.trim();
    email.value = email.value.trim();
    phone.value = phone.value.trim();
    message.value = message.value.trim();


    // =====================================================
    // NAME VALIDATION
    // =====================================================

    const namePattern = /^[A-Za-zÀ-ÿ\s]+$/;

    if (
        name.value.length < 2 ||
        !namePattern.test(name.value)
    ) {

        formStatus.textContent =
            "Please enter a valid name using letters only.";

        formStatus.className = "form-error";

        name.focus();

        return;
    }


    // =====================================================
    // EMAIL VALIDATION
    // =====================================================

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value)) {

        formStatus.textContent =
            "Please enter a valid email address.";

        formStatus.className = "form-error";

        email.focus();

        return;
    }


    // =====================================================
    // PHONE VALIDATION
    // =====================================================

    const phonePattern = /^\+?[0-9\s]+$/;

    if (!phonePattern.test(phone.value)) {

        formStatus.textContent =
            "Please enter a valid phone number using numbers only. The + sign is allowed at the beginning.";

        formStatus.className = "form-error";

        phone.focus();

        return;
    }


    // =====================================================
    // PHONE NUMBER LENGTH
    // =====================================================

    const phoneDigits = phone.value.replace(/\D/g, "");

    if (phoneDigits.length < 7) {

        formStatus.textContent =
            "Please enter a valid phone number.";

        formStatus.className = "form-error";

        phone.focus();

        return;
    }


    // =====================================================
    // SERVICE VALIDATION
    // =====================================================

    if (service.value === "") {

        formStatus.textContent =
            "Please select the service you require.";

        formStatus.className = "form-error";

        service.focus();

        return;
    }


    // =====================================================
    // MESSAGE VALIDATION
    // =====================================================

    if (message.value.length < 10) {

        formStatus.textContent =
            "Please provide a little more information about your requirements.";

        formStatus.className = "form-error";

        message.focus();

        return;
    }


    // =====================================================
    // SUBMIT FORM
    // =====================================================

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";


    const formData = new FormData(contactForm);


    try {

        const response = await fetch(contactForm.action, {

            method: "POST",

            body: formData,

            headers: {
                Accept: "application/json"
            }

        });


        // =================================================
        // SUCCESS
        // =================================================

        if (response.ok) {

            formStatus.textContent =
                "✓ Thank you! Your message has been sent successfully. We will get back to you shortly.";

            formStatus.className =
                "form-success";

            contactForm.reset();

        }


        // =================================================
        // FORM ERROR
        // =================================================

        else {

            formStatus.textContent =
                "Something went wrong. Please try again.";

            formStatus.className =
                "form-error";

        }


    }


    // =====================================================
    // CONNECTION ERROR
    // =====================================================

    catch (error) {

        formStatus.textContent =
            "Unable to send your message. Please check your internet connection and try again.";

        formStatus.className =
            "form-error";

    }


    // Restore button
    submitButton.disabled = false;

    submitButton.textContent =
        "Send Message →";

});
