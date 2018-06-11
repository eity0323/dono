const webpack = require('webpack');
const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const projectPath = process.cwd();


module.exports = {
	entry: {
		'vendor': ['react', 'react-dom', 'redux', 'react-redux']
	},
	output: {
		path: path.join(projectPath, './assets/common/javascript/'),
		filename: '[name].dll.js',
		library: '[name]_library'
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(projectPath, './assets/common/javascript', '[name]-manifest.json'),
			name: '[name]_library'
		}),
		new UglifyJsPlugin()
	]
};
