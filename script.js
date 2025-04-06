// Advanced Financial Chatbot with pattern matching, context awareness, and memory

// Bot state to track conversation context
const botState = {
    context: "general",
    lastQuery: "",
    userName: "",
    previousTopics: [],
    sessionStartTime: new Date(),
    suggestedTopics: []
};

// Toggle Chat Popup
function toggleChat() {
    const chatPopup = document.getElementById("chat-popup");
    if (chatPopup.style.display === "none" || chatPopup.style.display === "") {
        chatPopup.style.display = "block";
        // Add welcome message when chat opens
        const chatbox = document.getElementById("chatbox");
        if (chatbox.innerHTML === "") {
            setTimeout(() => {
                chatbox.innerHTML += `<p class="bot">Hello! I'm your financial assistant. How can I help you with investing or financial planning today?</p>`;
            }, 300);
        }
    } else {
        chatPopup.style.display = "none";
    }
}

// Original predefined responses - keep as reference
const responses = {
    // Your existing responses object
    "hi": "Hello! How can I assist you with your financial queries?",
    // ... [all your existing responses remain here] ...
};

// Pattern matching for more flexible responses
const patterns = [
    // Greeting patterns
    { pattern: /\b(hi|hello|hey|howdy|greetings)\b/i, handler: handleGreeting },
    
    // Name extraction
    { pattern: /my name is (\w+)/i, handler: handleNameExtraction },
    
    // Financial literacy patterns
    { pattern: /\b(what is|define|explain) (financial literacy|compound interest|inflation)\b/i, handler: handleFinancialConcept },
    
    // Investment patterns
    { pattern: /\b(investment|invest|investing|stock market|stocks|shares|mutual funds|bonds|etfs)\b/i, handler: handleInvestmentQuery },
    
    // Risk-related patterns
    { pattern: /\b(risk|return|diversification|portfolio)\b/i, handler: handleRiskQuery },
    
    // India-specific patterns
    { pattern: /\b(ppf|nps|elss|sebi|fd|rd|tax-saving)\b/i, handler: handleIndiaSpecificQuery },
    
    // Trading patterns
    { pattern: /\b(intraday|swing trading|long-term|stop-loss|margin trading|short selling)\b/i, handler: handleTradingQuery },
    
    // Market analysis patterns
    { pattern: /\b(technical analysis|fundamental analysis|rsi|macd|pe ratio|eps|moving average)\b/i, handler: handleMarketAnalysisQuery },
    
    // Stock recommendation patterns
    { pattern: /\b(which stock|best stocks|good for beginners|multibagger|undervalued|dividend-paying)\b/i, handler: handleStockRecommendationQuery },
    
    // Comparison patterns
    { pattern: /\b(difference between|compare|vs|versus)\b/i, handler: handleComparisonQuery },
    
    // Help pattern
    { pattern: /\b(help|what can you do|what can you help with)\b/i, handler: handleHelpRequest },
    
    // Farewell patterns
    { pattern: /\b(bye|goodbye|see you|farewell|thanks|thank you)\b/i, handler: handleFarewell }
];

// Handler functions for pattern matching
function handleGreeting() {
    const greetings = [
        "Hello! How can I assist you with your financial questions today?",
        "Hi there! What financial topics would you like to explore?",
        "Hey! I'm here to help with your investment queries. What's on your mind?"
    ];
    
    // Personalized greeting if we know the user's name
    if (botState.userName) {
        return `Hello ${botState.userName}! How can I help with your financial questions today?`;
    }
    
    return greetings[Math.floor(Math.random() * greetings.length)];
}

function handleNameExtraction(match, userInput) {
    const name = match[1]; // Extract the name from the regex match
    botState.userName = name; // Store in bot state
    return `Nice to meet you, ${name}! Feel free to ask me any financial questions.`;
}

function handleFinancialConcept(match, userInput) {
    const concept = match[2].toLowerCase();
    botState.context = "financial_literacy";
    botState.previousTopics.push(concept);
    
    // Lookup in responses or provide more detailed answer
    if (responses[`what is ${concept}`]) {
        return responses[`what is ${concept}`];
    }
    
    // Fallback for concepts not in predefined responses
    const conceptResponses = {
        "financial literacy": "Financial literacy is the ability to understand and effectively use financial skills like budgeting, saving, investing, and managing debt to make informed financial decisions.",
        "compound interest": "Compound interest is interest calculated on the initial principal and also on the accumulated interest over previous periods. It makes your money grow faster over time, which is why Einstein allegedly called it the 'eighth wonder of the world'.",
        "inflation": "Inflation is the rate at which the general level of prices for goods and services rises, reducing the purchasing power of money over time. This is why simply saving money without investing it can actually make you lose value in real terms."
    };
    
    return conceptResponses[concept] || `${concept} is an important financial concept. Could you be more specific about what you'd like to know?`;
}

