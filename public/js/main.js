var $ = require('jquery');
var Cover = require('./cover');
var Instagram = require('./instagram');
var Twitter = require('./twitter');

Cover.fetchAndAttachImage();
var instagramStart = Instagram.start.bind(Instagram);
instagramStart();

var twitterStart = Twitter.start.bind(Twitter);
twitterStart();
