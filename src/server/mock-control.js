

const path = require('path');
const fs = require('fs');
const donoConfig = require('../dono.config');
const projectPath = process.cwd();
const mime = require('mime');
const mockConfig = require(path.join(projectPath, donoConfig['mock-config']));


function processMockValue(v) {
	let type = typeof v;
	let result = {};

	if(type === 'object' && v !== null) {
		result['type'] = mime.getType('json');
		result['body'] = JSON.stringify(v);
	}
	else if(type === 'function') {
		let fnResult = v();
		result = processMockValue(fnResult);
	}
	else if(type === 'string') {
		let mockFileDir = path.join(projectPath, v);

		try {
			let mockJson = fs.readFileSync(mockFileDir, {encoding: 'utf-8'}).toString();

			result = processMockValue(JSON.parse(mockJson));
		}
		catch(e) {
			result['type'] = mime.getType['txt'];
			result['body'] = v;
		}
	}

	return result;
}

module.exports = (url) => {

	if(mockConfig[url]) {
		return processMockValue(mockConfig[url]);
	}
	else {
		return false;
	}

};
