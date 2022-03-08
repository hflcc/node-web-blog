const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login, getUserInfo } = require('../controller/user');


const handleUserRouter = async (req, res) => {
	const method = req.method;
	const path = req.path;
	const query = req.query;

	if (method === 'get' && path === '/api/blog/user') {
		const id = query.id;
		if (!id) return new ErrorModel([], '查询id不能为空');
		const res = await getUserInfo(id);
		if (res) {
			const obj = res[0] || {};
			return new SuccessModel(obj, '查询成功');
		}
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
