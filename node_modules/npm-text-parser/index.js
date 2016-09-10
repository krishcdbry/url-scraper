'use strict'

/**
 * Text parser which receives text data as input and replaces the urls with clickable links (anchor tags),
 * emails as clickable mail:to tags and also replaces hash tags (#tag) with blue colored text (Optional)
 *
 * @module npm-text-parser
 * @typicalname textParser
 * @example
 * var textParser = require('npm-text-parser')
 */

exports.parseUrl = parseUrl;
exports.parseEmail = parseEmail;
exports.parseHashtags = parseHash;
exports.parse = parseAll;
exports.getUrls = getUrls;
exports.getEmails = getEmails;
exports.getHashtags = getHashtags;
exports.getAll = getAllOccurrences;


/**
 * GLOBALS
 */
var url_regex = /(\b(((https?|ftp):\/\/)|www.)[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
var email_regex = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
var hashtag_regex = /((^|[ ])#[a-zA-Z0-9\d-]{1,500})/gim;


/**
 * @name parseUrl
 * @typicalname parseUrl
 * @param {string} text  - Input text
 * @return {string} parsed string
 *
 * @usage
 * var textParser = require('npm-text-parser')
 * var inputString = 'This is awesome it parses the url's dude and http://krishcdbry.com done !'
 *
 * textParser.parseUrl(inputString)
 * // This is awesome it parses the url's dude and <a href="http://krishcdbry.com" target="_blank">http://krishcdbry.com</a> done !
 *
 */
function parseUrl (text) {

	var urls = url_regex; // Url regex

	text = text ? String(text).replace(/<[^>]+>/gm, '') : '';  // Remove all the html tags

	if (text.match(urls)) {
		text = text.replace(urls, "<a href=\"$1\" target=\"_blank\">$1</a>")  // Replaces the url matches with anchor tags
	}

	return text.replace(/\n\r?/g, '<br />');

}


/**
 * @name parseEmail
 * @typicalname parseEmail
 * @param {string} text  - Input text
 * @return {string} parsed string
 *
 * @usage
 * var textParser = require('npm-text-parser')
 * var inputString = 'This is awesome it parses the email's dude and krishcdbry@gmail.com done !'
 *
 * textParser.parseEmail(inputString)
 * // This is awesome it parses the url's dude and  <a href="mailto:krishcdbry@gmail.com">krishcdbry@gmail.com</a> done !
 *
 */
function parseEmail (text) {

	var emails = email_regex;  // Email regex

	text = text ? String(text).replace(/<[^>]+>/gm, '') : ''; // Remove all the html tags

	if (text.match(emails)) {
		text = text.replace(emails, "<a href=\"mailto:$1\">$1</a>"); // Replaces the email matches with mail:to anchor tags
	}

	return text.replace(/\n\r?/g, '<br />');

}


/**
 * @name parseHashtags
 * @typicalname parseHash
 * @param {string} text  - Input text
 * @return {string} parsed string
 *
 * @usage
 * var textParser = require('npm-text-parser')
 * var inputString = 'This is awesome it parses the hash tag's dude and #krishcdbry done !'
 *
 * textParser.parseHashtags(inputString)
 * // This is awesome it parses the url's dude and <a href="javascript:;">#krishcdbry</a> done !
 *
 */
function parseHash (text) {

	var hashTags = hashtag_regex; // Hashtags regex

	text = text ? String(text).replace(/<[^>]+>/gm, '') : '';  // Remove all the html tags

	if (text.match(hashTags)) {
		text = text.replace(hashTags, "<a href=\"javascript:;\">$1</a>"); // Replaces the hashtag matches with hash# anchor tags
	}

	return text.replace(/\n\r?/g, '<br />');

}


/**
 * @name parseAll
 * @typicalname parseAll
 * @param {string} text  - Input text
 * @return {string} parsed string
 *
 * @usage
 * var textParser = require('npm-text-parser')
 * var inputString = 'This is awesome it parses the url's , email's and hash tag's dude http://krishcdbry@gmail.com and email krishcdbry@gmail.com also #krishcdbry done !'
 *
 * textParser.parseAll(inputString)
 * // This is awesome it parses the url's , email's and hash tag's dude <a href="http://krishcdbry@gmail.com" target="_blank">http://krishcdbry@gmail.com</a>
 * // and email <a href="mailto:krishcdbry@gmail.com">krishcdbry@gmail.com</a> also <a href="javascript:;">#krishcdbry</a> done !
 *
 */
function parseAll (text) {

	var urls = url_regex; // Url regex
	var emails = email_regex; // Email regex
	var hashTags = hashtag_regex; // Hashtags regex

	text = text ? String(text).replace(/<[^>]+>/gm, '') : ''; // Remove all the html tags

	if (text.match(urls)) {
		text = text.replace(urls, "<a href=\"$1\" target=\"_blank\">$1</a>");
	}

	if (text.match(emails)) {
		text = text.replace(emails, "<a href=\"mailto:$1\">$1</a>");
	}

	if (text.match(hashTags)) {
		text = text.replace(hashTags, "<a href=\"javascript:;\" target=\"_blank\">$1</a>");
	}

	return text.replace(/\n\r?/g, '<br />');

}


/**
 * @name getUrls
 * @typicalname getUrls
 * @param {string} text  - Input text
 * @return {array} array
 *
 * @usage
 * var textParser = require('npm-text-parser')
 * var inputString = 'This is awesome http://krishcdbry.com and www.heartynote.com done !'
 *
 * textParser.getUrls(inputString)
 * // ['http://krishcdbry.com', 'www.heartynote.com']
 *
 */
function getUrls (data) {
	var urlArray = data.match(url_regex);
	return (urlArray) ? urlArray : [];
}

/**
 * @name getEmails
 * @typicalname getEmails
 * @param {string} text  - Input text
 * @return {array} array
 *
 * @usage
 * var textParser = require('npm-text-parser')
 * var inputString = 'This is awesome krishcdbry@gmail.com and heartynote@gmail.com done !'
 *
 * textParser.getEmails(inputString)
 * // ['krishcdbry@gmail.com', 'heartynote@gmail.com']
 *
 */
function getEmails (data) {
	var emailArray = data.match(email_regex);
	return (emailArray) ? emailArray : [];
}

/**
 * @name getHashtags
 * @typicalname getHashtags
 * @param {string} text  - Input text
 * @return {array} array
 *
 * @usage
 * var textParser = require('npm-text-parser')
 * var inputString = 'This is awesome #krishcdbry, #heartynote and #node done !'
 *
 * textParser.getHashtags(inputString)
 * // ['#krishcdbry', '#heartynote', '#node']
 *
 */
function getHashtags (data) {
	var hashtagArray = data.match(hashtag_regex);
	return (hashtagArray) ? hashtagArray : [];
}

/**
 * @name getAllOccurrences
 * @typicalname getAllOccurrences
 * @param {string} text  - Input text
 * @return {object} finalObject
 *
 * @usage
 * var textParser = require('npm-text-parser')
 * var inputString = 'This is awesome krishcdbry@gmail.com and also http://nmpjs.org, www.krishcdbry.com and #heartynote and #node done !'
 *
 * textParser.getAllOccurrences(inputString)
 * {
 * 		parsed_text: 'This is awesome <a href="mailto:krishcdbry@gmail.com">krishcdbry@gmail.com</a> and also <a href="http://nmpjs.org" target="_blank">http://nmpjs.org</a>, <a href="www.krishcdbry.com" target="_blank">www.krishcdbry.com</a> and<a href="javascript:;" target="_blank"> #heartynote</a> and<a href="javascript:;" target="_blank"> #node</a> done !',
 * 		urls: [ 'http://nmpjs.org', 'www.krishcdbry.com' ],
 * 		emails: [ 'krishcdbry@gmail.com' ],
 * 		hashtags: [ ' #heartynote', ' #node' ]
 * 	}
 *
 */
function getAllOccurrences (data) {
	var returnObj = {};

	returnObj['parsed_text'] = parseAll(data);
	returnObj['urls'] = getUrls(data);
	returnObj['emails'] = getEmails(data);
	returnObj['hashtags'] = getHashtags(data);

	return returnObj;
}
