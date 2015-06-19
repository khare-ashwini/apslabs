module.exports = new Location();

function Location () {

};

Location.prototype.get = function (callback) {
	navigator.geolocation.getCurrentPosition(callback);
}
