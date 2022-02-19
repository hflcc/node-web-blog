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

module.exports = {
	getBlogList
};
