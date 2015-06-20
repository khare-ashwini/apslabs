var API = require('./api');
var Utils = require('./utils');

var Twitter = new API('location/twitter', handleTwitterData);

module.exports = Twitter;

function handleTwitterData (data) {
	var html = '';
	for(var i = 0; i < data.statuses.length; i++) {
		html += '<div class="item">' +  getStatusData(data.statuses[i]) + '</div>';
	}
	Utils.addHtml(html);
}

function getStatusData (status) {
	var html = '';
	html += '<img src="' + status.user.profile_image_url + '"/>' + '<span>@' + status.user.screen_name + ' ('
		 + status.user.name + ')';
	status.text = status.text || '';
	html += '<div class="twitter-status">' + status.text.substring(0, 150) + '</div>';
	return html;
}
