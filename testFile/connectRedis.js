const redis = require('redis');

// 自执行函数面前最好加个分号,可能会由于运行时,如果上面require后面也没有加分号,会忽略其中的空格,导致找不到require函数方法报错
(async () => {
	const client = redis.createClient();

	client.on('error', (err) => console.log('Redis Client Error', err));

	await client.connect();

	await client.set('age', '29');
	const value = await client.get('age');
	console.log('val', value);
})();
