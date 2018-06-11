const fs = require('fs');
const path = require('path');

const getHtmlEntry = require('./get-html-entry');
const getEntryJs = require('./get-js-entry');
const cheerio = require('cheerio');
const projectPath = process.cwd();
const mergeTpl = require('./mergeTpl');

const webpackDevConfig = require('../config/webpack.dev.config');


module.exports = async () => {

	let entryHtml = await getHtmlEntry();

	Object.keys(entryHtml).map((key, index) => {

		let targetDir = path.join(webpackDevConfig.output.path, path.dirname(key));

		let htmlPath = entryHtml[key];

		try {
			let content = fs.readFileSync(htmlPath, {
				encoding: 'utf-8'
			});

			let $ = cheerio.load(content);

			fs.readdirSync(targetDir).map((item, index) => {
				let extname = path.extname(item);

				if(extname === '.js') {
					$('script').map((index, ele) => {
						if($(ele).attr('src') === key) {
							let jsSrc = path.join(webpackDevConfig.output.publicPath, path.dirname(key), item);
							$(ele).attr('src', jsSrc);
						}
					})
				}
				else if (extname === '.css') {
					let cssPath = path.join(webpackDevConfig.output.publicPath, path.dirname(key), item);
					$('head').append(`<link rel="stylesheet" type="text/css" href="${cssPath}" />`);
				}
			});

			mergeTpl($);
			fs.writeFileSync(path.join(targetDir, path.basename(htmlPath)), $.html());
		}
		catch(e) {
			console.log(e);
		}
	});
};
