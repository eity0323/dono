

const path = require('path');
const fs = require('fs');
const {spawnSync} = require('child_process');
const {
	copyDirSync
} = require('../util');

const projectPath = process.cwd();
const templateProjectPath = path.join(__dirname, '../template/project');

module.exports = (name) => {



	try {
		copyDirSync(templateProjectPath, projectPath);
	}
	catch(e) {
		console.log(e);
	}

};
