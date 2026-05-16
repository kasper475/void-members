const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// 👇 هنا حط رابط البوت الأصلي حقك
const BOT_URL = 'http://usa6.kerit.cloud:9519/api/members';

app.get('/api/members', async (req, res) => {
    try {
        const response = await axios.get(BOT_URL, { timeout: 8000 });
        res.json(response.data);
    } catch (error) {
        console.error('Proxy error:', error.message);
        res.json({ totalMembers: '---' });
    }
});

app.get('/ping', (req, res) => {
    res.send('OK');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`✅ Proxy running on port ${port}`);
});
