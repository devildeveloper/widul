var express = require('express');
var routes = require('App/Routes');
var path = require('path');
var appSocket=require('App/Socket.io');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//iniciamos el recorrido de las rutas
routes(app);
//iniciamos el server de widul
var server=require('http').createServer(app);
	server.listen(app.get('port'), function(){
  		console.log('Widul app is running .... FUCK YEA! ' + app.get('port'));
	});
// iniciamos la conexion de sockets
var io = require('socket.io').listen(server);
appSocket(io);