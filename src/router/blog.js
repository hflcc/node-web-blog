const handleBlogRouter = (req, res) => {
	const method = req.method.toLowerCase();
	const url = req.url;
	const path = url.split('?')[0];

	// 获取博客列表
	if (method === 'get' && path === '/api/blog/list') {
		return {
			msg: '这是获取博客列表接口'
		};
	}
	// 获取博客详情
	if (method === 'get' && path === '/api/blog/detail') {
		return {
			msg: '这是博客详情'
		};
	}
	// 获取博客列表
	if (method === 'get' && path === '/api/blog/list') {
		return {
			msg: '这是获取博客列表接口'
		};
	}
	// 新建博客
	if (method === 'post' && path === '/api/blog/new') {
		return {
			msg: '新建博客'
		};
	}
	// 更新博客
	if (method === 'post' && path === '/api/blog/update') {
		return {
			msg: '更新博客'
		};
	}
	// 删除博客
	if (method === 'post' && path === '/api/blog/del') {
		return {
			msg: '删除博客'
		};
	}
};

module.exports = {
	handleBlogRouter
};
