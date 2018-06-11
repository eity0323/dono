
const webpack = require('webpack');
const path = require('path');
const projectPath = process.cwd();
const {fsExistsSync} = require('./util');
const donoConfig = require('./dono.config');
const color = require('colors');

const processHtml = require('./process-html');

const webpackDevConfig = require('../config/webpack.dev.config');
const webpackDllConfig = require('../config/webpack.dll.config');

const getJsEntry = require('./get-js-entry');

let dllOutput = path.join(projectPath, './assets/common/javascript/');
let devOutput = path.join(projectPath, './assets');

if(donoConfig['dll-output-path']) {
	dllOutput = path.join(projectPath, dllOutput)
}

if(donoConfig['output-path']) {
	devOutput = path.join(projectPath, devOutput);
}

const manifestPath = path.join(dllOutput, 'vendor-manifest.json');

// 保存当前编译的hash值
let currentWatchHash = '';
// 保证html只写入一次
let initHtml = false;

module.exports = async ({force}) => {

	webpackDevConfig.entry = await getJsEntry();
	webpackDllConfig.output.path = dllOutput;
	webpackDevConfig.output.path = devOutput;
	webpackDevConfig.output.publicPath = donoConfig['publicPath'];

	if(fsExistsSync(manifestPath)) {
		webpackDevConfig.plugins.push(
			new webpack.DllReferencePlugin({
				manifest: require(manifestPath)
			}),
		);
	}
	else {
		await runDll(webpackDllConfig);
		webpackDevConfig.plugins.push(
			new webpack.DllReferencePlugin({
				manifest: require(manifestPath)
			}),
		);
	}

	let devCompiler = webpack(webpackDevConfig);

	devCompiler.watch({
		"aggregateTimeout": 300,
		"poll": undefined,
		"progress": true,
		"info-verbosity": "verbose"
	}, (err, stat) => {
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
	});
};

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
