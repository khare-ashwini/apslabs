var API = require('./api');

var Twitter = new API('location/twitter', handleTwitterData);

module.exports = Twitter;

function handleTwitterData (data) {
	console.log(data);
}
