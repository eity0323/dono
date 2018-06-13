#!usr/bin/env node

const program = require('commander');
const initProject = require('../src/init/init-project');

let projectName = 'demo-project';
let runaction = false;

program
	.arguments('<name>')
	.action((name) => {
		runaction = true;
		initProject(name)
	})
	.parse(process.argv);

if(runaction === false) {
	initProject(projectName)
}
