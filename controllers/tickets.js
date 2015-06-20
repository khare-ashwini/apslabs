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

exports.updateTicket = function (req, res) {
	updateTickets(req.body, res);
}

exports.deleteTicket = function (req, res) {
	deleteTicket(req.body, res);
}

exports.approveTicket = function (req, res) {
	approveTicket(req.body, res);
}

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

function getTickets(res) {
	TicketModel.find({}, function (err, tickets) {
		if (err) {
			res.send('Failed to fetch data');
		} else {
			res.send(JSON.stringify(tickets));
		}
	})
}

function updateTicket(req, res) {
	var id = req._id;
	var name = req.name;
	var quantity = req.quantity;
	var seat = req.seat;
	var cost = req.cost;
	var total = req.total;

	TicketModel.findById(id, function (err, existing) {
		if (err ){
			res.send('update failed');
			return;
		}
		existing.name = name;
		existing.quantity = quantity;
		existing.seat = seat;
		existing.cost = cost;
		exisiting.total = total;
		existing.save(function (err) {
			if (err) {
				res.send('update failed');
			} else {
				res.send('updated');
			}
		});
	})
}

function deleteTicket(req, res) {
	var id = req._id;
	TicketModel.remove({_id: id}, function (err) {
		if (err) {
			res.send('delete failed');
		} else {
			res.send('deleted');
		}
	})
}

function approveTicket(req, res) {
	var id = req._id;
	TicketModel.findById(id, function (err, existing) {
		if (err) {
			res.send('Failed to approve');
			return;
		}
		existing.approve = 1;
		existing.save(function (err) {
			if (err) {
				res.send('approve failed');
			} else {
				res.send('approved');
			}
		})
	});
}


