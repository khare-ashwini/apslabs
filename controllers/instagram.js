/**
 * Instagram Controller
 */
var secrets = require('../config/secrets');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var ig = require('instagram-node').instagram();
var _ = require('lodash');

/**
 * GET location/instagram
 * Params lat,lng
 * Instagram API getLocation
 */
exports.getLocationId = function(req, res, next) {
  var token = _.find(req.user.tokens, { kind: 'instagram' });
  ig.use({ client_id: secrets.instagram.clientID, client_secret: secrets.instagram.clientSecret });
  ig.use({ access_token: token.accessToken });

  var lat_ = parseFloat(req.query.lat);
  var lng_ = parseFloat(req.query.lng);

  ig.location_search({ lat: lat_, lng: lng_ }, 1000, function(err, result, remaining, limit) {
    if (err) return next(err);
    res.json(result);
  });
};

// AT & T park images



