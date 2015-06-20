var $ = require('jquery');
var Instagram = require('./instagram');
var Twitter = require('./twitter');
var InstagramHashtag = Instagram.hashtag;
var twitterStart = Twitter.start.bind(Twitter);

module.exports = new Events();

function Events () {

};

Events.prototype.startListening = function () {
	this.searchEvent();
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
