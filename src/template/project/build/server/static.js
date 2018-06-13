const path = require('path');
const fs = require('fs');
const mime = require('mime');


const assetsDir = path.join(__dirname, '../../assets');
const fileExt = ['.html', '.js', '.css', '.png', '.jpg', '.gif'];



module.exports = (options) => {

	return async (ctx, next) => {

		let url = ctx.request.url;

		let extname = path.extname(url);

		if(fileExt.indexOf(extname) >= 0) {
			let type = mime.getType(extname);
			let filePath = path.join(assetsDir, url);

			let content = '';

			try {
				content = await readFile(filePath);
			}
			catch(e) {
				console.error(e);
			}

			ctx.type = type;
			ctx.body = content;
		}
		else {
			await next();
		}
	};

};

function readFile(...args) {
	return new Promise((resolve, reject) => {

		fs.readFile(...args, (err, data) => {
			if(err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		})

	});
}
