/*
*
* 此模块负责存储项目信息
*
* */

const fs = require('fs');
const path = require('path');
const {fsExistsSync} = require('../src/util');
const projectBaseDir = process.cwd();

let writerTimer = null;
let localStore = null;


let store = localStore || {
	'project-path': projectBaseDir,
	'entry-js-path': [],
	'entry-html-path': [],
	'publish-script-path': '',
	'template-entry': {},
	'js-entry': {},
	'has-dll': false,
	'has-local-store': false
};

module.exports = {
	get: (name) => {
		if(name && (name in store)) {
			return store[name];
		}
		else if(name === undefined) {
			return store;
		}
		else {
			return null;
		}
	},
	set: (key, value) => {
		if(typeof key === 'object' && value === undefined) {
			Object.keys(key).map((item, index) => {
				store[item] = key[item];
			});
		}
		else {
			store[key] = value;
		}
		clearTimeout(writerTimer);
		writerTimer = setTimeout(() => {
			fs.writeFile(path.join(projectBaseDir, './store'), JSON.stringify(store, null, '\t'), (err) => {})
		}, 1);
	},
	initData: () => {
		let dllPath = path.join(projectBaseDir, './assets/common/javascript/vendor-manifest.json');

		if(fsExistsSync(dllPath)) {
			store['has-dll'] = true;
		}
		if(fsExistsSync(path.join(projectBaseDir, './store'))) {
			store['has-local-store'] = true;

			try {
				let content = fs.readFileSync(path.join(projectBaseDir, './store'), {encoding: 'utf-8'});
				store = JSON.parse(content);
			}
			catch(e) {
				console.log(e);
			}
		}
	}
};
