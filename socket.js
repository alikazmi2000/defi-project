// socket.js
let io;
const crypto = require("crypto")
const User = require("./schemas/user")
// const DH = crypto.createDiffieHellman(256);
let userOne = null;
let userTwo = null;
function setupSocket(ioInstance) {
  io = ioInstance;

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('sendPublicKey', '');
    console.log("Event for public key submitted")
    socket.on("fetchPBL",async()=>{
      console.log("FETCH PBL I INVOKED")
      // await User.updateOne({ email: clientObj.email }, { $set: { socketConnect: clientObj } });
      // socket.broadcast.emit("SharedPublicKey",clientObj);
      let userList = await User.find();
      userList.map((e)=>{
        
        socket.broadcast.emit("SharedPublicKey",e)
      })
    })
    socket.on('clientPublicKey', async(clientObj) => {
      console.log("Event for clientPublicKey key submitted",clientObj)
      await User.updateOne({ email: clientObj.email }, { $set: { socketConnect: clientObj } });
      // socket.broadcast.emit("SharedPublicKey",clientObj);
      let userList = await User.find();
      console.log(userList);
      userList.map((e)=>{
        socket.broadcast.emit("SharedPublicKey",e)
      })
    })
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on("sendMessage", (message) => {
      socket.broadcast.emit("recieveMessage", message)
    })
    socket.on('message', (message) => {
      console.log("Event for message key submitted")

      console.log('message received: ', message);
      // broadcast the message to all connected clients
      io.emit('message', message);
    });
  });
}

module.exports = { setupSocket };
