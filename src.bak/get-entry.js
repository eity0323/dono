

/*
*
* 获取js和html的入口配置
* {
*   'home/index': 'user/xxxx/xxx/home/entry/index.js'
* }
*
* {
*   'home/index.js': 'user/xx/xxx/home/page/index.html'
* }
*
* */
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
const {get, set} = require('./info');
const {fsExistsSync} = require('../src/util');

let jsEntry = {};
let htmlEntry = {};


module.exports = async () => {

	let projectPath = get('project-path');
	let projectSrcPath = path.join(get('project-path'), 'src');
	let entryJs = get('entry-js-path');
	let entryHtml = get('entry-html-path');
	let customEntryPath = path.join(projectPath, './entry.config.js');

	// 如果项目根目录有用户自定义入口文件
	if(fsExistsSync(customEntryPath)) {
		let customEntryConfig = require(customEntryPath);
		jsEntry = customEntryConfig.jsEntry;
		htmlEntry = customEntryConfig.htmlEntry;
	}
	else {
		entryJs.map((item) => {
			let pageJsPath = path.relative(projectSrcPath, item);
			let outputConfig = pageJsPath.replace('entry/', '');

			outputConfig = outputConfig.replace(/.js$/, '');

			jsEntry[outputConfig] = item;
		});

		entryHtml.map((item) => {
			try {
				let content = fs.readFileSync(item, {
					encoding: 'utf-8'
				});
				let $ = cheerio.load(content);

				$('script').map((i, el) => {
					let jsSrc = $(el).attr('src');
					// 此处只是判断模版里的的js路径是否在入口js路径里
					// 如果是，则判定此路径为该html的入口js路径
					// 此判断不严谨
					if(jsSrc.replace('.js', '') in jsEntry) {
						htmlEntry[jsSrc] = item;
					}
				});
			}
			catch(e) {
				throw e;
			}
		});
	}

	set({
		templateEntry: htmlEntry,
		jsEntry: jsEntry
	});
};

