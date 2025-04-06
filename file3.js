document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // Fade-in Animation for Sections
    let sections = document.querySelectorAll(".trading-section, .investment-section, .strategy-container, .calculator");
    sections.forEach((section) => {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
    });

    // Investment Chart Data
    let ctx = document.getElementById("investmentChart")?.getContext("2d");
    if (ctx) {
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Stocks", "Real Estate", "Crypto", "Mutual Funds", "Bonds"],
                datasets: [
                    {
                        label: "Average ROI (%)",
                        data: [15, 12, 30, 10, 6],
                        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#17a2b8", "#dc3545"],
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } },
            },
        });
    }

    // Trading Chart Data
    let tradeCtx = document.getElementById("tradingChart")?.getContext("2d");
    if (tradeCtx) {
        new Chart(tradeCtx, {
            type: "line",
            data: {
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                datasets: [
                    {
                        label: "Stock Market Performance (NIFTY 50)",
                        data: [18500, 18600, 18750, 18900, 19000],
                        borderColor: "#007bff",
                        backgroundColor: "rgba(0, 123, 255, 0.1)",
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: false } },
            },
        });
    }
});

// Investment Calculator
function calculateInvestment() {
    let amount = parseFloat(document.getElementById("amount").value);
    let rate = parseFloat(document.getElementById("rate").value);
    let years = parseFloat(document.getElementById("years").value);

    if (isNaN(amount) || isNaN(rate) || isNaN(years) || amount <= 0 || rate <= 0 || years <= 0) {
        document.getElementById("result").innerHTML = "❌ Please enter valid numbers!";
        return;
    }

    let finalAmount = amount * Math.pow(1 + rate / 100, years);
    document.getElementById("result").innerHTML = `📈 Future Value: ₹${finalAmount.toFixed(2)}`;
}

// Trade Profit Calculator
function calculateProfit() {
    let buyPrice = parseFloat(document.getElementById("buyPrice").value);
    let sellPrice = parseFloat(document.getElementById("sellPrice").value);
    let quantity = parseInt(document.getElementById("quantity").value);

    if (isNaN(buyPrice) || isNaN(sellPrice) || isNaN(quantity) || buyPrice <= 0 || sellPrice <= 0 || quantity <= 0) {
        document.getElementById("profitResult").innerHTML = "❌ Please enter valid numbers!";
        return;
    }

    let profit = (sellPrice - buyPrice) * quantity;
    let profitMessage = profit >= 0 ? `🚀 Profit: ₹${profit.toFixed(2)}` : `📉 Loss: ₹${Math.abs(profit).toFixed(2)}`;
    document.getElementById("profitResult").innerHTML = profitMessage;
}
