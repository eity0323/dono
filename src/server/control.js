const fs = require('fs');
const path = require('path');


const donoConfig = require('../dono.config');

const mockControl = require('./mock-control');

const projectPath = process.cwd();
const serverPath = donoConfig['server-root'];

const assetsDir = path.join(projectPath, serverPath);

module.exports = (router) => {

	router.get('/', async (ctx, next) => {
		try {
			let fileList = fs.readdirSync(assetsDir);

			let aList = fileList.map((url) => {
				if (url[0] !== '.') {
					return `<p><a href="${url}">${url}</a></p>`
				}
			});

			await ctx.render(aList.join(' '));
		}
		catch(e) {
			e && console.error(e);
		}
	});


	router.all('*', async (ctx, next) => {

		let url = ctx.request.url;

		if(mockControl(url)) {
			ctx.type = mockControl(url).type;
			ctx.body = mockControl(url).body;
		}
		else {
			try {
				let reqDir = path.join(assetsDir, url);

				let isDirectory = fs.statSync(reqDir).isDirectory();

				if (isDirectory) {

					let list = fs.readdirSync(reqDir);

					list = list.map((suburl) => {
						if (suburl[0] !== '.') {
							return `<p><a href="${url}/${suburl}">${suburl}</a></p>`
						}
					});

					await ctx.render(list.join(' '));
				}
				else {
					await next();
				}
			}
			catch(e) {
				e && console.error(e);
			}
		}
	});

};
