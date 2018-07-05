

const path = require('path');
const fs = require('fs');

const {copyDirSync, copyFileSync} = require('../util');

const pagePath = process.cwd();

const sourcePath = path.join(__dirname, '../template/component-page');

module.exports = (cname) => {

	let targetPath = path.join(pagePath, cname);

	fs.access(targetPath, fs.constants.W_OK, (err, stat) => {
		if(err) {
			try {
				fs.mkdirSync(targetPath);
			}
			catch(e) {
				console.error(e);
			}

		}
		copyDirSync(sourcePath, targetPath);
	});

};
