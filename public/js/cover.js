var $ = require('jquery');

module.exports = new Cover();

function Cover () {
	this.apiUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d5e79af202d1f95d5fb1c6ee3d3fccc6&tags=stadium&safe_search=1&per_page=20" + "&format=json&jsoncallback=?";
};

Cover.prototype.fetchImage = function (callback) {
	var self = this;
	$.getJSON(self.apiUrl, callback);
};

Cover.prototype.attachImage = function (data) {
	var photos = data.photos.photo,
		randomPhoto = photos[Math.floor(Math.random() * (photos.length-1))],
		imgSrc = "http://farm"+ randomPhoto.farm +".static.flickr.com/"+ randomPhoto.server +"/"+ randomPhoto.id +"_"+ randomPhoto.secret +"_b.jpg";
};

Cover.prototype.bgImage = function (imgSrc) {
	$('body').css({'background-image': 'url(' + imgSrc + ')'});
}

Cover.prototype.fetchAndAttachImage = function () {
	this.bgImage('https://c1.staticflickr.com/1/49/219852487_53e4f916ee_b.jpg');
}
