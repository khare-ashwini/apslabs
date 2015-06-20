var API = require('./api');
var $ = require('jquery');
var Masonry = require('masonry-layout');

var Instagram = new API('images/instagram', handleInstagramData);

module.exports = Instagram;


function handleInstagramData (data) {
	var html = '<div class="collage" id="masonry-grid">';
	for (i = 0; i < data.length; i++) {
		html += '<div class="item">'
		html += getImageHtml(data[i]);
		html += '</div>'
	}
	html += '</div>';

	$('body').append(html);
	var grid = new Masonry('.collage', {
		itemSelector: '.item',
		columnWidth: 200
	});
}

function getImageHtml (image) {
	// var types = ["standard_resolution", "low_resolution", "thumbnail"];
	// var type = types[Math.floor(Math.random() * 3)]
	var type = "low_resolution";
	var src = image.images[type].url;
	var html = '<img src="' + src + '"/>'
	var tags = '';
	for(tag in image.tags) {
		if (tag > 3) {
			break;
		}
		tags += '#' + image.tags[tag] + ' ';
	}
	html += '<span>' + tags + '</span>';
	var caption = image.caption.text;
	html += '<div>' + caption.substring(0, 150) + '...' + '</div>'
	return html;
}
