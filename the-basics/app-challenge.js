const http = require('http');
const { handlerChallenge } = require('./routes');

const server = http.createServer(handlerChallenge);

server.listen(3000);
