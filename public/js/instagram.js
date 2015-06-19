var Location = require('./location');
var $ = require('jquery');

module.exports = new Instgram();

function Instagram () {
	this.defaultCoordinates = [37.7785502,-122.3895516];
}


Instagram.prototype.start = function () {
	var self = this;
	Location.get(self.getPictures);
}

Instagram.prototype.getPictures = function (location) {
	var coords;
	location = location || {};

	if (typeof location.accuracy == 'undefined' || location.accuracy < 20) {
		coords = this.defaultCoordinates;
	} else {
		coords = [location.latitude, location.longitude]
	}

	this.callAPI(coords);
}

Instagram.prototype.callAPI = function (coords) {
	$.getJSON('/location/instagram', {lat: coords[0], long: [1]}, self.handleInstagramData);
}

Instagram.prototype.handleInstagramData = function (data) {
	console.log(data);
}
