var API = require('./api');
var $ = require('jquery');
var Utils = require('./utils')
var InstagramLocation = new API('images/instagram', handleInstagramData);
var InstagramHashtag = new API('hash/instagram', handleInstagramData);

module.exports = {
				   location: InstagramLocation,
				   hashtag: InstagramHashtag
				};


function handleInstagramData (data) {
	var html = '';
	html += '<button class="show-graph btn btn-primary">Show Graph</button>'
	var tags = {};
	for (i = 0; i < data.length; i++) {
		html += '<div class="item">'
		html += getImageHtml(data[i], tags);
		html += '</div>'
	}
	Utils.addHtml(html);
	getAnalysis(tags)
}

function getImageHtml (image, tagsData) {
	// var types = ["standard_resolution", "low_resolution", "thumbnail"];
	// var type = types[Math.floor(Math.random() * 3)]
	var type = "low_resolution";
	var src = image.images[type].url;
	var html = '<img src="' + src + '"/>'
	var tags = '';
	for(tag in image.tags) {
		if (tag < 3) {
			tags += '#' + image.tags[tag] + ' ';
		}
		if (tagsData[image.tags[tag]]) {
			tagsData[image.tags[tag]]++;
		} else {
			tagsData[image.tags[tag]] = 1;
		}
	}
	html += '<span>' + tags + '</span>';
	image.caption = image.caption || {};
	var caption = image.caption.text || "";
	html += '<div>' + caption.substring(0, 150) + '...' + '</div>'
	return html;
}

function getAnalysis (tags) {
	var values = [];
	var labels = [];
	for(var i in tags) {
		values.push(tags[i]);
		labels.push(i);
	}
	Raphael("holder", 700, 700).pieChart(350, 350, 200, values, labels, "#fff");
}
