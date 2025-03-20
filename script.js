// Toggle Chat Popup
function toggleChat() {
    const chatPopup = document.getElementById("chat-popup");
    if (chatPopup.style.display === "none" || chatPopup.style.display === "") {
        chatPopup.style.display = "block";
    } else {
        chatPopup.style.display = "none";
    }
}

// Predefined Responses
const responses = {
    "hi": "Hello! How can I assist you with your financial queries?",
    "investment options": "You can invest in stocks, mutual funds, bonds, or real estate depending on your risk appetite.",
    "best stock": "Stock recommendations vary. Consider blue-chip stocks for stability or growth stocks for potential high returns.",
    "mutual funds": "Mutual funds pool money from investors to invest in diversified portfolios managed by professionals.",
    "real estate": "Investing in real estate can provide long-term wealth through rental income and property appreciation.",
    "bye": "Goodbye! Feel free to ask more questions anytime."
};

// Send Message Function
function sendMessage() {
    const userInput = document.getElementById("user-input").value.toLowerCase();
    const chatbox = document.getElementById("chatbox");

    // Display User Message
    if (userInput.trim() !== "") {
        chatbox.innerHTML += `<p class="user">${userInput}</p>`;
        document.getElementById("user-input").value = "";

        // Display Bot Response
        let response = responses[userInput] || "I'm not sure. Please ask about investments, stocks, or mutual funds.";
        setTimeout(() => {
            chatbox.innerHTML += `<p class="bot">${response}</p>`;
            chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the latest message
        }, 500);
    }
}

// Handle Enter Key Press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Handle Enter Key Press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}