const  http = require('http');
const app = require('./app');

//Enviromnent variable 
const port = process.env.PORT || 3000;

//To create a server we need to pass a listener, and it
//will listen of incoming requests
const server = http.createServer(app);

server.listen(port);