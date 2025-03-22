document.addEventListener("DOMContentLoaded", function () {
    
    // Toggle Regulation Sections
    const sections = document.querySelectorAll(".regulation-section h3");
    
    sections.forEach(section => {
        section.addEventListener("click", function () {
            this.nextElementSibling.classList.toggle("active");
        });
    });

    // Search Functionality for Regulations
    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Search Regulations...");
    searchInput.style.cssText = "width: 100%; padding: 10px; margin-bottom: 15px; font-size: 16px;";

    const regulationContainer = document.querySelector(".regulations-container");
    regulationContainer.insertBefore(searchInput, regulationContainer.firstChild);

    searchInput.addEventListener("input", function () {
        let filter = searchInput.value.toLowerCase();
        document.querySelectorAll(".regulation-section").forEach(section => {
            let text = section.textContent.toLowerCase();
            section.style.display = text.includes(filter) ? "block" : "none";
        });
    });

    // Animated Stats for Market Compliance
    const complianceStats = document.createElement("div");
    complianceStats.innerHTML = `
        <h3>📊 Market Compliance Overview</h3>
        <p><strong>SEBI Actions Taken:</strong> <span id="sebi-count">0</span> in 2024</p>
        <p><strong>RBI Regulations Updated:</strong> <span id="rbi-count">0</span> this year</p>
        <p><strong>Reported Money Laundering Cases:</strong> <span id="pmla-count">0</span> in India</p>
    `;
    complianceStats.style.cssText = "background:#f5f5f5; padding: 15px; border-radius: 8px; margin-top: 20px;";
    regulationContainer.appendChild(complianceStats);

    let sebi = 320, rbi = 45, pmla = 230;
    animateCounter("sebi-count", sebi);
    animateCounter("rbi-count", rbi);
    animateCounter("pmla-count", pmla);

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
