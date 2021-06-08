const bcrypt = require('bcrypt');

// Database models
const User = require("../models/User")
const Dispatcher = require("../models/Dispatcher");
const Call = require("../models/Call");
const Animation = require("../models/Animation");
const Chat = require("../models/Chat");

// Functions
const register = async function(req, res){

	var salt = await bcrypt.genSalt(12);
	var hashedPassword = await bcrypt.hash(req.body.password, salt);
	hashedPassword = String(hashedPassword);

	var user = new User();
	user.first_name = req.body.first_name;
	user.last_name = req.body.last_name;
	user.email = req.body.email;
	user.password = hashedPassword;

	user.save((err, doc) => {
		if(err){
			res.json({
				status: "Error",
				message: "User could not be created."
			});
		}

		if(!err){
			res.json({
				status: "Success",
				message: "User was successfully created."
			});
		}
	});
}

const login = async function(req, res){
	User.findOne({"email": req.body.email}, async (err, docs) => {
		if(err){
			res.json({
				status: "Error",
				message: "User could not be found."
			});
		}

		if(!err){

			var hashedPassword = docs.password;
			var ValidPassword = await bcrypt.compare(req.body.password, hashedPassword);
			
			if(ValidPassword == true){
				res.json({
					message: docs,
				});
			}
			else{
				res.json({
					message: [],
				});
			}
		}
	});
}

const dispatcherLogin = async function(req, res){
	Dispatcher.findOne({"email": req.body.email}, async (err, docs) => {
		if(err){
			res.json({
				status: "Error",
				message: "Dispatcher could not be created."
			});
		}

		if(!err){

			var hashedPassword = docs.password;
			var ValidPassword = await bcrypt.compare(req.body.password, hashedPassword);
			
			if(ValidPassword == true){
				res.json({
					message: docs,
				});
			}
			else{
				res.json({
					message: [],
				});
			}
		}
	});
}

const emailCheck = function(req, res){
	User.find({"email": req.body.email}, (err, docs) => {
		if(err){
			res.json({
				status: "Error",
				message: "Email could not be checked."
			});
		}

		if(!err){
			res.json({
				message: docs,
			});
		}
	});
}

const createCall = function(req, res){
	var user_id = null;
	var dispatcher_id = null;

	var call = new Call();

	if(req.body.user_id){
		user_id = req.body.user_id;
	}
	else{
		call.active = false;
	}

	if(req.body.dispatcher_id){
		dispatcher_id = req.body.dispatcher_id;
	}

	call.user_id = user_id;
	call.dispatcher_id = dispatcher_id;
	call.room = req.body.room;
	call.lat = req.body.lat;
	call.long = req.body.long;

	call.save((err, doc) => {
		if(err){
			res.json({
				status: "Error",
				message: "Call could not be created."
			});
		}

		if(!err){
			res.json({
				status: "Success",
				message: "Call was successfully created."
			});
		}
	});
}

const updateCall = function(req, res){

	var dispatcher_id = req.body.dispatcher_id;
	var active = req.body.active;
	var call_id = req.body.call_id;

	Call.findByIdAndUpdate(call_id, { dispatcher_id: dispatcher_id, active: active }, (err, doc) => {
		if(err){
			res.json({
				status: "Error",
				message: "Call to update could not be retrieved."
			});
		}

		if(!err){
			res.json({
				message: doc,
			});
		}
	});
	
}

const updateCallTelFlow = function(req, res){

	var dispatcher_id = req.body.dispatcher_id;
	var room = req.body.room;

	Call.findOneAndUpdate({ room: room }, { dispatcher_id: dispatcher_id }, (err, doc) => {
		if(err){
			res.json({
				status: "Error",
				message: "Call to update could not be retrieved."
			});
		}

		if(!err){
			res.json({
				message: doc,
			});
		}
	});
	
}

const showActiveCalls = function(req, res){

	Call.find({"active": 1, "dispatcher_id": null}, (err, docs) => {
		if(err){
			res.json({
				status: "Error",
				message: "Active calls could not be retrieved."
			});
		}

		if(!err){
			res.json({
				message: docs,
			});
		}
	});
}

const userEndedCall = function(req, res){

	var active = req.body.active;
	var user_id = req.body.user_id;

	Call.findOneAndUpdate({ user_id: user_id, active: active }, { active: 0 }, (err, doc) => {
		if(err){
			res.json({
				status: "Error",
				message: "Call could not be updated."
			});
		}

		if(!err){
			res.json({
				message: doc,
			});
		}
	});
}

