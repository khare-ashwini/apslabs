var Location = require('./location');
var $ = require('jquery');

module.exports = API;

function API (path, handleDataCallback) {
	this.defaultCoordinates = [37.778,-122.389];
	this.path = path;
	this.handleDataCallback = handleDataCallback
}

function roundTo2Places (number) {
	return Math.round(number * 100) / 100;
}

API.prototype.start = function () {
	var self = this;
	Location.get(self.getPictures.bind(self));
}

API.prototype.getPictures = function (location) {
	var coords;
	location = location || {};

	if (typeof location.accuracy == 'undefined' || location.accuracy < 20) {
		coords = this.defaultCoordinates;
	} else {
		coords = [location.latitude, location.longitude]
	}

	coords = this.defaultCoordinates;

	this.callAPI(coords);
}

API.prototype.callAPI = function (coords) {
	var self = this;
	$.getJSON(self.path, {lat: roundTo2Places(coords[0]), lng: roundTo2Places(coords[1])}, self.handleDataCallback);
}

API.prototype.getHashtag = function (hashtag, callback) {
	var self = this;
	$.getJSON(self.path, {hashtag: hashtag}, self.handleDataCallback);
}
