#!usr/bin/env node

const program = require('commander');
const start = require('../src/dono-start');


program
	.option('-f, --force', '强制重新读取配置信息')
	.parse(process.argv);


const force = program.force;

start({
	force: force
});
