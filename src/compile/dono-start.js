
const webpack = require('webpack');
const path = require('path');
const projectPath = process.cwd();
const {fsExistSync} = require('../util');
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

// 如果配置里有
if(donoConfig['dll-output-path']) {
	dllOutput = path.join(projectPath, donoConfig['dll-output-path'])
}

if(donoConfig['output-path']) {
	devOutput = path.join(projectPath, donoConfig['output-path']);
}

const manifestPath = path.join(dllOutput, 'vendor-manifest.json');

// 保存当前编译的hash值
let currentWatchHash = '';
// 保证html只写入一次
let initHtml = false;

module.exports = async ({env}) => {

	webpackDevConfig.entry = webpackProConfig.entry = await getJsEntry();

	webpackDllConfig.output.path = dllOutput;

	webpackDevConfig.output.path = webpackProConfig.output.path = devOutput;

	webpackDevConfig.output.publicPath = donoConfig['publicPath'];

	webpackProConfig.output.publicPath = donoConfig['production-publicPath']

	if(fsExistSync(manifestPath)) {
		handleDllPlugins(env, manifestPath);
	}
	else {
		await runDll(webpackDllConfig);
		handleDllPlugins(env, manifestPath);
	}

	let devCompiler = null;

	if(env === 'production') {
		devCompiler = webpack(webpackProConfig);
	}
	else {
		devCompiler = webpack(webpackDevConfig)
	}

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
