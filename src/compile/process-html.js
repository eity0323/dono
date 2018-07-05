const fs = require('fs');
const path = require('path');

// 获取入口html文件
const getHtmlEntry = require('./get-html-entry');
const cheerio = require('cheerio');
// 合并通用的模版
const mergeTpl = require('./mergeTpl');

const donoConfig = require('../dono.config');


module.exports = async () => {

	let entryHtml = await getHtmlEntry();

	Object.keys(entryHtml).map((key, index) => {

		// 拼接本页面的输出目录
		let targetDir = path.join(donoConfig['output-path'], path.dirname(key));

		// 源html路径
		let htmlPath = entryHtml[key];

		try {
			// 读取html文件内容
			let content = fs.readFileSync(htmlPath, {
				encoding: 'utf-8'
			});

			// 通过cheerio解析html
			let $ = cheerio.load(content);


			// 读取输出的目录，目的在于读取到输出出来的js和css文件名
			fs.readdirSync(targetDir).map((item, index) => {
				let extname = path.extname(item);

				// 根据扩展名进行相应处理，
				if(extname === '.js') {
					$('script').map((index, ele) => {
						if($(ele).attr('src') === key) {
							let jsSrc = path.join(donoConfig['publicPath'], path.dirname(key), item);
							$(ele).attr('src', jsSrc);
						}
					})
				}
				else if (extname === '.css') {
					let cssPath = path.join(donoConfig['publicPath'], path.dirname(key), item);
					$('head').append(`<link rel="stylesheet" type="text/css" href="${cssPath}" />`);
				}
			});

			mergeTpl($);
			// 将文件写入目标目录
			fs.writeFileSync(path.join(targetDir, path.basename(htmlPath)), $.html());
		}
		catch(e) {
			console.log(e);
		}
	});
};
