const querystring = require('querystring');

const serverHandler = (req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  const query = querystring.parse(url.split('?')[1]);

  res.setHeader('Content-Type', 'application/json');

  const resData = {
    method,
    url,
    path,
    query
  };

  if (method === 'GET') {
    res.end(JSON.stringify(resData));
  }

  if (method === 'POST') {
    let chunkData = '';
    req.on('data', chunk => {
      chunkData += chunk.toString();
    });
    req.on('end', () => {
      resData.postData = chunkData;
      res.end(JSON.stringify(resData));
    });
  }
};

module.exports = {
  serverHandler
};
