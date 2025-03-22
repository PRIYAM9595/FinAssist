document.addEventListener("DOMContentLoaded", function () {

    // Expandable Resource Sections
    const sections = document.querySelectorAll(".resource-section h3");

    sections.forEach(section => {
        section.addEventListener("click", function () {
            this.nextElementSibling.classList.toggle("active");
        });
    });

    // Search Functionality for Resources
    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Search Resources...");
    searchInput.style.cssText = "width: 100%; padding: 10px; margin-bottom: 15px; font-size: 16px;";

    const resourceContainer = document.querySelector(".resources-container");
    resourceContainer.insertBefore(searchInput, resourceContainer.firstChild);

    searchInput.addEventListener("input", function () {
        let filter = searchInput.value.toLowerCase();
        document.querySelectorAll(".resource-section").forEach(section => {
            let text = section.textContent.toLowerCase();
            section.style.display = text.includes(filter) ? "block" : "none";
        });
    });

    // Webinars Countdown Timer
    const webinarCountdown = document.createElement("div");
    webinarCountdown.innerHTML = `
        <h3>🎥 Next Webinar Countdown</h3>
        <p>Upcoming Webinar: <strong>Stock Market Trends 2025</strong></p>
        <p>Time Remaining: <span id="countdown-timer">Calculating...</span></p>
    `;
    webinarCountdown.style.cssText = "background:#f5f5f5; padding: 15px; border-radius: 8px; margin-top: 20px;";
    resourceContainer.appendChild(webinarCountdown);

    function startCountdown(targetDate) {
        function updateTimer() {
            let now = new Date().getTime();
            let distance = targetDate - now;
            
            if (distance < 0) {
                document.getElementById("countdown-timer").innerHTML = "Webinar Started!";
                return;
            }

            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("countdown-timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
        
        updateTimer();
        setInterval(updateTimer, 1000);
    }

    let nextWebinarDate = new Date("April 10, 2025 18:00:00").getTime();
    startCountdown(nextWebinarDate);

    // Animated Stats for Investment Resources
    const statsBox = document.createElement("div");
    statsBox.innerHTML = `
        <h3>📊 Financial Resource Stats</h3>
        <p><strong>Articles Read:</strong> <span id="articles-count">0</span></p>
        <p><strong>Calculators Used:</strong> <span id="calc-count">0</span></p>
        <p><strong>Webinars Attended:</strong> <span id="webinar-count">0</span></p>
    `;
    statsBox.style.cssText = "background:#e0f7fa; padding: 15px; border-radius: 8px; margin-top: 20px;";
    resourceContainer.appendChild(statsBox);

    let articles = 1200, calculators = 450, webinars = 320;
    animateCounter("articles-count", articles);
    animateCounter("calc-count", calculators);
    animateCounter("webinar-count", webinars);

    function animateCounter(id, target) {
        let count = 0;
        let interval = setInterval(() => {
            if (count >= target) {
                clearInterval(interval);
            } else {
                count += Math.ceil(target / 100);
                document.getElementById(id).textContent = count;
            }
        }, 30);
    }

});
