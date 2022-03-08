const { exec } = require('../db/mysql');

const login = (username, password) => {
	if (username === 'zhangsan' && password === '123') {
		return true;
	}
	return false;
};

// 获取用户信息
const getUserInfo = (id) => {
	let sql = 'select username,state,realname,id from users where 1=1 ';
	if (id) {
		sql += `and id='${id}'`;
	}
	return exec(sql);
};


module.exports = {
	login,
	getUserInfo
};
