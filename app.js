const querystring = require('querystring');
const { handleBlogRouter } = require('./src/router/blog');
const { handleUserRouter } = require('./src/router/user');

const serverHandler = (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	const url = req.url;
	req.path = url.split('?')[0] || '';

	// 命中用户信息路由
	const userInfo = handleUserRouter(req, res);
	if (userInfo) {
		res.end(JSON.stringify(userInfo));
		return;
	}

	// 命中博客信息路由
	const blogInfo = handleBlogRouter(req, res);
	if (blogInfo) {
		res.end(JSON.stringify(blogInfo));
		return;
	}

	res.writeHead(404, { 'Content-type': 'text/plain' });
	res.write('404 not found');
	res.end();
};

module.exports = {
	serverHandler
};
