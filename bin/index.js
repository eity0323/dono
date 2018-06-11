#!/usr/bin/env node

const program = require('commander');

program
	.version('0.0.1')
	.command('start', '启动开发服务器')
	.parse(process.argv);
