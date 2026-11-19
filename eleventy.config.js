export default function (config) {
  config.addPassthroughCopy({ 'src/assets': 'assets' });
  config.addPassthroughCopy('src/CNAME');
  config.addPassthroughCopy({ 'src/.nojekyll': '.nojekyll' });
  const prefix = '/' + (process.env.PATH_PREFIX || '').replace(/^\/+|\/+$/g, '');
  config.addFilter('local', value => prefix.replace(/\/$/, '') + '/' + String(value).replace(/^\//, ''));
  config.addFilter('absolute', function(value) {
    return this.ctx.site.url + prefix.replace(/\/$/, '') + '/' + String(value).replace(/^\//, '');
  });
  config.addFilter('json', value => JSON.stringify(value).replace(/</g, '\\u003c'));
  config.addFilter('year', () => new Date().getUTCFullYear());
  config.addFilter('readableDate', (date, locale = 'nl-BE') => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date)));
  config.addFilter('isoDate', date => new Date(date).toISOString().slice(0, 10));
  config.addCollection('pages', api => api.getFilteredByTag('page').filter(p => !p.data.noindex));
  return { dir: { input: 'src', output: '_site' }, markdownTemplateEngine: 'njk', htmlTemplateEngine: 'njk' };
}
