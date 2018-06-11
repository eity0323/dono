/*
*
* 此模块负责收集项目信息：
* 1、项目根目录信息
* 2、发布脚本信息
* 3、模板目录信息
* 4、入口js目录信息
*
* */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const color = require('colors');

const {set, get} = require('./info');


module.exports = async () => {
	const projectPath = process.cwd();
	const projectSrcPath = path.join(projectPath, 'src');

	// 设置项目根目录
	set('project-path', projectPath);

	// 拿到入口js路径
	let entryJsFiles = await asyncGlob(`${projectSrcPath}/**/entry/*.js`);
	set('entry-js-path', entryJsFiles);
	console.log(color.green('checked entry js.'));

	// 拿到模板入口路径
	let entryHtmlFiles = await asyncGlob(`${projectSrcPath}/**/page/*.html`);
	set('entry-html-path', entryHtmlFiles);
	console.log(color.green('checked entry html.'));

	// 拿到发布脚本路径
	try {
		fs.accessSync(path.join(projectPath, 'publish.sh'), fs.F_OK);

		set('publish-script-path', path.join(projectPath, 'publish.sh'));
	}
	catch(e) {
		console.log(color.blue('there is no publish script!'));
	}
};


function asyncGlob(path) {

	return new Promise((resolve, reject) => {
		glob(path, (err, files) => {
			if(err) {
				reject(err);
			}
			else {
				resolve(files);
			}
		});
	});

}
