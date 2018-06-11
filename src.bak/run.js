
const path = require('path');
const webpack = require('webpack');
const {get} = require('./info');
const {fsExistsSync} = require('../src/util');
const start = require('./start');

const projectPath = get('project-path');

const dllConfig = require('../config/webpack.dll.config');
const devConfig = require('../config/webpack.dev.config');

const runWebpack = async (env) => {

	if(!get('has-dll')) {
		webpack(dllConfig, () => {
			let manifestPath = path.join(projectPath, './assets/common/javascript/vendor-manifest.json');
			let manifest = require(manifestPath);

			devConfig.plugins.push(new webpack.DllReferencePlugin({
				manifest: manifest
			}));

			devConfig.entry = get('js-entry');

			start(env, devConfig);
		});
	}

};

module.exports = runWebpack;

