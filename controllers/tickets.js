/**
 * Ticket controller, handles everything for tickets
 */

var config = require('../config/secrets');
var TicketModel = require('../models/Ticket');

exports.handleTicket = function (req, res) {
	res.render('tickets', {
		title: 'Tickets Information'
	})
};


exports.feedTicket = function (req, res) {
	handleQuery(req.body, res);
};


exports.getTicket = function (req, res) {
	getTickets(res);
};

function handleQuery(query, res) {
	if (!query.seat) {
		res.send('Seat is missing');
		return;
	}
	if (!query.name) {
		res.send('name is missing');
		return;
	}

	var Ticket = new TicketModel()
	Ticket.seat = query.seat;
	Ticket.cost = query.cost;
	Ticket.quantity = query.quantity;
	Ticket.name = query.name;

	Ticket.save(function (err) {
		if (err) {
			res.send('Error occured');
		} else {
			res.send('Success');
		}
	});
}

function getTickets (res) {
	TicketModel.find({}, function (err, tickets) {
		if (err) {
			res.send('Failed to fetch data');
		} else {
			res.send(JSON.stringify(tickets));
		}
	})
}


