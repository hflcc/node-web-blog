const http = require('http');
const { serverHandler } = require('../app');

const port = 8000;

// 这里的req, res其实都继承了Stream流-类, 通过流让网络IO更高效
const server = http.createServer((req, res) => {
	// 统一将method请求方法换成小写, 方便后续取值
	req.method = req.method.toLowerCase();
	return serverHandler(req, res);
});

server.listen(port);
