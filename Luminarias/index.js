var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use('/static', express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var focos = { "f2":"0", "f3":"0", "f4":"0", "f5":"0", "f6":"0", "f7":"0", "f8":"0", "f9":"0" };

/***************************************************************
* Declaramos io y su listener al evento connection
* Este a su vez creará un socket, que está a la escucha
* de lo que envie el cliente
***************************************************************/
io.on('connection', function(socket){
  console.log('alguien se conecto!');
  io.emit('recibido', {
     datos: focos
  });
  socket.on('arduino', function(mensaje){
    console.log(mensaje);
    focos = mensaje;
    io.emit('recibido', {
      datos: focos
    });
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});