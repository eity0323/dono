
const webpack = require('webpack');
const path = require('path');
const projectPath = process.cwd();
// 工具库
const {fsExistSync} = require('../util');
// 项目配置文件
const donoConfig = require('../dono.config');
const color = require('colors');

// 处理html的模块
const processHtml = require('./process-html');
// 获取js入口文件的模块
const getJsEntry = require('./get-js-entry');

// 引入默认的webpack配置
const webpackDevConfig = require('../../config/webpack.dev.config');
const webpackDllConfig = require('../../config/webpack.dll.config');
const webpackProConfig = require('../../config/webapck.pro.config');


// 默认输出路径为项目目录下的 assets文件夹
let dllOutput = path.join(projectPath, './assets/common/javascript/');
let devOutput = path.join(projectPath, './assets');

// 设置dll的输出路径
if(donoConfig['dll-output-path']) {
	dllOutput = path.join(projectPath, donoConfig['dll-output-path'])
}

// 输出路径
if(donoConfig['output-path']) {
	devOutput = path.join(projectPath, donoConfig['output-path']);
}

const manifestPath = path.join(dllOutput, 'vendor-manifest.json');

// 保存当前编译的hash值
let currentWatchHash = '';
// 保证html只写入一次
let initHtml = false;

module.exports = async ({env}) => {

	// 设置webpack的js入口路径
	webpackDevConfig.entry = webpackProConfig.entry = await getJsEntry();

	// 设置dll的webpack的输出路径
	webpackDllConfig.output.path = dllOutput;

	// 设置项目的输出路径
	webpackDevConfig.output.path = webpackProConfig.output.path = devOutput;

	// 设置开发环境的静态资源域名或者前缀
	webpackDevConfig.output.publicPath = donoConfig['publicPath'];

	// 设置生产环境的静态资源的域名
	webpackProConfig.output.publicPath = donoConfig['production-publicPath']

	// 根据是否有manifest文件来判断是否执行过dll优化
	if(fsExistSync(manifestPath)) {
		handleDllPlugins(env, manifestPath);
	}
	else {
		await runDll(webpackDllConfig);
		handleDllPlugins(env, manifestPath);
	}

	let devCompiler = null;

	// 检查环境，如果是production则运行生产环境配置
	if(env === 'production') {
		devCompiler = webpack(webpackProConfig);
	}
	else {
		devCompiler = webpack(webpackDevConfig)
	}

	// 检查环境，运行编译器，开发环境默认watch
	if(env === 'production') {
		devCompiler.run(handleCompile);
	}
	else {
		devCompiler.watch({
			"aggregateTimeout": 300,
			"poll": undefined,
			"progress": true,
			"info-verbosity": "verbose"
		}, handleCompile);
	}
};

// 添加dll插件
function handleDllPlugins(env, manifestPath) {
	let dllPluginsIns = new webpack.DllReferencePlugin({
		manifest: require(manifestPath)
	});
	if(env === 'production') {
		webpackProConfig.plugins.push(dllPluginsIns);
	}
	else {
		webpackDevConfig.plugins.push(dllPluginsIns);
	}
}

// 处理webpack运行的回调函数
// 包括错误输出等功能
function handleCompile(err, stat) {
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
	if(currentWatchHash !== stat.compilation.hash) {
		currentWatchHash = stat.compilation.hash;
		processHtml();
	}
}

// 运行dll的函数
async function runDll(config) {
	return new Promise((resolve, reject) => {
		webpack(config, (err, stat) => {
			if(err) {
				reject();
			}
			else {
				resolve();
			}
		});
	});
}
