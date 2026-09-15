const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'i.postimg.cc',
  port: 443,
  path: '/wMwZLbCK/image.png',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://postimages.org/'
  }
};

const req = https.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  const file = fs.createWriteStream('./public/assets/uploaded_bottle.png');
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Done writing file. Size:', fs.statSync('./public/assets/uploaded_bottle.png').size);
  });
});

req.on('error', (e) => {
  console.error('Error:', e);
});

req.end();
