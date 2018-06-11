

const path = require('path');
const webpackDevConfig = require('../config/webpack.dev.config');



module.exports = ($) => {
	let vendorScript = `<script src="${webpackDevConfig.output.publicPath}${path.join('common/javascript/vendor.dll.js')}"></script>`;

	$('script').eq(0).before(vendorScript);
};
