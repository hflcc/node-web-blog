const querystring = require('querystring');
const { handleBlogRouter } = require('./src/router/blog');
const { handleUserRouter } = require('./src/router/user');

// 处理post请求
const getPostData = (req) => {
	return new Promise((reolve, reject) => {
		try {
			if (req.method !== 'post') {
				reolve({});
				return;
			}
			if (req.headers['content-type'] !== 'application/json') {
				reolve({});
				return;
			}
			let chunkData = '';
			req.on('data', (chunk) => {
				chunkData += chunk.toString();
			});
			req.on('end', () => {
				if (!chunkData) {
					reolve({});
					return;
				}
				reolve(JSON.parse(chunkData));
			});
		} catch (err) {
			reject(err);
		}
	});
};

const serverHandler = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	const url = req.url;
	req.path = url.split('?')[0] || '';

	// 解析query参数
	req.query = querystring.parse(url.split('?')[1]);

	// 解析cookie
	req.cookie = {};
	const cookieStr = req.headers.cookie || '';
	cookieStr.split(';').forEach(item => {
		if (!item) return;
		const arr = item.split('=');
		const key = arr[0];
		req.cookie[key] = arr[1];
	});
	console.log(req.cookie, 'cookie');

	getPostData(req).then(async postData => {
		req.body = postData;

		// 命中用户信息路由
		const userInfo = await handleUserRouter(req, res);
		if (userInfo) {
			res.end(JSON.stringify(userInfo));
			return;
		}

		// 命中博客信息路由
		const blogInfo = await handleBlogRouter(req, res);
		if (blogInfo) {
			res.end(JSON.stringify(blogInfo));
			return;
		}

		// 没有命中任何路由时,返回404状态码
		res.writeHead(404, { 'Content-type': 'text/plain' });
		res.write('404 not found');
		res.end();
	});
};

module.exports = {
	serverHandler
};
