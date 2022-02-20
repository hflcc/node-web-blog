const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login } = require('../controller/user');


const handleUserRouter = (req, res) => {
	const method = req.method;
	const path = req.path;

	if (method === 'get' && path === '/api/blog/user') {
		return {
			msg: '这是获取用户信息接口'
		};
	}

	if (method === 'post' && path === '/api/blog/login') {
		const { username, password } = req.body;
		const res = login(username, password);
		if (res) {
			return new SuccessModel(true, '登录成功');
		}
		return new ErrorModel(false, '账号或密码错误');
	}
};

module.exports = {
	handleUserRouter
};