function handleInvestmentQuery(match, userInput) {
    botState.context = "investments";
    
    // First check for exact matches in our predefined responses
    for (const key in responses) {
        if (userInput.includes(key)) {
            return responses[key];
        }
    }
    
    // If no exact match, analyze the query further
    if (userInput.includes("types")) {
        return "Common investment types include stocks (company ownership), bonds (lending money), mutual funds (professionally managed portfolios), ETFs (exchange-traded funds), real estate, and fixed deposits. Each has different risk and return profiles.";
    } else if (userInput.includes("begin") || userInput.includes("start")) {
        return "To start investing, first: 1) Set clear financial goals, 2) Build an emergency fund, 3) Understand your risk tolerance, 4) Research investment options, 5) Consider starting with a SIP in a mutual fund for disciplined investing, and 6) Consult a financial advisor if needed.";
    } else if (userInput.includes("how much")) {
        return "The amount to invest depends on your financial goals, income, expenses, and time horizon. A good rule of thumb is to invest at least 15-20% of your income. Start with whatever you can and gradually increase it.";
    }
    
    // Generate suggestions based on context
    botState.suggestedTopics = ["types of investments", "how to start investing", "risk vs. return", "mutual funds vs. stocks"];
    
    return "I'd be happy to discuss investments. Would you like to know about different investment types, how to start investing, or understanding risk and returns?";
}

function handleRiskQuery(match, userInput) {
    botState.context = "risk_management";
    
    // Check for exact matches in predefined responses
    for (const key in responses) {
        if (userInput.includes(key)) {
            return responses[key];
        }
    }
    
    if (userInput.includes("tolerance")) {
        return "Risk tolerance is your ability and willingness to endure market fluctuations and potential losses in your investments. It's influenced by factors like your financial goals, time horizon, income stability, and emotional comfort with volatility.";
    } else if (userInput.includes("diversification")) {
        return "Diversification means spreading your investments across different asset classes, sectors, and geographical regions to reduce risk. As the saying goes, 'Don't put all your eggs in one basket.' This strategy helps minimize the impact of any single investment's poor performance on your overall portfolio.";
    } else if (userInput.includes("portfolio")) {
        return "A well-balanced portfolio typically includes a mix of stocks (for growth), bonds (for stability), and sometimes other assets like real estate or gold (for diversification). The exact allocation depends on your risk tolerance, financial goals, and investment horizon.";
    }
    
    return "Understanding risk is crucial for successful investing. Would you like to know more about risk tolerance, diversification strategies, or how to build a balanced portfolio?";
}

function handleIndiaSpecificQuery(match, userInput) {
    botState.context = "india_specific";
    
    // First check existing responses
    for (const key in responses) {
        if (userInput.includes(key)) {
            return responses[key];
        }
    }
    
    // Additional information for India-specific queries
    if (userInput.includes("80c") || userInput.includes("tax saving")) {
        return "Section 80C of the Income Tax Act allows tax deductions up to ₹1.5 lakh on investments like PPF, ELSS, Tax-saving FDs, NSC, and life insurance premiums. ELSS funds have the shortest lock-in period (3 years) among tax-saving instruments under 80C.";
    }
    
    return "I can help you with India-specific investment options like PPF, NPS, ELSS, and tax-saving strategies. What specific information are you looking for?";
}

function handleTradingQuery(match, userInput) {
    botState.context = "trading";
    
    // Check predefined responses first
    for (const key in responses) {
        if (userInput.includes(key)) {
            return responses[key];
        }
    }
    
    if (userInput.includes("beginner")) {
        return "For beginners in trading, start with: 1) Learning market basics, 2) Using a demo account to practice, 3) Starting with blue-chip stocks, 4) Setting strict stop-losses, 5) Investing only what you can afford to lose, and 6) Focusing on long-term investing before attempting active trading.";
    }
    
    botState.suggestedTopics = ["intraday trading", "long-term investing", "technical analysis", "risk management in trading"];
    
    return "Trading requires knowledge, discipline, and risk management. Would you like to know about different trading styles, analysis methods, or strategies for beginners?";
}

function handleMarketAnalysisQuery(match, userInput) {
    botState.context = "market_analysis";
    
    // Check predefined responses
    for (const key in responses) {
        if (userInput.includes(key)) {
            return responses[key];
        }
    }
    
    return "Market analysis helps make informed investment decisions. There are two main approaches: technical analysis (studying price charts and patterns) and fundamental analysis (evaluating a company's financial health and business model). Which would you like to explore further?";
}

