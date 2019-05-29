const http = require('http');



http.createServer((request, response) => {

	response.writeHead(200);
	response.end('Hello World!\n');

}).listen(8080);

