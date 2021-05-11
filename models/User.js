const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	date_of_birth: { type: String, default: null },
	sex: { type: String, default: null },
	telephone_number: { type: String, default: null },
	street: { type: String, default: null },
	street_number: { type: String, default: null },
	city: { type: String, default: null },
	postal_code: { type: String, default: null },
	province: { type: String, default: null },
	profile_completed: { type: Boolean, default: 0 },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	deleted_at: { type: Date, default: null },
});

const User = mongoose.model("User", userSchema);

module.exports = User;