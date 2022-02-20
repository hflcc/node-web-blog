const { SuccessModel, ErrorModel } = require('../model/resModel');


const handleUserRouter = (req, res) => {
	const method = req.method;
	const path = req.path;

	if (method === 'get' && path === '/api/blog/user') {
		return {
			msg: '这是获取用户信息接口'
		};
	}

	if (method === 'post' && path === '/api/blog/login') {
		return {
			msg: '这是博客登录接口'
		};
	}
};

module.exports = {
	handleUserRouter
};
