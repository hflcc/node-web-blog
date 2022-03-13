const { exec } = require('../db/mysql');

const login = async (username, password) => {
	let sql = `select username,realname from users where username='${username}' and password='${password}'`;
	const res = await exec(sql);
	return !!(res && res[0]);
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
