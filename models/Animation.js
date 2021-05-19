const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animationSchema = new Schema({
	title: String,
	path: String,
	created_at: { type: Date, default: Date.now },
});

const Animation = mongoose.model("Animation", animationSchema);

module.exports = Animation;