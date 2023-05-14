const express = require('express');
const http = require('http');
// const socketIO = require('socket.io')
const connect = require('./db');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser')

const { setupSocket } = require('./socket');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

connect();
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
app.use('/users', userRoutes);

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