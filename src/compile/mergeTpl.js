

const path = require('path');
const webpackDevConfig = require('../../config/webpack.dev.config');


// 此处合并通用的html模版，$符号是当前页面的cheerio对象
module.exports = ($) => {
	let vendorScript = `<script src="${webpackDevConfig.output.publicPath}${path.join('common/javascript/vendor.dll.js')}"></script>`;

	$('script').eq(0).before(vendorScript);
};
