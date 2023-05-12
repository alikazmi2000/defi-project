const express = require('express');
const http = require('http');
// const socketIO = require('socket.io')

const { setupSocket } = require('./socket');
const cors = require('cors');

const app = express();
app.use(cors());
// allow requests from any origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});
const server = http.createServer(app);

const socketIO = require('socket.io')(server, {
  cors: {
      origin: "*"
  }
});
setupSocket(socketIO);
// Set up the socket.io connection

server.listen(3001, () => {
  console.log('listening on *:3001');
});