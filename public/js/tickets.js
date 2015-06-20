var $ = require('jquery');

module.exports = new Tickets();

function Tickets () {

};

Tickets.prototype.start = function () {
	var isOnTicket = (window.location.pathname === '/tickets');

	if (isOnTicket) {
		$.getJSON('/tickets/all', function (info) {
			handleTickets(info);
		});
	}
};


function handleTickets(info) {
	var html = '<table>';
	html += '<th>Seat</th>';
	html += '<th>Name</th>';
	html += '<th>Quantity</th>';
	html += '<th>Cost</th>';
	html += '<th>Total</th>';
	html += '<th></th>';
	html += '<th></th>';
	html += '<th></th>';
	for(var i = 0; i < info.length; i++) {
		html += ticketRow(info[i]);
	}
	html += '</table>'
	$('.ticket-div').html(html);
}

function ticketRow(info) {
 	var html = '';
 	if (!info.seat || !info.name || !info.quantity || !info.cost || !info.total) {
 		return html;
 	}
 	html += '<tr>'
 	html += '<td>' + info.seat + '</td>';
 	html += '<td>' + info.name + '</td>';
 	html += '<td>' + info.quantity + '</td>';
 	html += '<td>' + info.cost + '</td>';
 	html += '<td>' + info.total + '</td>';
 	html += '<td><button class="ticket-approve" data-id="' + info._id + '">Approve</button></td>';
 	html += '<td><button class="ticket-decline" data-id="' + info._id + '"></button>Delete</td>';
 	html += '<td><button class="ticket-update" data-id="' + info._id + '"></button>Update</td>';
 	html += '</tr>';
 	return html;
}
