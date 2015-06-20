var API = require('./api');
var $ = require('jquery');
var Masonry = require('masonry-layout');

var InstagramLocation = new API('images/instagram', handleInstagramData);
var InstagramHashtag = new API('hash/instagram', handleInstagramData);

module.exports = {
				   location: InstagramLocation,
				   hashtag: InstagramHashtag
				};


function handleInstagramData (data) {
	var html = '';
	for (i = 0; i < data.length; i++) {
		html += '<div class="item">'
		html += getImageHtml(data[i]);
		html += '</div>'
	}
	$('#masonry-container').html(html);
	var grid = new Masonry('.collage', {
		itemSelector: '.item',
		columnWidth: 95
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
	image.caption = image.caption || {};
	var caption = image.caption.text || "";
	html += '<div>' + caption.substring(0, 150) + '...' + '</div>'
	return html;
}
