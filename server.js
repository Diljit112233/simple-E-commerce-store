// Simple Node.js static server (no dependencies)
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const base = process.cwd();

const mime = {
  '.html':'text/html',
  '.js':'application/javascript',
  '.css':'text/css',
  '.json':'application/json',
  '.png':'image/png',
  '.jpg':'image/jpeg',
  '.svg':'image/svg+xml',
  '.ico':'image/x-icon',
  '.txt':'text/plain'
};

const server = http.createServer((req,res)=>{
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(base, reqPath);
  fs.stat(filePath, (err, stats)=>{
    if(err || !stats.isFile()){
      res.writeHead(404, {'Content-Type':'text/plain'});
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = mime[ext] || 'application/octet-stream';
    res.writeHead(200, {'Content-Type': type});
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(port, ()=> console.log(`Static server running at http://localhost:${port}`));
