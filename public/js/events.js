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
	this.graphEvent();
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
	$('body').on('click', '.ticket-update', function () {
		var id = $(this).attr('data-id');
		var parent = $(this).parent().parent();
		var values = parent.find('td').map(function () { return $(this).html() });
		var value = values.slice(0,5);
		var info = {_id: id ,
					 name: value[1],
					 seat: value[0],
					 quantity: value[2],
					 cost: value[3],
					 total: value[4]};

		var html = ticket.ticketUpdateRow(info);
		parent.replaceWith(html);
	})
}

Events.prototype.okEvent = function () {
	$('body').on('click', '.ticket-ok', function () {
		var id = $(this).attr('data-id');
		var parent = $(this).parent().parent();
		var values = parent.find('input').map(function () { return $(this).val() });
		var info = {_id: id ,
					 name: values[1],
					 seat: values[0],
					 quantity: values[2],
					 cost: values[3],
					 total: parseInt(values[2]) * parseInt(values[3])};
		$.post('tickets/update', info, function () {
			var html = ticket.ticketRow(info);
			parent.replaceWith(html);
		});
	})
}

Events.prototype.deleteEvent = function () {
	$('body').on('click', '.ticket-delete', function () {
		var id = $(this).attr('data-id');
		var parent = $(this).parent().parent();
		$.post('tickets/delete', {_id: id}, function () {
			parent.remove();
		});
	});
}

Events.prototype.approveEvent = function () {
	$('body').on('click', '.ticket-approve', function () {
		var id = $(this).attr('data-id');
		var parent = $(this).parent().parent();
		$.post('tickets/approve', {_id: id}, function () {
			parent.remove();
		});
	});
}


Events.prototype.graphEvent = function () {
	$('.toggle-graph').click(function () {
		$('#masonry-container').toggle();
		$('#holder').toggle();
		var val = $(this).html();
		if (val == 'Show Chart') {
			$(this).html('Show Images');
		} else {
			$(this).html('Show Chart');
		}
	})
}
