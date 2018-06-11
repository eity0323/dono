const fs = require('fs');
const path = require('path');

const projectPath = process.cwd();

const pakPath = path.join(projectPath, './package.json');


let pkg = {};



try {
	let pkgContent = fs.readFileSync(pakPath, {
		encoding: 'utf-8'
	});

	pkg = JSON.parse(pkgContent);
}
catch(e) {
	console.log(e.toString());
}

module.exports = pkg;
