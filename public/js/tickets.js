var $ = require('jquery');

module.exports = new Tickets();

function Tickets () {

};

Tickets.prototype.start = function () {
	var isOnTicket = (window.location.pathname === '/tickets');

	if (isOnTicket) {
		$.getJSON('tickets/all', function (info) {
			handleTickets(info);
		});
	}
};

Tickets.prototype.update = function (data) {
	$.post('tickets/update', data, function (info){

	});
}

Tickets.prototype.delete = function (data) {
	$.post('tickets/delete', data, function (info){

	});
}

Tickets.prototype.ticketRow = function (info) {
	return ticketRow(info);
}

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
 	if (!info.seat || !info.name || !info.quantity || !info.cost || !info.total || info.approve) {
 		return html;
 	}
 	html += '<tr>'
 	html += '<td>' + info.seat + '</td>';
 	html += '<td>' + info.name + '</td>';
 	html += '<td>' + info.quantity + '</td>';
 	html += '<td>' + info.cost + '</td>';
 	html += '<td>' + info.total + '</td>';
 	html += '<td><button class="ticket-button ticket-approve" data-id="' + info._id + '"><i class="fa fa-thumbs-up"></i></button></td>';
 	html += '<td><button class="ticket-button ticket-delete" data-id="' + info._id + '"><i class="fa fa-thumbs-down"></i></button></td>';
 	html += '<td><button class="ticket-button ticket-update" data-id="' + info._id + '"><i class="fa fa-wrench"></i></button></td>';
 	html += '</tr>';
 	return html;
}

Tickets.prototype.ticketUpdateRow = function (info) {
 	var html = '';
 	if (!info.seat || !info.name || !info.quantity || !info.cost || !info.total) {
 		return html;
 	}
 	html += '<tr>'
 	html += '<td><input type="text" value="' + info.seat + '"/></td>';
 	html += '<td><input type="text" value="' + info.name + '"/></td>';
 	html += '<td><input type="number" value="' + info.quantity + '"/></td>';
 	html += '<td><input type="number" value="' + info.cost + '"/></td>';
 	html += '<td><input type="number" value="' + info.total + '"/></td>';
 	html += '<td><button class="ticket-button ticket-ok" data-id="' + info._id + '"><i class="fa fa-check"></i></button></td>';
 	html += '</tr>';
 	return html;
}

