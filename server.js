const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middlewares: These must come BEFORE your routes.
app.use(cors());
app.use(express.json()); // This line is crucial for parsing the JSON body of the request.

// API endpoint for recommendations
app.post('/api/recommendations', async (req, res) => {
    // Safeguard: Check if the request body and analyticsData exist before trying to use them.
    if (!req.body || !req.body.analyticsData) {
        console.error("Error: Request received without analyticsData.");
        return res.status(400).json({ error: "Bad Request: analyticsData is missing from the request body." });
    }

    const { analyticsData } = req.body;

    const prompt = `
        You are a financial copilot for an independent musician named ${analyticsData.artistName}. Your tone is friendly and encouraging.
        Your task is to rephrase three core messages based on the user's financial data.

        **CRITICAL INSTRUCTION:** You MUST only output the three rephrased recommendations. Do NOT include any of your own thought process, introductions, headings, or any extra text. Your response should start directly with the first recommendation.

        ---
        **Financial Data to Use:**
        - Weekly Spending: $${analyticsData.weeklySpending.toFixed(2)}
        - Most Expensive Category: ${analyticsData.mostExpensiveCategory}
        - Profit From Tapyoca Cards: $${analyticsData.tapyocaRevenue.toFixed(2)}

        ---
        **Core Messages to Rephrase:**
        1.  **On Spending:** The user is overspending on ${analyticsData.mostExpensiveCategory}. Suggest investing in a home studio as a long-term money-saving idea.
        2.  **What's Working or Not:** Based on the profit from Creator Copilot cards, which is $${analyticsData.tapyocaRevenue.toFixed(2)}, encourage the user push sales.
        3.  **Local Tip:** Recommend looking for a studio locally for indie artists.

        ---
        Your final output should be ONLY the three rephrased points, each on a new line.
    `;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'phi3:mini',
                prompt: prompt,
                stream: false,
            }),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!ollamaResponse.ok) {
            throw new Error(`Ollama API error: ${ollamaResponse.status}`);
        }

        const ollamaData = await ollamaResponse.json();
        
        res.json({ recommendationsText: ollamaData.response.trim() });

    } catch (error) {
        console.error("Error communicating with Ollama:", error);
        res.status(500).json({ error: "Failed to generate recommendations from Ollama." });
    }
});

app.listen(PORT, () => {
    console.log(`✅ tapyoca server is running on http://localhost:${PORT}`);
});