function handleStockRecommendationQuery(match, userInput) {
    botState.context = "stock_recommendations";
    
    // Check predefined responses
    for (const key in responses) {
        if (userInput.includes(key)) {
            return responses[key];
        }
    }
    
    return "I can discuss stock investing strategies, but I don't provide specific buy/sell recommendations as they depend on your financial goals, risk tolerance, and market conditions. It's best to research thoroughly or consult a financial advisor for personalized advice. Would you like to learn about how to evaluate stocks yourself?";
}

function handleComparisonQuery(match, userInput) {
    // Look for specific comparison patterns
    if (userInput.includes("stock") && userInput.includes("mutual fund")) {
        return "Stocks vs Mutual Funds: Stocks are direct company ownership with potentially higher returns but higher risk and require more knowledge. Mutual funds are professionally managed portfolios offering diversification and convenience but with management fees. Mutual funds are generally better for beginners or those with less time for research.";
    } else if (userInput.includes("fd") && userInput.includes("rd")) {
        return "Fixed Deposits (FD) vs Recurring Deposits (RD): FDs require a one-time lump sum investment, while RDs allow regular monthly contributions. FDs are better if you have a large amount ready to invest, while RDs help in building the saving habit with smaller regular amounts.";
    } else if (userInput.includes("saving") && userInput.includes("investing")) {
        return "Saving vs Investing: Saving means setting aside money in safe, liquid accounts for short-term goals and emergencies. Investing involves putting money into assets with growth potential for long-term goals. Saving offers safety but minimal returns, while investing offers higher potential returns with higher risk.";
    }
    
    // Check for specific terms to compare
    const comparisonTerms = userInput.match(/difference between (.*) and (.*)/i);
    if (comparisonTerms) {
        const term1 = comparisonTerms[1].trim();
        const term2 = comparisonTerms[2].trim();
        
        // Check predefined responses
        const key = `difference between ${term1} and ${term2}`;
        if (responses[key]) {
            return responses[key];
        }
        
        return `You're asking about the difference between ${term1} and ${term2}. Both are important financial concepts. Could you be more specific about what aspects you'd like compared?`;
    }
    
    return "I can help compare different financial instruments or concepts. Please specify what you'd like to compare.";
}

function handleHelpRequest() {
    botState.context = "help";
    
    return "I can help you with various financial topics including:\n" +
           "- Basic financial concepts (inflation, compound interest)\n" +
           "- Investment options (stocks, bonds, mutual funds)\n" +
           "- Risk management and portfolio diversification\n" +
           "- India-specific investments (PPF, NPS, ELSS)\n" +
           "- Stock market basics and trading strategies\n" +
           "- Market analysis methods\n\n" +
           "Just ask me anything about these topics!";
}

function handleFarewell() {
    const farewells = [
        "Goodbye! Feel free to return anytime you have financial questions.",
        "Take care! I'm here whenever you need financial guidance.",
        "Thanks for chatting! Come back soon for more financial insights."
    ];
    
    if (botState.userName) {
        return `Goodbye, ${botState.userName}! Feel free to return anytime you have financial questions.`;
    }
    
    return farewells[Math.floor(Math.random() * farewells.length)];
}

// Fallback handler for queries that don't match patterns
function handleFallbackQuery(userInput) {
    // Check if any word in the input matches a key in responses
    const words = userInput.split(' ');
    for (const word of words) {
        if (responses[word]) {
            return responses[word];
        }
    }
    
    // Generate contextual suggestions based on current conversation context
    let suggestionMessage = "";
    if (botState.context === "investments") {
        suggestionMessage = " You might want to ask about types of investments, risk profiles, or how to start investing.";
    } else if (botState.context === "stock_recommendations") {
        suggestionMessage = " You could ask about how to evaluate stocks, investment strategies, or long-term vs short-term investing.";
    }
    
    return `I'm not sure I understand that query about ${botState.context || "finance"}.${suggestionMessage} Feel free to try rephrasing your question.`;
}

// Function to find similar questions for fuzzy matching
function findSimilarQuestion(userInput) {
    let bestMatch = null;
    let highestScore = 0;
    
    // Simple similarity function (can be improved with more sophisticated algorithms)
    function calculateSimilarity(str1, str2) {
        const set1 = new Set(str1.toLowerCase().split(' '));
        const set2 = new Set(str2.toLowerCase().split(' '));
        const intersection = new Set([...set1].filter(x => set2.has(x)));
        return intersection.size / Math.max(set1.size, set2.size);
    }
    
    // Check predefined responses for similar questions
    for (const key in responses) {
        const similarity = calculateSimilarity(userInput, key);
        if (similarity > 0.5 && similarity > highestScore) {
            highestScore = similarity;
            bestMatch = key;
        }
    }
    
    return bestMatch;
}

