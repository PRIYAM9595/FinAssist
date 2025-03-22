document.addEventListener("DOMContentLoaded", function() {
    // Fake Stock Data (Replace with API Later)
    const stockData = [
        { company: "Reliance Industries", price: 2735, change: "+2.4%" },
        { company: "HDFC Bank", price: 1620, change: "+1.8%" },
        { company: "Infosys", price: 1430, change: "-0.9%" },
        { company: "TCS", price: 3840, change: "+1.2%" },
        { company: "HUL", price: 2425, change: "-1.5%" }
    ];

    // Populate Stock Table
    const stockTable = document.getElementById("stockData");
    stockTable.innerHTML = "";
    stockData.forEach(stock => {
        let row = `<tr>
            <td>${stock.company}</td>
            <td class="stock-price">${stock.price} ₹</td>
            <td class="stock-change">${stock.change}</td>
        </tr>`;
        stockTable.innerHTML += row;
    });

    // Stock Market Chart
    const ctx = document.getElementById("marketChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "Nifty 50 Index",
                data: [18000, 18250, 18500, 18700, 18850, 19000],
                borderColor: "#ff9a9e",
                backgroundColor: "rgba(255, 154, 158, 0.2)",
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: "#fff" }
                }
            },
            scales: {
                x: { ticks: { color: "#fff" } },
                y: { ticks: { color: "#fff" } }
            }
        }
    });
});
