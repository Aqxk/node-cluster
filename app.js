const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
    Math.random() > 0.9 ? aaa() : 2;
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello Koa2</h1>'
})
if (!module.parent) {
    app.listen(3000);
    console.log('app started  at port 3000');
} else {
    module.exports = app;
}
