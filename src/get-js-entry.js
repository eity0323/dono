
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const projectPath = process.cwd();


module.exports = async function() {

	let result = {};
	let files = glob.sync(path.join(projectPath, './src/**/entry/*.js'));

	files.map((item, index) => {
		let target = path.relative(path.join(projectPath, './src'), item);

		target = target.replace('entry/','').replace(/.js$/, '');

		result[target] = item;
	});

	return result;
};
