#!usr/bin/env node

const program = require('commander');
const initProject = require('../src/init/init-project');

const fs = require('fs');
const path = require('path');
const {fsExistSync} = require('../src/util');
const projectPath = process.cwd();

const donorcTpl = require('../src/template/donorc.json');

if(!fsExistSync(path.join(projectPath, './.donorc'))) {
	try {
		fs.writeFileSync(path.join(projectPath, './.donorc'), JSON.stringify(donorcTpl, null, '\t'));
	}
	catch(e) {

	}
}

program
	.usage('<projectname>')
	.parse(process.argv);


initProject(program.args[0]);

