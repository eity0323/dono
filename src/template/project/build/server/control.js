const fs = require('fs');
const path = require('path');
const mime = require('mime');
const mockConfig = require('./config');

const assetsDir = path.join(__dirname, '../../assets');

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

		if(mockConfig[url]) {
			let type = typeof mockConfig[url];

			ctx.type = mime.getType('json');
			if(type === 'object') {
				ctx.body = JSON.stringify(mockConfig[url]);
			}
			else if(type === 'function') {
				ctx.body = mockConfig[url]();
			}
			else if(type === 'string') {
				ctx.body = mockConfig[url];
			}
		}
		else {
			try {

				let isDirectory = fs.statSync(path.join(assetsDir, url)).isDirectory();

				if (isDirectory) {
					let list = fs.readdirSync(path.join(assetsDir, url));

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
