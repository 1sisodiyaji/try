const axios = require('axios');

exports.SummarizeAi = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required for summarization." });
    }

    try {
        const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
        const prompt = `Please summarize the following text in a concise manner with a structured format:
  1. Write a short paragraph (200-250 words) summarizing the key points of the conversation. Enclose this paragraph in <p> tags.
  2. Extract and highlight five key points in the most concise form possible. Each point should be a very short and direct phrase (max 5 words) enclosed in <ul><li> tags. Focus only on actionable or significant details.
  
  Avoid redundant information and irrelevant details. Maintain a professional yet reader-friendly tone. Here’s the text to summarize: ${text}
  `;

        const response = await axios.post(`${apiUrl}?key=${process.env.GEMINI_API_KEY}`, { contents: [{ parts: [{ text: prompt }], },], });
        const result = response.data.candidates[0].content.parts[0].text;

        return res.json({ status: true, summary: result });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({
            error: "Summary generation failed",
            details: error.message
        });
    }
};
