var $ = require('jquery');

module.exports = new Cover();

function Cover () {
	this.apiUrl = "";
};

Cover.prototype.fetchImage = function (callback) {
	var self = this;
	$.getJSON(self.apiUrl, callback);
};

Cover.prototype.attachImage = function (data) {
	$('body').attr('background', data[0].image);
};

Cover.prototype.fetchAndAttachImage = function () {
	var self = this;
	self.fetchImage(self.attachImage);
}
