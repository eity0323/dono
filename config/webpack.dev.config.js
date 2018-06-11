const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const projectPath = process.cwd();
const donoConfig = require('../src/dono.config');
const {fsExistsSync} = require('../src/util');


const publicPath = '';


const themePath = path.join(projectPath, donoConfig['less-theme']);

let theme = {};


if(fsExistsSync(themePath)) {
	theme = require(themePath);
}

let webpackConfig = {
	entry:{},
	output: {
		filename: '[name].js',
		path: path.join(projectPath, '../assets'),
		publicPath: publicPath
	},
	devtool: false,
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
					limit: 1024,
					fallback: 'file-loader',
					name: '[path][name].[ext]',
					context: 'src/',
					publicPath: '/'
				}
			}]
		}]
	},
	plugins: [
		new ExtractTextPlugin('[name].css')
	]
};

module.exports = webpackConfig;
