const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware para servir archivos estáticos
app.use(express.static(__dirname));

// Manejar rutas específicas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Configurar HTTPS
const options = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
};

const server = https.createServer(options, app);

// Iniciar servidor
server.listen(443, () => {
    console.log('Servidor HTTPS iniciado en https://localhost:443');
});
