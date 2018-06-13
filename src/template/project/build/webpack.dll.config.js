const webpack = require('webpack');
const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
	entry: {
		'vendor': ['react', 'react-dom', 'redux', 'react-redux']
	},
	output: {
		path: path.join(__dirname, '../assets/common/javascript/'),
		filename: '[name].dll.js',
		library: '[name]_library'
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, '../assets/common/javascript', '[name]-manifest.json'),
			name: '[name]_library'
		}),
		new UglifyJsPlugin()
	]
};
