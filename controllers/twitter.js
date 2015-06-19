/**
 * Twitter Controller
 */
var secrets = require('../config/secrets');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var Twit = require('twit');
var _ = require('lodash');

/**
 * GET /location/twitter
 * Twiter GET Tweets by location
 */
exports.getTweets = function(req, res, next) {
  var token = _.find(req.user.tokens, { kind: 'twitter' });
  var T = new Twit({
    consumer_key: secrets.twitter.consumerKey,
    consumer_secret: secrets.twitter.consumerSecret,
    access_token: token.accessToken,
    access_token_secret: token.tokenSecret
  });

  var lat = req.query.lat;
  var lng = req.query.lng;
  var date = req.query.date;
  var count_ = req.query.count;

  T.get('search/tweets', { q: 'Game since:2013-01-01', geocode: lat + ',' + lng + ',5mi', count: count_ }, function(err, reply) {
    if (err) return next(err);
    res.json(reply)
  });
};