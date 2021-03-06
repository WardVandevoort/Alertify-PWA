'use strict';

//Loading dependencies & initializing express
var os = require('os');  //for operating system-related utility methods and properties
var express = require('express'); 
var app = express();
var http = require('http');   //for creating http server
var url = require('url');
const config = require('config');

//For signalling in WebRTC
var socketIO = require('socket.io');

app.use((req, res, next) => {
	if(process.env.NODE_ENV === 'production') {
		if(req.headers['x-forwarded-proto'] !== 'https'){
			return res.redirect('https://' + req.headers.host + req.url);
		}
		else{
			return next();
		}
	} 
	else{
		return next();
	}
});

//Define the folder which contains the CSS and JS for the fontend
app.use(express.static('public'))

//Allow express to use json
app.use(express.json());

// Connect to db
const mongoose = require('mongoose');
mongoose.connect(process.env.dbconnection || config.get("Database.connection"), {
	useNewUrlParser: true, 
	useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);

//Define routes 
app.get("/call", function(req, res){
	res.render("call.ejs");
});

app.get("/chat", function(req, res){
	res.render("chat.ejs");
});

app.get("/login.html", function(req, res){
	res.render("login.html");
});

app.get("/profile.html", function(req, res){
	res.render("profile.html");
});

app.get("/profile/medical-info.html", function(req, res){
	res.render("/profile/medical-info.html");
});

app.get("/profile/ice-contacts.html", function(req, res){
	res.render("/profile/ice-contacts.html");
});

app.get("/dispatcher/login.html", function(req, res){
	res.render("/dispatcher/login.html");
});

app.get("/dispatcher/past-calls.html", function(req, res){
	res.render("/dispatcher/past-calls.html");
});

app.get("/dispatcher/past-chats.html", function(req, res){
	res.render("/dispatcher/past-chats.html");
});

app.get("/dispatcher/user.html", function(req, res){
	res.render("/dispatcher/user.html");
});

app.get("/dispatcher/dispatcher.html", function(req, res){
	res.render("/dispatcher/dispatcher.html");
});

app.get("/", function(req, res){
	res.render("index.html");
});

app.get("/dispatcher/index.html", function(req, res){
	res.render("/dispatcher/index.html");
});

app.get("/dispatcher/dashboard", function(req, res){
	res.render("dashboard.ejs");
});

app.get("/dispatcher/chat-dashboard", function(req, res){
	res.render("chat-dashboard.ejs");
});

//Initialize http server and associate it with express
var server = http.createServer(app);

const primus = require("./primus/primus").go(server);

//Ports on which server should listen - 8000 or the one provided by the environment
server.listen(process.env.PORT || 8000);

//Initialize socket.io
var io = socketIO(server);

//Implementing Socket.io
//connection is a synonym of reserved event connect
//connection event is fired as soon as a client connects to this socket.
io.sockets.on('connection', function(socket) {

	// Convenience function to log server messages on the client.
	// Arguments is an array like object which contains all the arguments of log(). 
	// To push all the arguments of log() in array, we have to use apply().
	function log() {
          var array = ['Message from server:'];
          array.push.apply(array, arguments);
          socket.emit('log', array);
	}
  
    
     //Defining Server behaviors on Socket Events
     socket.on('message', function(message, room) {
	     log('Client said: ', message);
          //server should send the receive only in room
	     socket.in(room).emit('message', message, room);
	});
  
	//Event for joining/creating room
     socket.on('create or join', function(room) {
	     log('Received request to create or join room ' + room);
  
	     //Finding clients in the current room
          var clientsInRoom = io.sockets.adapter.rooms[room];
	     var numClients = 0;

		for(var key in clientsInRoom){
    			if(clientsInRoom.hasOwnProperty(key)){
        		numClients++;
			}
		}
		
		console.log("numClients:" + numClients);
	     log('Room ' + room + ' now has ' + numClients + ' client(s)');
  
          //If no client is in the room, create a room and add the current client
	     if (numClients === 0) {
               socket.join(room);
               log('Client ID ' + socket.id + ' created room ' + room);
               socket.emit('created', room, socket.id);
	     } 
    
          //If one client is already in the room, add this client in the room
          else if (numClients === 1) {
               log('Client ID ' + socket.id + ' joined room ' + room);
               io.sockets.in(room).emit('join', room);
               socket.join(room);
               socket.emit('joined', room, socket.id);
               io.sockets.in(room).emit('ready');
	     }
    
          //If two clients are already present in the room, do not add the current client in the room
          else { 
               // max two clients
               socket.emit('full', room);
          }
     });
  
     //Utility event 
	socket.on('ipaddr', function() {
	     var ifaces = os.networkInterfaces();
	     for (var dev in ifaces) {
		     ifaces[dev].forEach(function(details) {
		          if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
			          socket.emit('ipaddr', details.address);
		          }
		     });
	     }
	});
  
     //Event for notifying other clients when a client leaves the room
	socket.on('bye', function(){
	     console.log('received bye');
	});
  
});



const controller = require("./controllers/controller");

// Database calls
app.post("/register", controller.register);

app.post("/login", controller.login);

app.post("/dispatcher-login", controller.dispatcherLogin);

app.post("/email_check", controller.emailCheck);

app.post("/create_call", controller.createCall);

app.put("/update_call", controller.updateCall);

app.put("/update_call_tel_flow", controller.updateCallTelFlow);

app.get("/show_active_calls", controller.showActiveCalls);

app.put("/user_ended_call", controller.userEndedCall);

app.post("/get_current_call", controller.getCurrentCall);

app.post("/get_user_data", controller.getUserData);

app.get("/get_animations", controller.getAnimations);

app.post("/create_chat", controller.createChat);

app.put("/update_chat_messages", controller.updateChatMessages);

app.post("/get_chat", controller.getChat);

app.put("/user_ended_chat", controller.userEndedChat);

app.get("/show_active_chats", controller.showActiveChats);

app.put("/update_chat", controller.updateChat);

app.post("/get_current_chat", controller.getCurrentChat);

app.put("/update_user_data", controller.updateUserData);

app.put("/update_medical_data", controller.updateMedicalData);

app.put("/add_ice_contact", controller.addIceContact);

app.put("/update_call_notes", controller.updateCallNotes);

app.put("/update_chat_notes", controller.updateChatNotes);

app.post("/get_past_calls", controller.getPastCalls);

app.post("/get_dispatcher_data", controller.getDispatcherData);

app.post("/get_past_chats", controller.getPastChats);