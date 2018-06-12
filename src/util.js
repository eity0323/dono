
const fs = require('fs');
const {join} = require('path');

// 判断文件是否存在
function fsExistsSync(path) {
	try {
		fs.accessSync(path, fs.F_OK);
	} catch (e) {
		return false;
	}
	return true;
}

// 删除一个目录
function rmDir(dir) {

	let dirList = fs.readdirSync(dir);

	try {
		if (dirList.length === 0) {
			fs.rmdirSync(dir);
		} else {
			dirList.map(filedir => {

				let stats = fs.statSync(join(dir, filedir));

				if (stats.isFile()) {
					fs.unlinkSync(join(dir, filedir));
				} else if (stats.isDirectory()) {
					rmDir(join(dir, filedir));
				}
			});

			fs.rmdirSync(dir);
		}
	}
	catch(e) {
		console.error(`rmDir Error: ${e}`);
	}
}


module.exports =  {
	fsExistsSync,
	rmDir
}
