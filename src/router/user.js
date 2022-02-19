/**
 * Created by mac on 2022-02-16 23:35
 */
const handleUserRouter = (req, res) => {
	const method = req.method.toLowerCase();
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
