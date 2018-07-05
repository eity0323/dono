
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const projectPath = process.cwd();

const donoConfig = require('../dono.config');

module.exports = async function() {

	let result = {};
	let defaultJsEntry = donoConfig['js-entry'] || './src/**/entry/*.js';


	let files = glob.sync(path.join(projectPath, defaultJsEntry));

	files.map((item, index) => {
		let target = path.relative(path.join(projectPath, './src'), item);

		target = target.replace('entry/','').replace(/.js$/, '');

		result[target] = item;
	});

	return result;
};
