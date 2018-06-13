const fs = require('fs');


module.exports = () => {

	return async (ctx, next) => {

		if(!ctx.app.context.render) {
			ctx.app.context.render = (content) => {
				ctx.type = 'text/html;charset=utf-8';
				ctx.status = 200;
				ctx.body = content;
			};

			ctx.app.context.renderFile = (filePath) => {
				try {
					let content = fs.readFileSync(filePath, {encoding: 'utf8'}).toString();

					ctx.type = 'text/html;charset=utf-8';
					ctx.status = 200;
					ctx.body = content;
				}
				catch (e) {
					e && console.error(e);
				}
			};
		}

		await next();
	}

};
