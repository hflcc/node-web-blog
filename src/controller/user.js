const { exec, escape } = require('../db/mysql');

const login = async (username, password) => {
	username = escape(username);
	password = escape(password);
	let sql = `select username,realname from users where username=${username} and password=${password}`;
	const res = await exec(sql);
	if (res[0]) {
		return {
			username: res[0].username,
			realname: res[0].realname
		};
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
