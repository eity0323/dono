const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const manifest = require('../assets/common/javascript/vendor-manifest.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const entryConfig = require('./entry.config');

let theme = require('../src/common/style/theme');

let webpackConfig = {
	entry: entryConfig.webpack,
	output: {
		filename: '[name]_[hash:8].js',
		path: path.join(__dirname, '../assets'),
		publicPath: "http://www.lgstatic.com:9000"
	},
	devtool: false,
	watch: false,
	module: {
		rules: [{
			test: /\.(jsx|js)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env', 'react'],
					plugins: [
						['import', {
							"libraryName": "antd",
							"style": true
						}],
						'transform-object-rest-spread',
						'transform-class-properties'
					]
				}
			}
		}, {
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						modules: true,
						localIdentName: '[local]'
					}
				}, {
					loader: 'less-loader',
					options: {
						sourceMap: true,
						modifyVars: theme,
						javascriptEnabled: true
					}
				}]
			}),
		}, {
			test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
			use: [{
				loader: "url-loader",
				options: {
					limit: 5120,
					fallback: 'file-loader',
					name: '[path][name].[ext]',
					context: 'src/',
					publicPath: '/'
				}
			}]
		}]
	},
	plugins: [
		new ExtractTextPlugin('[name]_[hash:8].css'),
		new webpack.DllReferencePlugin({
			manifest: manifest
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new UglifyJsPlugin()
	]
};

module.exports = webpackConfig;
