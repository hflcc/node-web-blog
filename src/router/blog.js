const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getBlogList, getBlogDetail, newBlog, updateBlog} = require('../controller/blog');

const handleBlogRouter = (req, res) => {
	const method = req.method;
	const path = req.path;
	const query = req.query;
	const id = query.id || '';

	// 获取博客列表
	if (method === 'get' && path === '/api/blog/list') {
		const author = query.author || '';
		const keyword = query.keyword || '';
		const list = getBlogList(author, keyword);
		return new SuccessModel(list);
	}
	// 获取博客详情
	if (method === 'get' && path === '/api/blog/detail') {
		const data = getBlogDetail(id);
		return new SuccessModel(data);
	}
	// 新建博客
	if (method === 'post' && path === '/api/blog/new') {
		const data = newBlog(req.body);
		return new SuccessModel(data, '新建成功');
	}
	// 更新博客
	if (method === 'post' && path === '/api/blog/update') {
		const data = updateBlog(id, req.body);
		return new SuccessModel(data, '更新成功');
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
