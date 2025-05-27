const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
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

server.listen(80, () => {
    console.log('Server running at http://Nemesis/');
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
