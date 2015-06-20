var $ = require('jquery');
var Instagram = require('./instagram');
var InstagramHashtag = Instagram.hashtag;

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
			InstagramHashtag.getHashtag(val);
		}
	})
}
