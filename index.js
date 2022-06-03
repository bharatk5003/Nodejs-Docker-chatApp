const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');


const publicPath=path.join(__dirname,'/public');
console.log(publicPath);
const port=process.env.PORT || 3000;
const app=express();
const server=http.createServer(app);
const io=socketIO(server);


app.use(express.static(publicPath));

console.log(path.join(__dirname+'/public/demo.html'));
app.get('/',(req,res)=>{
     
    res.sendFile(path.join(__dirname+'/public/demo.html'));
});



const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    console.log("new user joined the chat", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})