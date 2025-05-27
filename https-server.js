const https = require('https');
const fs = require('fs');
const path = require('path');

// Generar un certificado auto-firmado
const generateCertificate = require('generate-selfsigned-certificate');
const cert = generateCertificate({
    host: 'Nemesis'
});

const certPath = path.join(__dirname, 'cert');
const server = https.createServer({
    key: fs.readFileSync(path.join(certPath, 'key.pem')),
    cert: fs.readFileSync(path.join(certPath, 'cert.pem'))
}, (req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
                return;
            }
            res.writeHead(500);
            res.end('Server Error');
            return;
        }

        res.writeHead(200, {
            'Content-Type': getFileType(filePath)
        });
        res.end(content);
    });
});

server.listen(443, () => {
    console.log('HTTPS Server running at https://Nemesis/');
});

function getFileType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const types = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css'
    };
    return types[ext] || 'text/plain';
}
