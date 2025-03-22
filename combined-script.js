// Combined JavaScript File: combined-script.js

// ==================== CHATBOT ====================
function toggleChat() {
    const chatPopup = document.getElementById("chat-popup");
    if (chatPopup.style.display === "none" || chatPopup.style.display === "") {
        chatPopup.style.display = "block";
    } else {
        chatPopup.style.display = "none";
    }
}

const responses = {
    "hi": "Hello! How can I assist you with your financial queries?",
    "investment options": "You can invest in stocks, mutual funds, bonds, or real estate depending on your risk appetite.",
    "best stock": "Stock recommendations vary. Consider blue-chip stocks for stability or growth stocks for potential high returns.",
    "mutual funds": "Mutual funds pool money from investors to invest in diversified portfolios managed by professionals.",
    "real estate": "Investing in real estate can provide long-term wealth through rental income and property appreciation.",
    "bye": "Goodbye! Feel free to ask more questions anytime."
};

function sendMessage() {
    const userInput = document.getElementById("user-input").value.toLowerCase();
    const chatbox = document.getElementById("chatbox");

    if (userInput.trim() !== "") {
        chatbox.innerHTML += `<p class="user">${userInput}</p>`;
        document.getElementById("user-input").value = "";

        let response = responses[userInput] || "I'm not sure. Please ask about investments, stocks, or mutual funds.";
        setTimeout(() => {
            chatbox.innerHTML += `<p class="bot">${response}</p>`;
            chatbox.scrollTop = chatbox.scrollHeight;
        }, 500);
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// ==================== DYNAMIC CONTENT LOADING ====================
function loadContent(page) {
    const contentDiv = document.getElementById("content");
    let content = '';

    switch (page) {
        case 'index':
            content = `
                <div class="main-content">
                    <img src="img 1.jpg" alt="Financial Growth">
                    <img src="img 2.jpg" alt="Stock Market">
                    <img src="img 3.jpg" alt="Investments">
                    <img src="img 4.jpg" alt="Wealth Management">
                </div>
            `;
            break;

        case 'marketdata':
            content = `
                <section class="market-container">
                    <h1>📊 Live Market Data</h1>
                    <p>Get real-time stock prices, trends, and insights.</p>
                    <div class="market-card">
                        <h2>📈 Top Gainers & Losers</h2>
                        <table class="stock-table">
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Price (₹)</th>
                                    <th>Change (%)</th>
                                </tr>
                            </thead>
                            <tbody id="stockData">
                                <tr>
                                    <td>Loading...</td>
                                    <td>Loading...</td>
                                    <td>Loading...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="chart-container">
                        <canvas id="marketChart"></canvas>
                    </div>
                </section>
            `;
            break;

        case 'Invest':
            content = `
                <section class="investment-section">
                    <h1>📊 Investment Strategies</h1>
                    <p>Learn how to invest wisely, diversify your portfolio, and maximize returns.</p>
                </section>
                <div class="strategy-container">
                    <h2>🚀 Popular Strategies</h2>
                    <ul>
                        <li>💹 <strong>Stock Market Investing</strong> - Invest in equity for high returns.</li>
                        <li>🏡 <strong>Real Estate Investments</strong> - Secure your future with properties.</li>
                        <li>🔗 <strong>Cryptocurrency & Blockchain</strong> - The future of digital assets.</li>
                        <li>📈 <strong>Mutual Funds & ETFs</strong> - Diversify with professional management.</li>
                        <li>💰 <strong>Fixed Deposits & Bonds</strong> - Low risk, steady income.</li>
                    </ul>
                </div>
                <div class="chart-container">
                    <canvas id="investmentChart"></canvas>
                </div>
                <div class="calculator">
                    <h2>🧮 Investment Calculator</h2>
                    <label for="amount">💵 Initial Investment (₹):</label>
                    <input type="number" id="amount" placeholder="Enter amount">
                    <label for="rate">📊 Annual Interest Rate (%):</label>
                    <input type="number" id="rate" placeholder="Enter interest rate">
                    <label for="years">⏳ Investment Duration (Years):</label>
                    <input type="number" id="years" placeholder="Enter years">
                    <button onclick="calculateInvestment()">Calculate</button>
                    <p id="result"></p>
                </div>
            `;
            break;

        case 'Trade':
            content = `
                <section class="trading-section">
                    <h1>📊 Trading Techniques</h1>
                    <p>Explore different trading methods, risk management strategies, and stock market insights.</p>
                </section>
                <div class="strategy-container">
                    <h2>🔥 Popular Trading Techniques</h2>
                    <ul>
                        <li>📈 <strong>Day Trading</strong> - Buy & sell stocks within a single day.</li>
                        <li>⏳ <strong>Swing Trading</strong> - Hold positions for days to capture trends.</li>
                        <li>📉 <strong>Scalping</strong> - Execute rapid trades for small profits.</li>
                        <li>🔮 <strong>Momentum Trading</strong> - Ride trends with strong volume.</li>
                        <li>🛡️ <strong>Risk Management</strong> - Stop-loss, diversification, and hedging.</li>
                    </ul>
                </div>
                <div class="chart-container">
                    <canvas id="tradingChart"></canvas>
                </div>
                <div class="calculator">
                    <h2>💹 Trade Profit Calculator</h2>
                    <label for="buyPrice">💵 Buy Price (₹):</label>
                    <input type="number" id="buyPrice" placeholder="Enter buy price">
                    <label for="sellPrice">💰 Sell Price (₹):</label>
                    <input type="number" id="sellPrice" placeholder="Enter sell price">
                    <label for="quantity">📊 Quantity:</label>
                    <input type="number" id="quantity" placeholder="Enter quantity">
                    <button onclick="calculateProfit()">Calculate Profit</button>
                    <p id="profitResult"></p>
                </div>
            `;
            break;

        case 'contact':
            content = `
                <div class="contact-container">
                    <h2>Contact Us</h2>
                    <p>We're here to help! Please feel free to reach out to us with any questions or concerns.</p>
                    <div class="contact-details">
                        <div class="detail-item">
                            <h3>Address</h3>
                            <p>MAIT, Sector-22, Rohini,<br>Delhi, India</p>
                        </div>
                        <div class="detail-item">
                            <h3>Phone</h3>
                            <p>+91-9876543210</p>
                        </div>
                        <div class="detail-item">
                            <h3>Email</h3>
                            <p>info@alphabucks.com</p>
                        </div>
                        <div class="detail-item">
                            <h3>Working Hours</h3>
                            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        </div>
                    </div>
                    <form class="contact-form">
                        <input type="text" placeholder="Your Name" required>
                        <input type="email" placeholder="Your Email" required>
                        <textarea placeholder="Your Message" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            `;
            break;

        case 'regulations':
            content = `
                <div class="regulations-container">
                    <h2>Financial Regulations</h2>
                    <p>Understanding the regulatory environment is crucial for successful and compliant investing. Here's an overview of key regulations and bodies that govern financial activities.</p>
                    <div class="regulation-section">
                        <h3>Securities and Exchange Board of India (SEBI)</h3>
                        <p>SEBI is the primary regulator for the securities market in India. It aims to protect the interests of investors and ensure fair and transparent market practices.</p>
                        <ul>
                            <li>Regulations for stock exchanges and brokers.</li>
                            <li>Rules for mutual funds and investment advisors.</li>
                            <li>Enforcement against insider trading and market manipulation.</li>
                        </ul>
                    </div>
                </div>
            `;
            break;

        case 'resources':
            content = `
                <div class="resources-container">
                    <h2>Financial Resources</h2>
                    <p>Enhance your financial knowledge with these valuable resources. Whether you're a beginner or an experienced investor, these tools and guides will help you make informed decisions.</p>
                    <div class="resource-section">
                        <h3>Educational Articles & Guides</h3>
                        <p>Learn about various investment strategies, financial planning, and market analysis.</p>
                        <ul>
                            <li><a href="#">Investing Basics for Beginners</a></li>
                            <li><a href="#">Advanced Portfolio Diversification Techniques</a></li>
                            <li><a href="#">Understanding Market Trends and Analysis</a></li>
                            <li><a href="#">Tax Planning for Investors</a></li>
                        </ul>
                    </div>
                </div>
            `;
            break;

        default:
            content = `<h1>Welcome to ALPHABUCKS</h1>`;
    }

    contentDiv.innerHTML = content;
}

// Load default content (Home page)
window.onload = function () {
    loadContent('index');
};