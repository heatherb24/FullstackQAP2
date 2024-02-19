const http = require('http');
const fs = require('fs');

const routes = {
    '/': 'index.html',
    '/about': 'about.html',
    '/contact': 'contact.html',
    '/subscribe': 'subscribe.html',
    '/products': 'products.html'
};

const server = http.createServer((req, res) => {
    const url = req.url;

    if (routes[url]) {
        const filePath = __dirname + '/' + routes[url];

        logActivity(`Route ${url} accessed`);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error reading file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

function logActivity(activity) {
    const logMessage = `${new Date().toISOString()} - ${activity}\n`;

    
    console.log(logMessage);

    fs.appendFile('server.log', logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
