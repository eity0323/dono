#!usr/bin/env node

const program = require('commander');
const initProject = require('../src/init/init-project');

program
	.usage('<projectname>')
	.parse(process.argv);


initProject(program.args[0]);

