const port = process.env.PORT || 3000;
const app = require('./app');
const server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(port);



module.exports = server;
