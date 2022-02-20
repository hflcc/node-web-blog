// 获取博客列表数据
const getBlogList = (author, keyword) => {
	return [
		{
			id: 1,
			author: 'zhangsan',
			createdTime: 1645285273542,
			content: '咱三出去吃饭'
		},
		{
			id: 2,
			author: '李四',
			createdTime: 1645285311390,
			content: '下午出去打球吗'
		},
	];
};

// 根据id获取博客详情
const getBlogDetail = (id) => {
	return {
		id,
		title: '博客标题',
		subtitle: '博客副标题',
		content: '博客内容体'
	};
};

// 根据post body中的请求体参数新建博客
const newBlog = (blogData = {}) => {
	return {
		id: 3,
		...blogData
	};
};

/**
 * @info 根据id更新博客
 * @param id {String} 博客标识id
 * @param blogData {Object} 需要更新的博客内容json
 * */
const updateBlog = (id, blogData = {}) => {
	return true;
};

/**
 * @info 根据id删除博客
 * @param id {String} 博客标识id
 * */
const delBlog = (id) => {
	return true;
};

module.exports = {
	getBlogList,
	getBlogDetail,
	newBlog,
	updateBlog,
	delBlog
};
