var mongoose = require('mongoose');


var ticketSchema = new mongoose.Schema({
	seat: String,
	name: String,
	cost: { type: Number, default: 8},
	quantity: {type: Number, default: 1},
	total: Number,
	approve: { type: Boolean, default: 0}
});

ticketSchema.pre('save', function (next) {
	var ticket = this;
	ticket.total = ticket.total || ticket.cost * ticket.quantity;
	next();
});

module.exports = mongoose.model('Schema', ticketSchema);