const getCurrentCall = function(req, res){
	var room = req.body.room;
	var dispatcher_id = req.body.dispatcher_id;
	Call.find({"room": room, "dispatcher_id": dispatcher_id}, (err, doc) => {
		if(err){
			res.json({
				status: "Error",
				message: "Current call could not be found."
			});
		}

		if(!err){
			res.json({
				message: doc,
			});
		}
	});
}

const getUserData = function(req, res){
	var user_id = req.body.user_id;
	User.find({"_id": user_id}, (err, doc) => {
		if(err){
			res.json({
				status: "Error",
				message: "User data could not be found."
			});
		}

		if(!err){
			res.json({
				message: doc,
			});
		}
	});
}

const getAnimations = function(req, res){

	Animation.find({}, (err, docs) => {
		if(err){
			res.json({
				status: "Error",
				message: "Animations could not be retrieved."
			});
		}

		if(!err){
			res.json({
				message: docs,
			});
		}
	});
}

const createChat = function(req, res){

	var chat = new Chat();

	chat.user_id = req.body.user_id;
	chat.room = req.body.room;
	chat.lat = req.body.lat;
	chat.long = req.body.long;

	chat.save((err, doc) => {
		if(err){
			res.json({
				status: "Error",
				message: "Chat could not be created."
			});
		}

		if(!err){
			res.json({
				status: "Success",
				message: "Chat was successfully created."
			});
		}
	});
}

const updateChatMessages = function(req, res){

	var id = req.body.id;
	var message = req.body.message;
	var room = req.body.room;

	Chat.findOneAndUpdate({ room: room }, { $push: { messages: { id: id, message: message } } }, (err, doc) => {
		if(err){
			res.json({
				status: "Error",
				message: "Chat to update could not be retrieved."
			});
		}

		if(!err){
			res.json({
				message: doc,
			});
		}
	});
}

const getChat = function(req, res){
	var room = req.body.room;
	Chat.find({"room": room}, (err, doc) => {
		if(err){
			res.json({
				status: "Error",
				message: "Chat could not be found."
			});
		}

		if(!err){
			res.json({
				message: doc,
			});
		}
	});
}

const userEndedChat = function(req, res){

	var active = req.body.active;
	var user_id = req.body.user_id;

	Chat.findOneAndUpdate({ user_id: user_id, active: active }, { active: 0 }, (err, doc) => {
		if(err){
			res.json({
				status: "Error",
				message: "Chat could not be updated."
			});
		}

		if(!err){
			res.json({
				message: doc,
			});
		}
	});
}

const showActiveChats = function(req, res){

	Chat.find({"active": 1, "dispatcher_id": null}, (err, docs) => {
		if(err){
			res.json({
				status: "Error",
				message: "Active chats could not be retrieved."
			});
		}

		if(!err){
			res.json({
				message: docs,
			});
		}
	});
}

const updateChat = function(req, res){

	var dispatcher_id = req.body.dispatcher_id;
	var active = req.body.active;
	var chat_id = req.body.chat_id;

	Chat.findByIdAndUpdate(chat_id, { dispatcher_id: dispatcher_id, active: active }, (err, doc) => {
		if(err){
			res.json({
				status: "Error",
				message: "Chat to update could not be retrieved."
			});
		}

		if(!err){
			res.json({
				message: doc,
			});
		}
	});
	
}

const getCurrentChat = function(req, res){
	var room = req.body.room;
	var dispatcher_id = req.body.dispatcher_id;
	Chat.find({"room": room, "dispatcher_id": dispatcher_id}, (err, doc) => {
		if(err){
			res.json({
				status: "Error",
				message: "Current chat could not be found."
			});
		}

		if(!err){
			res.json({
				message: doc,
			});
		}
	});
}

module.exports.register = register;
module.exports.login = login;
module.exports.dispatcherLogin = dispatcherLogin;
module.exports.emailCheck = emailCheck;
module.exports.createCall = createCall;
module.exports.updateCall = updateCall;
module.exports.showActiveCalls = showActiveCalls;
module.exports.userEndedCall = userEndedCall;
module.exports.getCurrentCall = getCurrentCall;
module.exports.getUserData = getUserData;
module.exports.getAnimations = getAnimations;
module.exports.updateCallTelFlow = updateCallTelFlow;
module.exports.createChat = createChat;
module.exports.updateChatMessages = updateChatMessages;
module.exports.getChat = getChat;
module.exports.userEndedChat = userEndedChat;
module.exports.showActiveChats = showActiveChats;
module.exports.updateChat = updateChat;
module.exports.getCurrentChat = getCurrentChat;