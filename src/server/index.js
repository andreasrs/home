import Koa from 'koa';
import logger from 'koa-logger';
import Router from 'koa-router';
import serve from 'koa-static';
import path from 'path';
import nunjucks from 'nunjucks';

const env = process.env.NODE_ENV;
const prod = env !== 'development';

const app = new Koa();
const router = new Router();
const content = {
  year: new Date().getFullYear().toString(),
};

const renderOpts = { prod, content };

nunjucks.configure(path.resolve(__dirname, "../www"), {
  noCache: !prod,
});

const cacheTime = prod ? 60 * 60 : 0;

router.get("/", (ctx) => {
  ctx.body = nunjucks.render("index.html", renderOpts);
});

router.get("/projects", (ctx) => {
  ctx.body = nunjucks.render("projects.html", renderOpts);
});

router.get("/contact", (ctx) => {
  ctx.body = nunjucks.render("contact.html", renderOpts);
});

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
app.use(serve(path.resolve(__dirname, "../www/assets"), { maxage: cacheTime * 1000 }));
app.use(
  serve(path.resolve(__dirname, "../www/gfx"), { maxage: cacheTime * 1000 })
);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080);
