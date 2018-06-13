const path = require('path');


module.exports = {
	// 这里是入口js和包含它的html
	// key: 页面里引用的js
	// value: 对应的html地址
	template: {
		'candidate-list/index.js': path.join(__dirname, '../src/candidate-list/page/index.html')
	},
	// 这个是webpack的入口配置
	webpack: {
		'candidate-list/index': path.join(__dirname, '../src/candidate-list/entry/index.js')
	}
};



