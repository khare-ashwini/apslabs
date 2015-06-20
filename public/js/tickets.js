var $ = require('jquery');

module.exports = new Tickets();

function Tickets () {

};

Tickets.prototype.start = function () {
	var isOnTicket = (window.location.pathname === '/tickets');

	if (isOnTicket) {
		$.getJSON('/tickets/info', function (info) {
			for (var i = 0; i < info.length; i++) {

			}
		});
	}
};


function TicketRow(info) {
}
