var Location = require('./location');
var $ = require('jquery');
require('./libs/collage');

module.exports = new Instagram();

function Instagram () {
	this.defaultCoordinates = [37.778,-122.389];
}

function roundTo2Places (number) {
	return Math.round(number * 100) / 100;
}

function getImageHtml (image) {
	var src = image.images.standard_resolution.url;
	return '<img src="' + src + '"/>'
}

Instagram.prototype.start = function () {
	var self = this;
	Location.get(self.getPictures.bind(self));
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
	var self = this;
	$.getJSON('location/instagram', {lat: roundTo2Places(coords[0]), lng: roundTo2Places(coords[1])}, self.handleInstagramData);
}

Instagram.prototype.handleInstagramData = function (data) {
	var html = '<div class="collage">';
	for (i = 0; i < data.length; i++) {
		html += getImageHtml(data[i]);
	}
	html += '</div>';

	$('body').append(html);
	$('.collage').collagePlus({
		'targetHeight': 100,
		'effect': 'effect-1'
	});
}
