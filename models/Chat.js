const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
	user_id: { type: String, default: null },
	dispatcher_id: { type: String, default: null },
	room: String,
	notes: { type: String, default: null },
	active: { type: Boolean, default: 1 },
	lat: String,
	long: String,
     messages: { type: Array, default: null },
	created_at: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;