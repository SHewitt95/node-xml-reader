const https = require('https');
const parseString = require('xml2js').parseString;

var req = https.get('https://www.themiamihurricane.com/section/edge/feed/', (res) => {

  //console.log('statusCode: ', res.statusCode);
  //console.log('headers: ', res.headers);
  var data = '';

  res.on('data', (d) => {

    data += d;

  });

  res.on('end', (d) => {
    //console.log(typeof result);

    parseString(data, function (err, result) {
      console.log(result.rss.channel[0].item);
    });

  })

});
