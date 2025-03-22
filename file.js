document.addEventListener("DOMContentLoaded", function() {
    // Fake Stock Data (Replace with API Later)
    const stockData = [
        { company: "Reliance Industries", price: 1,277.50, change: "+0.66%" },
        { company: "HDFC Bank", price: 1,772.50, change: "+0.21%" },
        { company: "Infosys", price: 1,595.40, change: "-1.25%" },
        { company: "TCS", price: 3,578.00, change: "+0.42%" },
        { company: "HUL", price: 2,247.50, change: "+0.23%" }
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
