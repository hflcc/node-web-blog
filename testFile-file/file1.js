const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, './data.txt');
const file1 = path.resolve(__dirname, './data-bak.txt');
// 读取文件
/*fs.readFile(file, (err, data) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log(data.toString());
});*/
// 读取文件,并将文件写到另外一个文件中
const readStream = fs.createReadStream(file);
const writeStream = fs.createWriteStream(file1);
readStream.pipe(writeStream);
readStream.on('end', () => {
	console.log('传输完成');
});

// 写入文件
// const content = '这是新写入的内容\n';
// const opt = {
// 	flag: 'a'
// };
// fs.writeFile(file, content, opt, (err) => {
// 	if (err) {
// 		console.log(err);
// 	}
// });

// 判断文件存不存在
// fs.exists(file, (exists) => {
// 	console.log('exists', exists);
// });




