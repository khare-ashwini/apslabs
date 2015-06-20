var $ = require('jquery');
var Instagram = require('./instagram');
var Twitter = require('./twitter');
var InstagramHashtag = Instagram.hashtag;
var twitterStart = Twitter.start.bind(Twitter);
var ticket = require('./tickets');


module.exports = new Events();

function Events () {

};

Events.prototype.startListening = function () {
	this.searchEvent();
	this.updateEvent();
	this.okEvent();
	this.deleteEvent();
	this.approveEvent();
}

Events.prototype.searchEvent = function () {
	$('.hashtag-search').keyup(function (e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			this.blur();
			var val = $(e.target).val();
			$("#masonry-container").html('');
			InstagramHashtag.getHashtag(val);
			twitterStart();
		}
	})
}

Events.prototype.updateEvent = function () {
	$('.ticket-update').click(function (e) {
		var id = $(this).attr('data-id');
		var parent = $(this).parent();
		var values = parent.find('td').val();
		value = values.slice(0,5);
		var info = {_id: id ,
					 name: value[1],
					 seat: value[0],
					 quantity: value[2],
					 cost: value[3],
					 total: value[4]};

		var html = ticket.ticketUpdateRow(info);
		console.log(info, html)
		// parent.html(html);
	})
}

Events.prototype.okEvent = function () {
	$('.ticket-ok').click(function () {
		var id = $(this).attr('data-id');
		var parent = $(this).parent();
		var values = parent.find('input').val();
		var info = {_id: id ,
					 name: value[1],
					 seat: value[0],
					 quantity: value[2],
					 cost: value[3],
					 total: value[4]};
		$.post('tickets/update', info, function () {
			var html = ticket.ticketRow(info);
			parent.html(html);
		});
	})
}

Events.prototype.deleteEvent = function () {
	$('.ticket-delete').click(function () {
		var id = $(this).attr('data-id');
		var parent = $(this).parent();
		$.post('tickets/delete', {_id: id}, function () {
			parent.remove();
		});
	});
}

Events.prototype.approveEvent = function () {
	$('.ticket-approve').click(function () {
		var id = $(this).attr('data-id');
		var parent = $(this).parent();
		$.post('tickets/approve', {_id: id}, function () {
			parent.remove();
		});
	});
}
