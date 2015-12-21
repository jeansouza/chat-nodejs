var express = require('express'),
    path = require('path'),
    load = require('express-load'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    methodOverride = require('method-override'),
    error = require('./middlewares/error'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser('ntalk'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

io.sockets.on('connection', function(client) {
  client.on('send-server', function(data) {
    var msg = "<b>" + data.nome + ":</b> " + data.msg + "<br>";
    client.emit('send-client', msg);
    client.broadcast.emit('send-client', msg);
  });
});

app.use(error.notFound);
app.use(error.serverError);

module.exports = app;

app.listen(3000, function() {
  console.log("Ntalk no ar!");
});
