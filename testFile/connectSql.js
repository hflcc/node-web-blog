const mysql = require('mysql');

const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '511358941',
	port: '3306',
	database: 'myblog'
});

con.connect();

const sql = 'select username,password,realname from users;';

con.query(sql, (err, result) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log(result, 'result');
});

con.end();
