# url-scraper
Url scraper which takes the text input and finds the links/urls, scraps them using cheerio and will returns an object with original text, parsed text (using npm-text-parser) and array of objects where each object contains scraped webpage's information.

## Installation

```bash
npm i url-scraper
```

## Usage
```javascript
var urlScraper = require('url-scraper');
```

## scrap(text)

Receives the input text and finds the links/url, scraps them and returns an object with original, parsed and array of scrapped websites info.
```javascript

  var inputString = "This is awesome it parses the url's dude and http://krishcdbry.com done !"
 	
  urlScraper
  		.scrap(inputString)
  		.then(function(response) {
    			console.log(response); // It returns the response object when promise gets resolved satisfies.
  		});	
  
  //{
  // original_text: 'This is awesome it scraps the sites dude and http://heartynote.com done !',
  // parsed_text: 'This is awesome it scraps the sites dude and <a href="http://heartynote.com" target="_blank">http://heartynote.com</a> done !',
  // scraped_data:
  //   [
  //     { domain: 'heartynote.com',
  //       title: 'heartynote welcomes u !!',
  //       description: 'Bring your life',
  //       thumb: 'http://heartynote.com/pngs/thums/hearty.png',
  //       canonical: 'http://krishcdbry.com',
  //       isValid: true,
  //        _links: {
  //			self : http://krishcdbry.com
  //		}
  //     }
  //   ]
  // }
```


## Demo
Demo @[url-scraper](https://tonicdev.com/npm/url-scraper)
| https://tonicdev.com/npm/url-scraper

## Author
Krishcdbry [krishcdbry@gmail.com]

## Licence
MIT @[krishcdbry](krishcdbry.com)
