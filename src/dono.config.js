const fs = require('fs');
const path = require('path');
const projectPath = process.cwd();



let result = {};


try {
	let content = fs.readFileSync(path.join(projectPath, './.donorc'), {
		encoding: 'utf-8'
	});

	result = JSON.parse(content);
}
catch(e) {
	console.error(e);
}

module.exports = result;
