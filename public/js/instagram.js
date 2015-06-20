var API = require('./api');
var $ = require('jquery');
require('./libs/collage');

var Instagram = new API('location/instagram', handleInstagramData);

module.exports = Instagram;


function handleInstagramData (data) {
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

function getImageHtml (image) {
	var src = image.images.standard_resolution.url;
	return '<img src="' + src + '"/>'
}
