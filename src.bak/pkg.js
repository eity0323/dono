const fs = require('fs');
const path = require('path');
const {get} = require('./info');

let pkg = {};

let projectPath = get('project-path');

try {
	let content = fs.readFileSync(path.join(projectPath, './package.json'), {
		encoding: 'utf-8'
	});

	pkg = JSON.parse(content);
}
catch(e) {
console.log(e);
}


module.exports = pkg;
