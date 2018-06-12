#!usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const start = require('../src/compile/dono-start');
const {rmDir, fsExistsSync} = require('../src/util');

const donoConfig = require('../src/dono.config');

const projectPath = process.cwd();

const outputPath = path.join(projectPath, donoConfig['output-path']);

try {
	if(fsExistsSync(outputPath)) {
		rmDir(outputPath)
	}
}
catch(e) {
	console.error(e);
}


program
	.parse(process.argv);



start({
	env: 'production'
});
