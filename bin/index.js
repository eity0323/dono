#!/usr/bin/env node

const program = require('commander');

const fs = require('fs');
const path = require('path');
const {fsExistsSync} = require('../src/util');
const projectPath = process.cwd();

const donorcTpl = require('../src/template/donorc.json');


if(!fsExistsSync(path.join(projectPath, './.donorc'))) {
	try {
		fs.writeFileSync(path.join(projectPath, './.donorc'), JSON.stringify(donorcTpl, null, '\t'));
	}
	catch(e) {

	}
}

program
	.version('0.0.1')
	.command('start', '启动编译工具监听')
	.command('server', '启动前端服务器')
	.command('build', '启动生产环境编译')
	.command('init', '初始化项目目录')
	.parse(process.argv);
