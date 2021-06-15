const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const callSchema = new Schema({
	user_id: { type: String, default: null },
	dispatcher_id: { type: String, default: null },
	room: String,
	notes: { type: String, default: null },
	active: { type: Boolean, default: 1 },
	lat: String,
	long: String,
	created_at: { type: Date, default: Date.now },
});

const Call = mongoose.model("Call", callSchema);

module.exports = Call;