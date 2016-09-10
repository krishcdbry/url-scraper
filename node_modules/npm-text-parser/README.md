# npm-text-parser
Text parser which receives text data as input and replaces the urls with clickable links (anchor tags), emails as clickable mail:to tags and also replaces hash tags (#tag) empty clickable anchor tag.

## Installation

```bash
npm i npm-text-parser
```

## Usage
```javascript
var parseText = require('npm-text-parser');
```

## parseUrl(text)

Receives the input text and replaces all the url matches with clickable anchor links 
```javascript

  var inputString = "This is awesome it parses the url's dude and http://krishcdbry.com done !"
  
  parseText.parseUrl(inputString);
  // This is awesome it parses the url's dude and <a href="http://krishcdbry.com" 
  // target="_blank">http://krishcdbry.com</a> done !
```

## parseEmail(text)

Receives the input text and replaces all the email matches with clickable mail:to anchor links  
```javascript
  
  var inputString = "This is awesome it parses the email's dude and krishcdbry@gmail.com done !"
  
  parseText.parseEmail(inputString);
  // This is awesome it parses the email's dude and  
  // <a href="mailto:krishcdbry@gmail.com">krishcdbry@gmail.com</a> done !
 
```

## parseHash(text)
Receives the input text and replaces all the hashtag matches with clickable empty anchor links
```javascript
  
  var inputString = "This is awesome it parses the hash tag's dude and #krishcdbry done !"
  
  parseText.parseHashtags(inputString);
   // This is awesome it parses the hash tag's dude and <a href="javascript:;">#krishcdbry</a> done !
 
```

## parse(text)
  Receives the input text and replaces the urls with clickable links (anchor tags),
  emails as clickable mail:to tags and also replaces hash tags (#tag) with empty clickable anchor tags
```javascript

  var inputString = "his is awesome it parses the url's , email's and hash tag's dude http://krishcdbry@gmail.com and email krishcdbry@gmail.com also #krishcdbry done !"
 
  parseText.parse(inputString)
  // This is awesome it parses the url's , email's and hash tag's dude 
  // <a href="http://krishcdbry@gmail.com" target="_blank">http://krishcdbry@gmail.com</a>
  // and email <a href="mailto:krishcdbry@gmail.com">krishcdbry@gmail.com</a> 
  // also <a href="javascript:;">#krishcdbry</a> done !
 
 
```

## getUrls(text) 
 (Array of url occurrences) - Receives the input text, reads all the Urls in it and returns  
 and array of all url occurrences 
```javascript

  var inputString = 'This is awesome http://krishcdbry.com and www.heartynote.com done !'
 
  textParser.getUrls(inputString)
  // ['http://krishcdbry.com', 'www.heartynote.com']
 
```


## getEmails(text) 
  (Array of email occurrences) - Receives the input text, reads all the emails in it and returns  
  and array of all email occurrences 

```javascript
  var inputString = 'This is awesome krishcdbry@gmail.com and heartynote@gmail.com done !'
 
  textParser.getEmails(inputString)
  // ['krishcdbry@gmail.com', 'heartynote@gmail.com']
```
			
			
## getHashtags(text) 
 (Array of hashtags occurrences) - Receives the input text, reads all the hashtagss in it and returns  
 and array of all hashtags occurrences 

```javascript
  var inputString = 'This is awesome #krishcdbry, #heartynote and #node done !'
 
  textParser.getHashtags(inputString)
  // ['#krishcdbry', '#heartynote', '#node']
```

## getAll(text) 
All occurrences includes (Urls, emails and hashtags)

```javascript

  var inputString = 'This is awesome krishcdbry@gmail.com and also http://nmpjs.org, www.krishcdbry.com and #heartynote and #node done !'
 
  textParser.getAllOccurrences(inputString)
  //	{
  //		parsed_text: 'This is awesome <a href="mailto:krishcdbry@gmail.com">krishcdbry@gmail.com</a> and also <a href="http://nmpjs.org" target="_blank">http://nmpjs.org</a>, <a href="www.krishcdbry.com" target="_blank">www.krishcdbry.com</a> and<a href="javascript:;" target="_blank"> #heartynote</a> and<a href="javascript:;" target="_blank"> #node</a> done !',
  //		urls: [ 'http://nmpjs.org', 'www.krishcdbry.com' ],
  //		emails: [ 'krishcdbry@gmail.com' ],
  //		hashtags: [ ' #heartynote', ' #node' ]
  //	}
 
```

## Demo
Demo @[npm-text-parser](https://tonicdev.com/npm/npm-text-parser)
| https://tonicdev.com/npm/npm-text-parser

## Author
Krishcdbry [krishcdbry@gmail.com]

## Licence
MIT @[krishcdbry](krishcdbry.com)
