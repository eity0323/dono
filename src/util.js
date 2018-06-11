
const fs = require('fs');

// 判断文件是否存在
function fsExistsSync(path) {
	try {
		fs.accessSync(path, fs.F_OK);
	} catch (e) {
		return false;
	}
	return true;
}


module.exports =  {
	fsExistsSync
}
