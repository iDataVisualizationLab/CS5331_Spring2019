const http = require('http');
const querystring = require('querystring');
const studenthandler = require('./modules/studenthandler');

http.createServer((req, res) => {
    const parts = req.url.split('?');
    const op = parts[0];
    const data = querystring.parse(parts[1]);
    if (op === "/insert") {
        studenthandler.insertStudent(data, (result) => {
            res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
            res.end('success');
        });
    } else if (op === "/select") {
        studenthandler.selectAll((cursor, onComplete) => {
            cursor.toArray((error, docs)=>{
                res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                res.end(JSON.stringify(docs));
            });
        });
    }
}).listen(8888, 'localhost');
console.log('Listening on http://localhost:8888');