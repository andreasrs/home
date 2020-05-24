import Koa from 'koa';
import logger from 'koa-logger';
import Router from 'koa-router';
import serve from 'koa-static';
import path from 'path';
import nunjucks from 'nunjucks';

const env = global.NODE_ENV;
const app = new Koa();
const router = new Router();
const content = {
  year: new Date().getFullYear().toString(),
};

const renderOpts = { prod: process.env.NODE_ENV !== 'development', content };

nunjucks.configure(path.resolve(__dirname, '../www'));

const cacheTime = 60 * 60;
const index = nunjucks.render('index.html', renderOpts);
const projects = nunjucks.render('projects.html', renderOpts);
const contact = nunjucks.render('contact.html', renderOpts);

router.get('/', (ctx) => { ctx.body = index; });
router.get('/projects', (ctx) => { ctx.body = projects; });
router.get('/contact', (ctx) => { ctx.body = contact; });

app.use(logger());
app.use(async (ctx, next) => {
  if (env === 'production') {
    ctx.response.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    ctx.response.set('Content-Security-Policy', 'default-src \'self\'; script-src \'self\' \'unsafe-inline\' https://www.google-analytics.com; font-src \'self\' https://fonts.gstatic.com; style-src \'self\' https://cdnjs.cloudflare.com https://fonts.googleapis.com; img-src \'self\' https://www.google-analytics.com');
    ctx.response.set('X-Frame-Options', 'SAMEORIGIN');
    ctx.response.set('X-Content-Type-Options', 'nosniff');
    ctx.response.set('Referrer-Policy', 'strict-origin');
    ctx.response.set('Feature-Policy', 'microphone \'none\'; camera \'none\'');
  }
  await next();
});
app.use(async (ctx, next) => { ctx.response.set('max-age', cacheTime); await next(); });
app.use(serve(path.resolve(__dirname, '../www/assets'), { maxage: cacheTime * 1000 }));
app.use(serve(path.resolve(__dirname, '../www/gfx'), { maxage: cacheTime * 1000 }));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080);
