const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const color = require('colors');

// 开发版本的配置文件
const webpackDevConfig = require('./webpack.dev.config');
// 上线版本的配置文件
const webpackProdConfig = require('./webapck.pro.config');

const cheerio = require('cheerio');


// 公用的需要合并进body的文本
const commonTpl = require('./template');


const entryConfig = require('./entry.config');
// 配置入口js和对应的html地址
const htmlConfig = entryConfig.template;

// 此处判断使用哪个版本的配置文件
let webpackConfig = webpackDevConfig;
if(process.env.NODE_ENV === 'prod') {
	webpackConfig = webpackProdConfig;
}

// 编译
const compiler = webpack(webpackConfig);


// 这里通过全局变量判断执行生产环境的webpack配置还是开发环境的webpack配置
if(process.env.NODE_ENV === 'prod') {
	compiler.run(handleCallback);
}
else {
	compiler.watch({
		"aggregateTimeout": 300,
		"poll": undefined,
		"progress": true,
		"info-verbosity": "verbose"
	}, handleCallback);
}

// 保存当前编译的hash值
let currentWatchHash = '';
// 保证html只写入一次
let initHtml = false;

// 无论生产环境还是开发环境，都会执行这个
function handleCallback(err, stat) {

	let error = false;
	if(err) {
		console.error(err.info);
		error = true;
	}
	if(stat.compilation.errors.length > 0) {
		console.error(stat.compilation.errors.join('\n'));
		error = true;
	}

	if(error === false) {
		console.log(color.green('Compile Done.'));
	}

	if(initHtml === true) {
		return;
	}
	initHtml = true;

	// 这里的判断是根据webpack的编译hash值，判断是否重复编译
	if(currentWatchHash !== stat.compilation.hash) {

		currentWatchHash = stat.compilation.hash;

		// 遍历html的地址
		Object.keys(htmlConfig).map((key) => {

			// 拿到当前遍历的模板的入口js全路径
			// 通过输出路径拼合
			let targetDir = path.dirname(path.join(webpackConfig.output.path, key));
			// 拿到当前遍历的模板的全路径
			let sourceHtmlPath = htmlConfig[key];

			try {
				// 读取html内容
				let htmlContent = fs.readFileSync(sourceHtmlPath, {encoding: 'utf-8'}).toString();
				let $ = cheerio.load(htmlContent);
				// 读取目录下的所有文件
				// 此处读取的是编译后的文件目录
				// 从目录中分别读取js和css文件，
				// 插入到html里，替换到原来的src和href
				let targetFileList = fs.readdirSync(targetDir);

				targetFileList.map((subfile) => {
					let extname = path.extname(subfile);

					// 找到目录下的js文件
					if (extname === '.js') {
						// 根据publicPath 拼接输出路径
						let jsSrc = webpackConfig.output.publicPath + '/' + path.join(path.dirname(key), subfile);
						// 拿到页面里的所有script标签，对应入口文件的script换成目录下的js文件名
						$('script').map((index, ele) => {
							let currentScript = $(ele);
							if(currentScript.attr('src') === key) {
								$(ele).attr('src', jsSrc);
							}
						})
					}
					else if (extname === '.css') {
						let cssPath = path.join(webpackConfig.output.publicPath || '/', path.dirname(key), subfile);
						$('head').append(`<link rel="stylesheet" type="text/css" href="${cssPath}" />`);
					}
				});

				// 此处合并通用的模版等
				mergeTpl($);
				// 将文件写入到
				fs.writeFileSync(path.join(targetDir, path.basename(sourceHtmlPath)), $.html());

				console.log(color.green(`Html compiled.`));
			}
			catch (e) {
				if (e) {
					console.error(e.toString());
				}
			}
		});
	}
}


// 此处函数
function mergeTpl($) {
	let vendorScript = `${commonTpl}<script src="${webpackConfig.output.publicPath}/${path.join('common/javascript/vendor.dll.js')}"></script>`;

	$('script').eq(0).before(vendorScript);
}
