const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getBlogList, getBlogDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');

const handleBlogRouter = async (req, res) => {
	const method = req.method;
	const path = req.path;
	const query = req.query;
	const id = query.id || '';

	// 获取博客列表
	if (method === 'get' && path === '/api/blog/list') {
		const author = query.author || '';
		const keyword = query.keyword || '';
		const list = await getBlogList(author, keyword);
		return new SuccessModel(list);
	}
	// 获取博客详情
	if (method === 'get' && path === '/api/blog/detail') {
		if (!id) return new ErrorModel({}, '微博ID不能为空');
		const data = await getBlogDetail(id);
		if (data) {
			return new SuccessModel(data, '查询成功');
		}
	}
	// 新建博客
	if (method === 'post' && path === '/api/blog/new') {
		req.body.author = '王麻子';
		const data = await newBlog(req.body);
		if(data) {
			return new SuccessModel({ id: data.insertId }, '新增博客成功');
		}
	}
	// 更新博客
	if (method === 'post' && path === '/api/blog/update') {
		const res = updateBlog(id, req.body);
		if (res) {
			return new SuccessModel(res, '更新成功');
		}
		return new ErrorModel(false, '更新失败');
	}
	// 删除博客
	if (method === 'post' && path === '/api/blog/del') {
		const data = delBlog(id);
		return new SuccessModel(data, '删除成功');
	}
};

module.exports = {
	handleBlogRouter
};
