import Koa from 'koa';
import logger from 'koa-logger';
import Router from 'koa-router';
import serve from 'koa-static';
import path from 'path';
import nunjucks from 'nunjucks';

const app = new Koa();
const router = new Router();
const renderOpts = { prod: process.env.NODE_ENV !== 'development' };

nunjucks.configure(path.resolve(__dirname, '../www'));

const cacheTime = 60 * 60;
const index = nunjucks.render('index.html', renderOpts);
const projects = nunjucks.render('projects.html', renderOpts);
const contact = nunjucks.render('contact.html', renderOpts);

router.get('/', ctx => ctx.body = index);
router.get('/projects', ctx => ctx.body = projects);
router.get('/contact', ctx => ctx.body = contact);

app.use(logger());
app.use(async (ctx, next) => { ctx.response.set('max-age', cacheTime); await next() });
app.use(serve(path.resolve(__dirname, '../www/assets'), { maxage: cacheTime * 1000 }));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080);
