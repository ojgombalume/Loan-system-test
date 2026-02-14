// Minimal test server for Railway deployment
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Simple test endpoint
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Railway Test - Skycap Loans</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    max-width: 800px; 
                    margin: 50px auto; 
                    padding: 20px;
                    text-align: center;
                }
                .success { color: green; font-size: 24px; margin: 20px 0; }
                .info { background: #f0f0f0; padding: 20px; border-radius: 10px; }
            </style>
        </head>
        <body>
            <h1>✅ Railway Deployment Successful!</h1>
            <div class="success">Skycap Loans Server is Running</div>
            <div class="info">
                <p><strong>Server Info:</strong></p>
                <p>Port: ${PORT}</p>
                <p>Node Version: ${process.version}</p>
                <p>Environment: ${process.env.NODE_ENV || 'development'}</p>
                <p>Time: ${new Date().toLocaleString()}</p>
            </div>
            <p style="margin-top: 30px;">
                <strong>Next Step:</strong> Replace this file with server.js to enable full functionality
            </p>
        </body>
        </html>
    `);
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Test server running on port ${PORT}`);
});
