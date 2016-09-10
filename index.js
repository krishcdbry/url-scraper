'use strict'

/**
 * Url scraper which takes the text input and finds the links/urls, scraps them using cheerio and will
 * returns an array of objects where each object contains scrapped webpage's information.
 *
 * @module url-scraper
 * @typicalname urlScraper
 * @example
 * var urlScraper = require('url-scraper')
 */

var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var parser = require('npm-text-parser');

exports.scrap = urlScrap;

/**
 * @name urlScrap
 * @typicalname urlScrap
 * @param {string} text  - Input text
 * @return {object} Object
 *
 * @usage
 * var textParser = require('url-scraper')
 * var inputString = 'This is awesome it parses the url's dude and http://krishcdbry.com done !'
 *
 * //{
 * // original_text: 'This is awesome it scraps the sites dude and http://heartynote.com done !',
 * // parsed_text: 'This is awesome it scraps the sites dude and <a href="http://heartynote.com" target="_blank">http://heartynote.com</a> done !',
 * // scraped_data:
 * //   [
 * //     { domain: 'heartynote.com',
 * //       title: 'heartynote welcomes u !!',
 * //       description: 'Bring your life',
 * //       thumb: '',
 * //       url: '',
 * //       isValid: true,
 * //        _links: [Object]
 * //     }
 * //   ]
 * // }
 *
 */
function urlScrap(data) {

	var urls = parser.getUrls(data);

	return new Promise(function(resolve, reject) {

		if (urls && urls.length > 0) {

			var finalRes = {};
			var scrapRes = [];

			var sendData = function() {
				finalRes['original_text'] = data;
				finalRes['parsed_text'] = parser.parseUrl(data);
				finalRes['scraped_data'] = scrapRes;
				resolve(finalRes);
			};

			var getUrlData = function(url, callback) {
				url = (url.indexOf('://') > 0) ? url : 'http://' + url;

				var domain = (url.indexOf("://") > 0) ? url.split("://")[1] : url;
				domain = (domain.indexOf('/') > 0) ? domain.split('/')[0] : domain;

				var _self = url;

				request(url, function(err, res2, html) {
					if (err) {
						callback({'error': "Error getting url data"});
					}
					var $ = cheerio.load(html);
					if ($) {
						var title = $('title').html() ? $('title').html() : '';
						var description = $('meta[name=description]') ? $('meta[name=description]').attr('content') : '';
						var thumb = null;
						if ($('meta[property="og:image"]')) {
							thumb = $('meta[property="og:image"]').attr('content')
						}
						else {
							if ($('link[rel="shortcut icon"]')) {
								thumb = $('link[rel="shortcut icon"]').attr('href')
							}
						}
						var canonical = $('link[rel=canonical]') ? $('link[rel=canonical]').attr('href') : '';

						var scrapObj = {
							"domain": domain
							, "title": (title != undefined) ? title : ''
							, "description": (description != undefined) ? description : ''
							, "thumb": (thumb != undefined) ? thumb : ''
							, "canonical": (canonical != undefined) ? canonical : ''
							, "isValid": true
							, "_links": {
								"self": _self
							}
						};
						callback(scrapObj);
					}
					else {
						callback(null);
					}
				});
			};

			var gettingData = function(url) {
				if (url) {
					getUrlData(url, function(result) {
						if (result) {
							scrapRes.push(result);
						}
						return gettingData(urls.pop());
					})
				}
				else {
					return sendData();
				}
			};

			gettingData(urls.pop());
		}
		else {
			reject({});
		}

	})
};
