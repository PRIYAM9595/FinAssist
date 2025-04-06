document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('investmentChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Stocks", "Bonds", "Real Estate", "Gold", "Crypto"],
            datasets: [{
                label: 'Investment Popularity',
                data: [60, 40, 50, 45, 70],
                backgroundColor: ['blue', 'green', 'orange', 'gold', 'purple']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });
});

// Investment Calculator
function calculateInvestment() {
    let amount = document.getElementById("amount").value;
    let rate = document.getElementById("rate").value;
    let years = document.getElementById("years").value;

    if (amount && rate && years) {
        let finalAmount = amount * Math.pow((1 + rate / 100), years);
        document.getElementById("result").innerText = `Final Investment Value: ₹${finalAmount.toLocaleString("en-IN")}`;
    } else {
        document.getElementById("result").innerText = "Please enter all values.";
    }
}
