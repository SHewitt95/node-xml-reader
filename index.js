const https = require('https');
const parseString = require('xml2js').parseString;

function getXML(url) {

  var req = https.get(url, (res) => {

    var data = '';

    res.on('data', (d) => {
      data += d;
    });

    res.on('end', (d) => {
      parseString(data, (err, result) => {
        //console.log(result.rss.channel[0].item);
        makeCardInfo(result.rss.channel[0].item);
      });
    })

  });

}

function makeCardInfo(xml) {

  var elements = [];
  var singleCard = {};



  for (var i = 0; i < 5; i++) {
    singleCard = makeSingleCard(xml[i]);
    elements.push(singleCard);
  }

}

function makeSingleCard(info) {
  var singleCard = {}
  var buttons = [];
  var button = {};

  singleCard.title = info.title[0];
  singleCard.subtitle = info.description[0];

  button = {type: 'web_url', url: info.link[0], title: 'Read'};
  buttons.push(button);
  button = {type: 'web_url', url: 'https://www.themiamihurricane.com/', title: 'Visit Website'};
  buttons.push(button);

  singleCard.buttons = buttons;

  return singleCard;
}

function processInput(input) {

  var inputLower = input[0].toLowerCase();
  var url = '';

  switch (inputLower) {

    case 'news':
      url = 'https://www.themiamihurricane.com/section/' + inputLower + '/feed/';
      getXML(url);
      break;
    case 'opinion':
      url = 'https://www.themiamihurricane.com/section/' + inputLower + '/feed/';
      getXML(url);
      break;
    case 'edge':
      url = 'https://www.themiamihurricane.com/section/' + inputLower + '/feed/';
      getXML(url);
      break;
    case 'sports':
      url = 'https://www.themiamihurricane.com/section/' + inputLower + '/feed/';
      getXML(url);
      break;
    default:
      console.log(inputLower);
      break;

  }

}

function main() {

  var args = process.argv.slice(2);
  processInput(args);

}

main();
