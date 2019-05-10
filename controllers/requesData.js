const https = require('https');

const getPrice = (url, done) =>
  https.get(url, res => {
    res.setEncoding('utf8');
    let body = '';
    res.on('data', data => {
      body += data;
    });
    res.on('end', () => {
      done(body);
    });
  });

module.exports.getPrice = getPrice;
