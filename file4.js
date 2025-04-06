document.addEventListener("DOMContentLoaded", function () {

    // Form Validation
    const form = document.querySelector(".contact-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const name = document.querySelector("input[type='text']").value.trim();
        const email = document.querySelector("input[type='email']").value.trim();
        const message = document.querySelector("textarea").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("❌ Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("❌ Please enter a valid email address.");
            return;
        }

        // Simulate Form Submission Success
        alert(`✅ Thank you, ${name}! Your message has been sent successfully.`);
        form.reset();
    });

    // Email Validation Function
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // Click-to-Call and Email Features
    document.querySelector(".detail-item:nth-child(2) p").innerHTML =
        `<a href="tel:+919876543210">+91-9876543210</a>`;

    document.querySelector(".detail-item:nth-child(3) p").innerHTML =
        `<a href="mailto:info@alphabucks.com">info@alphabucks.com</a>`;

});
