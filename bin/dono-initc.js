#!usr/bin/env node

const program = require('commander');
const initComponent = require('../src/init/init-component');

program
	.usage('<projectname>')
	.parse(process.argv);


initComponent(program.args[0]);

