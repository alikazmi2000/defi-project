// socket.js
let io;
const crypto = require("crypto")
const DH = crypto.createDiffieHellman(256);

function setupSocket(ioInstance) {
  io = ioInstance;

  io.on('connection', (socket) => {
    console.log('a user connected');
    const publicKey = DH.generateKeys('hex');
    socket.emit('publicKey', publicKey);

    socket.on('clientPublicKey', (clientPublicKey) => {
      // Step 2: server receives client's DH public key and generates shared secret
      const sharedSecret = DH.computeSecret(clientPublicKey, 'hex', 'hex');
      console.log('Shared secret:', sharedSecret);

      // Step 3: server sends confirmation to client
      socket.emit('sharedSecret', 'Diffie-Hellman key exchange successful');
    })
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('message', (message) => {
      console.log('message received: ', message);
      // broadcast the message to all connected clients
      io.emit('message', message);
    });
  });
}

module.exports = { setupSocket };
