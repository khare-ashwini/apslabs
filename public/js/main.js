var $ = require('jquery');
var Cover = require('./cover');
var Instagram = require('./instagram');

Cover.fetchAndAttachImage();
var instagramStart = Instagram.start.bind(Instagram);
instagramStart();
