const fse = require('fs-extra');
try {
	fse.copySync('node_modules/material-design-icons/iconfont', '../src/main/resources/static/vendor/material-design-icons/iconfont');
	fse.copySync('node_modules/bootstrap/dist', '../src/main/resources/static/vendor/bootstrap/dist');
	fse.copySync('node_modules/jquery/dist/jquery.min.js', '../src/main/resources/static/vendor/jquery/dist/jquery.min.js');
	fse.copySync('node_modules/popper.js/dist/umd/popper.min.js', '../src/main/resources/static/vendor/popper.js/dist/popper.min.js');
	fse.copySync('node_modules/vue/dist/', '../src/main/resources/static/vendor/vue/dist/');
	fse.copySync('node_modules/moment/min/moment-with-locales.min.js', '../src/main/resources/static/vendor/moment/min/moment-with-locales.min.js');
	fse.copySync('node_modules/pc-bootstrap4-datetimepicker/build', '../src/main/resources/static/vendor/pc-bootstrap4-datetimepicker/build');
	fse.copySync('node_modules/vue-bootstrap-datetimepicker/dist', '../src/main/resources/static/vendor/vue-bootstrap-datetimepicker/dist');

	console.log('copy bootstrap success!')
} catch (err) {
	console.error(err)
}
