import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { hasObsoleteWebsiteReference } from './website-references.mjs';
const base = (process.env.SITE_URL || 'https://ilse-paardentandarts-diastema.mich-bv-4396.chatgpt.site').replace(/\/$/, '');
const prefix = (process.env.PATH_PREFIX || '').replace(/\/$/, '');
const origin = base + prefix;
function get(path, agent) {
  const args = ['--silent', '--show-error', '--max-time', '30', '--dump-header', '-', '--user-agent', agent, origin + path];
  const result = spawnSync('curl', args, { encoding: 'utf8', maxBuffer: 1024 * 1024 });
  assert.equal(result.status, 0, 'HTTP client success');
  // The proxy can prepend its own CONNECT headers. Keep the final HTTP response.
  const blocks = result.stdout.split(/\r?\n\r?\n/);
  let headers = blocks.shift();
  while (/^HTTP\//.test(blocks[0] || '')) headers = blocks.shift();
  assert.match(headers, /^HTTP\/\S+ 200\b/, agent + ' ' + path + ': HTTP 200');
  assert.ok(!/^x-robots-tag:.*(noindex|none|nosnippet)/im.test(headers), 'No blocking header');
  const body = blocks.join('\n\n');
  console.log(`HTTP 200: ${agent} ${path}`);
  return body;
}
const robots = get('/robots.txt', 'IlseSiteAudit/1.0');
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
for (const bot of ['Googlebot', 'bingbot', 'OAI-SearchBot', 'ChatGPT-User']) assert.ok(robots.includes(`User-agent: ${bot}\nAllow: /`));
const sitemap = get('/sitemap.xml', 'IlseSiteAudit/1.0');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const languages = JSON.parse(readFileSync('src/_data/languages.json', 'utf8'));
assert.equal(urls.length, languages.length * 2, 'All bilingual pages are public');
for (const url of urls) {
  assert.ok(url.startsWith(origin + '/'));
  const html = get(url.slice(origin.length), 'IlseSiteAudit/1.0');
  assert.ok(html.includes(`rel="canonical" href="${url}"`), 'Self canonical');
  assert.ok(!/noindex|nosnippet|data-nosnippet/.test(html), 'No HTML indexing blockers');
  assert.match(html, /<h1\b/);
  assert.ok(!hasObsoleteWebsiteReference(html, base), 'No obsolete website URLs');
  assert.match(html, /application\/ld\+json/);
  const route = url.slice(origin.length);
  const pair = languages.find(p => p.nl === route || p.fr === route);
  assert.ok(pair, 'Public route has language pair');
  const alternate = pair.fr === route ? pair.nl : pair.fr;
  assert.ok(html.includes(`class="language-link" href="${prefix}${alternate}"`), 'Switch points to equivalent page');
  if (route.startsWith('/fr/')) assert.match(html, /<html lang="fr-BE">/);
}
for (const bot of ['Googlebot', 'bingbot', 'OAI-SearchBot', 'ChatGPT-User']) {
  const html = get('/afwijkingen/diastema/', bot);
  assert.ok(html.includes('Diastema bij paarden, kort uitgelegd'), 'Full content without login or JS challenge');
  assert.ok(html.includes('id="veelgestelde-vragen"'), 'FAQ content is present');
  const french = get('/fr/diasteme/', bot);
  assert.ok(french.includes('Le diastème chez le cheval, en bref') && french.includes('id="questions-frequentes"'), 'Complete French content and FAQ accessible');
}
const migration = JSON.parse(readFileSync('docs/migration.json', 'utf8'));
for (const asset of migration.assets) get(asset.localPath, 'IlseSiteAudit/1.0');
console.log('Live access checks passed. This verifies HTTP access, not actual search indexing or crawler visits.');
