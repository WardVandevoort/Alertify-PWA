const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dispatcherSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	deleted_at: { type: Date, default: null },
});

const Dispatcher = mongoose.model("Dispatcher", dispatcherSchema);

module.exports = Dispatcher;