const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Generar certificado auto-firmado
const certPath = path.join(__dirname, 'cert');
if (!fs.existsSync(certPath)) {
    fs.mkdirSync(certPath);
}

const cert = spawn('openssl', [
    'req',
    '-x509',
    '-newkey', 'rsa:2048',
    '-keyout', path.join(certPath, 'key.pem'),
    '-out', path.join(certPath, 'cert.pem'),
    '-days', '365',
    '-nodes',
    '-subj', '/CN=Nemesis'
]);

cert.on('exit', () => {
    console.log('Certificado generado exitosamente');
});
