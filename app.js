const querystring = require('querystring');
const { createUuid } = require('./src/utils/tools');
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

// session数据 { [userId: string]: Object }
const SESSION_DATA = {};

// 获取cookie的过期时间
const getCookieExpires = () => {
	const d = new Date();
	// 一天的过期时间
	d.setTime(d.getTime() + 24 * 3600 * 1000);
	return d.toUTCString();
};

const serverHandler = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	const url = req.url;
	req.path = url.split('?')[0] || '';

	// 解析query参数 (主要处理get请求)
	req.query = querystring.parse(url.split('?')[1]);

	// 解析cookie start
	req.cookie = {};
	const cookieStr = req.headers?.cookie || '';
	cookieStr.split(';').forEach(item => {
		if (!item) return;
		const arr = item.split('=');
		const key = arr[0] && arr[0].trim(); // 防止cookie前面有空格导致取不到值
		req.cookie[key] = arr[1] && arr[1].trim(); // 防止cookie前面有空格导致取不到值
	});
	// 解析cookie end

	// 解析session start
	let needSetCookie = false;
	let userId = req.cookie.userid;
	if (userId) {
		if (!SESSION_DATA[userId]) {
			SESSION_DATA[userId] = {};
		}
	} else {
		needSetCookie = true;
		userId = `${Date.now()}_${createUuid()}`;
		SESSION_DATA[userId] = {};
	}
	req.session = SESSION_DATA[userId];
	// 解析session end

	// 因为post请求是用流接收,所以这里封装成promise
	getPostData(req).then(async postData => {
		req.body = postData;

		// 命中用户信息路由
		const userInfo = await handleUserRouter(req, res);
		if (userInfo) {
			if (needSetCookie) {
				// 设置cookie,并不能让客户端修改cookie
				res.setHeader('Set-cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
			}
			res.end(JSON.stringify(userInfo));
			return;
		}

		// 命中博客信息路由
		const blogInfo = await handleBlogRouter(req, res);
		if (blogInfo) {
			if (needSetCookie) {
				// 设置cookie,并不能让客户端修改cookie
				res.setHeader('Set-cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
			}
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
