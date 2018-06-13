const Koa = require('koa');

const app = new Koa();

const control = require('./control');
const router = require('./router');
const tpl = require('./render');
const statics = require('./static');

app.use(tpl());

app.use(statics());

app.use(router(control));

console.log('Open http://127.0.0.1:9000');

app.listen(9000);


