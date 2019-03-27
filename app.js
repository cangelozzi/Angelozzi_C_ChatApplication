var express = require('express');
var app = express();

var io = require('socket.io')();

const port = process.env.PORT || 3000;

// tell express where our static files are
app.use(express.static('public'));

app.get('/', (req, res) => {

  res.sendfile(__dirname + '/views/index.html');

});

// const server = http.listen(port, () => {
//   console.log(`app is running on port ${port}`);
// });

const server = app.listen(port, ()=> {
  console.log(`app is running on port ${port}`);
});

//! socket.io chat app stuff to follow note. socket is client

io.attach(server);

io.on('connection', function (socket) {
  console.log('a user has connected');

  // sending back msg to connecting tool
  socket.emit('connected', {sID: `${socket.id}`, message: 'new connection'});

  // listen for incoming message form anyone connected to the app
  socket.on('chat message', function(msg) {
    console.log('message', msg, 'socket', socket.id);

    // send message to everyone connected to the app
    io.emit('chat message', { id: `${socket.id}`, message: msg });
  });

  socket.on('disconnect', function(){
    console.log('a user has disconnected');
  });
});