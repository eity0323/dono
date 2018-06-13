const fs = require('fs');
const path = require('path');
const { join } = require('path');
const { spawnSync, execSync } = require('child_process');
const color = require('colors');
const which = require('which');
const projectcwd = process.cwd();

const ignoreList = ['.git', '.gitignore', 'node_modules', '.DS_Store', '.idea'];

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


// 复制一个目录
function copyDir(src, dst) {
	try {
		let demoFiles = fs.readdirSync(src);

		demoFiles.map(file => {
			if (ignoreList.indexOf(file) < 0) {
				let fileDir = join(src, file);
				let tarDir = join(dst, file);
				let stat = fs.statSync(fileDir);

				if (stat.isFile()) {
					copyFile(fileDir, tarDir);
				} else if (stat.isDirectory()) {
					fs.mkdirSync(tarDir);
					copyDir(fileDir, tarDir);
				}
			}
		});
		return true;
	} catch (e) {
		console.log(color.red(`ERROR ${e}`));
		// rmDir(dst);
		return false;
	}
}

// 复制一个文件
function copyFile(src, dst) {
	try {
		let resdStream = fs.createReadStream(src);
		let writeStream = fs.createWriteStream(dst);

		resdStream.pipe(writeStream);
		// console.log(color.green(`${dst} copy success`));
	} catch (e) {
		console.log('copy Error', e);
	}
}



// 执行子进程命令
function execCommandSync(cmd, args) {
	const cmdDir = which.sync(cmd);

	console.log(cmdDir);

	try {
		let res = spawnSync(cmdDir, args, {
			stdio: 'inherit'
		});

		return res;
	}
	catch(e) {
		console.log(e);
	}

}

// 创建目录
function createDir(url) {
	try {
		let dir = path.dirname(url);

		if(!fsExistsSync(dir)) {
			createDir(dir);
		}
		fs.mkdirSync(url);

	} catch (err) {
		console.log(`error: ${err}`);
	}
}

function createFile(filepath, content) {
	try {
		fs.writeFileSync(filepath, content);
	}
	catch(e) {
		console.log(colors.red(`creat file ${filepath} failed`));
		console.log(e);
	}
}



exports.fsExistsSync = fsExistsSync;
exports.rmDir = rmDir;
exports.copyDir = copyDir;
exports.copyFile = copyFile;
exports.execCommandSync = execCommandSync;
exports.createDir = createDir;
exports.createFile = createFile;