// Generate suggestions based on current context
function generateSuggestions() {
    const suggestions = {
        "general": ["What is financial literacy?", "How do I start investing?", "What is the difference between saving and investing?"],
        "investments": ["What are different types of investments?", "How do I choose between stocks and mutual funds?", "What is diversification?"],
        "risk_management": ["What is risk tolerance?", "How do I diversify my portfolio?", "What are low-risk investments?"],
        "india_specific": ["What are the best tax-saving options in India?", "Explain PPF and its benefits", "How does ELSS work?"],
        "trading": ["What is intraday trading?", "How do I use stop-loss effectively?", "What is the difference between trading and investing?"],
        "market_analysis": ["Explain technical analysis", "What are key metrics in fundamental analysis?", "How to read stock charts?"],
        "stock_recommendations": ["How to identify undervalued stocks?", "What factors affect stock prices?", "How to build a dividend portfolio?"]
    };
    
    const currentContext = botState.context || "general";
    return suggestions[currentContext] || suggestions["general"];
}

// Enhanced Send Message Function
function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;
    
    const chatbox = document.getElementById("chatbox");
    const cleanInput = userInput.toLowerCase();
    
    // Display User Message
    chatbox.innerHTML += `<p class="user">${userInput}</p>`;
    document.getElementById("user-input").value = "";
    
    // Store the query in the bot state
    botState.lastQuery = cleanInput;
    
    // Process the user input
    let response = processUserInput(cleanInput);
    
    // Add suggestions if appropriate
    if (!cleanInput.includes("bye") && !cleanInput.includes("goodbye")) {
        const suggestions = generateSuggestions();
        if (Math.random() > 0.7) { // Only show suggestions sometimes to avoid being annoying
            response += `\n\nYou might also be interested in: "${suggestions[Math.floor(Math.random() * suggestions.length)]}"`;
        }
    }
    
    // Display Bot Response with typing effect
    let typingIndicator = document.createElement("p");
    typingIndicator.className = "bot typing";
    typingIndicator.innerHTML = "<em>Typing...</em>";
    chatbox.appendChild(typingIndicator);
    
    // Auto-scroll
    chatbox.scrollTop = chatbox.scrollHeight;
    
    // Simulate thinking time based on response length
    const thinkingTime = Math.min(300 + response.length * 5, 1500);
    
    setTimeout(() => {
        // Remove typing indicator
        chatbox.removeChild(typingIndicator);
        
        // Add the actual response
        chatbox.innerHTML += `<p class="bot">${response}</p>`;
        
        // Auto-scroll to the latest message
        chatbox.scrollTop = chatbox.scrollHeight;
    }, thinkingTime);
}

// Process user input to generate appropriate response
function processUserInput(userInput) {
    // Direct match in responses
    if (responses[userInput]) {
        return responses[userInput];
    }
    
    // Try pattern matching
    for (const { pattern, handler } of patterns) {
        const match = userInput.match(pattern);
        if (match) {
            return handler(match, userInput);
        }
    }
    
    // Try to find similar questions
    const similarQuestion = findSimilarQuestion(userInput);
    if (similarQuestion) {
        return `I think you're asking about ${similarQuestion}. ${responses[similarQuestion]}`;
    }
    
    // Fallback to general response
    return handleFallbackQuery(userInput);
}

// Handle Enter Key Press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Add suggestion chip capability
function addSuggestionChips() {
    const suggestionsContainer = document.createElement("div");
    suggestionsContainer.className = "suggestion-chips";
    suggestionsContainer.id = "suggestion-chips";
    
    const suggestions = generateSuggestions();
    
    suggestions.forEach(suggestion => {
        const chip = document.createElement("button");
        chip.className = "suggestion-chip";
        chip.textContent = suggestion;
        chip.onclick = function() {
            document.getElementById("user-input").value = suggestion;
            sendMessage();
        };
        suggestionsContainer.appendChild(chip);
    });
    
    // Add suggestions after chatbox
    const chatContainer = document.getElementById("chat-popup");
    const inputContainer = document.getElementById("input-container");
    chatContainer.insertBefore(suggestionsContainer, inputContainer);
}

// Initialize chatbot when page loads
window.onload = function() {
    // If you want to add suggestion chips at the start
    // addSuggestionChips();
    
    // Or you can call this after the first user message
    // to show relevant suggestions
};