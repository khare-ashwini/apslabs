var $ = require('jquery');
var Cover = require('./cover');
var Instagram = require('./instagram');
var InstagramLocation = Instagram.location;
var InstagramHashtag = Instagram.hashtag;
var Twitter = require('./twitter');
var Events = require('./events');
var Tickets = require('./tickets')
InstagramHashtag.getHashtag("stadium");
// Cover.fetchAndAttachImage();
// var instagramStart = InstagramLocation.start.bind(InstagramLocation);
// instagramStart();


var twitterStart = Twitter.start.bind(Twitter);
twitterStart();

Events.startListening();
Tickets.start();
