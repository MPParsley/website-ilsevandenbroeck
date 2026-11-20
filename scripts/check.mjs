import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { hasObsoleteWebsiteReference } from './website-references.mjs';
const root = path.resolve('_site');
const base = '/' + (process.env.PATH_PREFIX || '').replace(/^\/+|\/+$/g, '');
const prefix = base === '/' ? '' : base;
const origin = (process.env.SITE_URL || 'https://ilse-paardentandarts-diastema.mich-bv-4396.chatgpt.site').replace(/\/$/, '');
const publicBase = origin + prefix;
const migration = JSON.parse(await readFile('docs/migration.json', 'utf8'));
const redirects = JSON.parse(await readFile('src/_data/redirects.json', 'utf8'));
const languages = JSON.parse(await readFile('src/_data/languages.json', 'utf8'));
const files = [];
const indexed = new Map();
let articleDate;
async function walk(dir) {
  for (const file of await readdir(dir, { withFileTypes: true })) {
    const name = path.join(dir, file.name);
    if (file.isDirectory()) await walk(name);
    else files.push(name);
  }
}
function decode(text) {
  return text.replace(/&#(x[0-9a-f]+|\d+);/gi, (_, n) => String.fromCodePoint(n[0].toLowerCase() === 'x' ? parseInt(n.slice(1), 16) : +n))
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
}
function normalize(text) {
  return decode(text.replace(/<[^>]*>/g, ' ')).normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}
async function localTarget(raw, label) {
  const value = decode(raw);
  assert.ok(!hasObsoleteWebsiteReference(value, origin), label + ': no links to obsolete website');
  if (/^(https?:|mailto:|tel:|data:)/.test(value)) return;
  const [target, hash] = value.split('#');
  if (!target) return;
  assert.ok(target.startsWith(prefix + '/'), label + ': prefixed ' + value);
  const clean = decodeURIComponent(target.slice(prefix.length)).split('?')[0];
  let file = path.join(root, clean);
  assert.ok(file.startsWith(root + path.sep), label + ': link stays in output');
  let entry;
  try { entry = await stat(file); } catch { assert.fail(label + ': missing target ' + value); }
  if (entry.isDirectory()) file = path.join(file, 'index.html');
  const body = await readFile(file);
  if (hash && file.endsWith('.html')) assert.ok(body.toString().includes(`id="${hash}"`), label + ': missing anchor ' + value);
}
await walk(root);
for (const file of files) {
  const label = path.relative(root, file);
  if (/\.(?:html|xml|txt|css|svg)$/.test(file)) assert.ok(!hasObsoleteWebsiteReference(await readFile(file, 'utf8'), origin), label + ': no obsolete website references');
  if (!file.endsWith('.html')) continue;
  const html = await readFile(file, 'utf8');
  assert.match(html, /<html lang="(?:nl|fr)-BE">/, label + ': language');
  assert.match(html, /<title>[^<]+<\/title>/, label + ': title');
  for (const [, raw] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) await localTarget(raw, label);
  if (/http-equiv="refresh"/.test(html)) {
    assert.match(html, /name="robots" content="noindex, follow"/);
    assert.ok(html.includes('rel="canonical" href="' + publicBase + '/'), label + ': same-site redirect canonical');
    continue;
  }
  assert.equal((html.match(/<h1\b/g) || []).length, 1, label + ': one H1');
  assert.match(html, /<meta name="description" content="[^"]+">/, label + ': description');
  assert.match(html, /<main id="inhoud">/, label + ': skip-link target');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  for (const [, hash] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(hash), label + ': same-page anchor');
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@graph'].find(s => s['@type'] === 'VeterinaryCare').address.addressLocality, 'Andenne');
  if (!/name="robots" content="noindex, follow"/.test(html)) {
    assert.match(html, /name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/);
    assert.ok(!/noindex|nosnippet|data-nosnippet/.test(html), label + ': no indexing blockers');
    const urlPath = label === 'index.html' ? '/' : '/' + label.replace(/index\.html$/, '').replaceAll(path.sep, '/');
    const canonical = publicBase + urlPath;
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`), label + ': self canonical');
    indexed.set(urlPath, html);
    const language = html.match(/<html lang="([^"]+)"/)[1];
    const webPage = schema['@graph'].find(s => ['WebPage', 'ContactPage'].includes(s['@type']));
    assert.equal(webPage.inLanguage, language, label + ': schema language');
  }
  for (const [, tag] of html.matchAll(/(<img\b[^>]+>)/g)) {
    assert.match(tag, /\balt="[^"]+"/, label + ': image alt');
    assert.match(tag, /\bwidth="[1-9]\d*"/, label + ': image width');
    assert.match(tag, /\bheight="[1-9]\d*"/, label + ': image height');
    assert.ok(!/src="https?:/.test(tag), label + ': images are local');
  }
  if (label === path.join('afwijkingen', 'diastema', 'index.html') || label === path.join('fr', 'diasteme', 'index.html')) {
    const article = schema['@graph'].find(s => s['@type'] === 'Article');
    articleDate = article.dateModified;
    assert.equal(article.about.name, label.startsWith('fr') ? 'Diastème chez le cheval' : 'Diastema bij paarden');
    assert.ok(html.includes(`datetime="${article.dateModified}"`), 'Visible article update matches schema');
    assert.ok(!article.datePublished && !article.reviewedBy, 'No invented publication or review');
    for (const source of article.citation) assert.ok(html.includes(source), 'Sources are visible');
    const faq = schema['@graph'].find(s => s['@type'] === 'FAQPage');
    assert.ok(faq.mainEntity.length >= 5);
    for (const q of faq.mainEntity) {
      assert.ok(decode(html).includes(q.name));
      assert.ok(decode(html).includes(q.acceptedAnswer.text));
    }
  }
  assert.ok(!/google-analytics|googletagmanager|fonts.googleapis|<iframe/.test(html), label + ': no tracking embeds');
}
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => decode(m[1]));
assert.equal(new Set(urls).size, urls.length, 'No duplicate sitemap entries');
assert.equal(urls.length, indexed.size, 'All and only indexable pages in sitemap');
assert.equal(languages.length, 20, 'Twenty complete language pairs');
assert.equal(indexed.size, languages.length * 2, 'Every page has a complete Dutch and French version');
for (const [route] of indexed) assert.ok(urls.includes(publicBase + route), 'In sitemap: ' + route);
for (const record of migration.routes) {
  if (record.destination === '/rss.xml') continue;
  assert.ok(indexed.has(record.destination), 'Migrated source route: ' + record.sourcePath);
}
for (const redirect of redirects) {
  const html = await readFile(path.join(root, redirect.from, 'index.html'), 'utf8');
  assert.ok(html.includes(`0;url=${prefix}${redirect.to}`), 'Working legacy alias ' + redirect.from);
  assert.ok(indexed.has(redirect.to), 'Alias destination is a real page');
}
for (const record of migration.coverage) {
  if (record.strategy !== 'complete-body') continue;
  const text = normalize(indexed.get(record.destination));
  for (const block of record.blocks) assert.ok(text.includes(normalize(block)), record.sourcePath + ': complete original content: ' + block.slice(0, 100));
}
const allHTML = [...indexed.values()].join('\n');
assert.equal(migration.assets.length, 31, 'All 31 accessible editorial assets copied');
for (const asset of migration.assets) {
  await stat(path.join(root, asset.localPath));
  const displayedPath = asset.replacedBy ?? asset.localPath;
  assert.ok(allHTML.includes(prefix + displayedPath), 'Imported asset or its replacement is actually used: ' + displayedPath);
}
const fees = normalize(indexed.get('/tarieven/'));
for (const text of ['70', '20 65 per uur', 'Gebitsverzorging per paard 135', '1 5', '4 5', '135', '220', 'maximaal 10 meter', '3 uur', '1 ml detomidine']) assert.ok(fees.includes(text), 'Preserved preparation or fee detail ' + text);
assert.ok(!/15 (?:meter|m)\b/.test(fees), 'Only a maximum of ten metres on Dutch pricing page');
for (const route of ['/contact/', '/fr/contact/']) assert.ok(!indexed.get(route).includes('info@dierenartsilse.be'), route + ': alternative email removed');
const emergency = normalize(indexed.get('/urgences-spoedgevallen/'));
for (const text of ['30', '400', '3 maanden', '15 maanden']) assert.ok(emergency.includes(text), 'Preserved emergency detail ' + text);
for (const { nl, fr } of languages) {
  for (const route of [nl, fr]) for (const [lang, alternate] of [['nl-BE', nl], ['fr-BE', fr]]) {
    assert.ok(indexed.get(route).includes(`hreflang="${lang}" href="${publicBase}${alternate}"`), 'Reciprocal language links');
  }
  const nlPage = indexed.get(nl), frPage = indexed.get(fr);
  assert.match(frPage, /<html lang="fr-BE">/, fr + ': declared French');
  assert.match(nlPage, /<html lang="nl-BE">/, nl + ': Dutch retained');
  assert.ok(frPage.includes(`class="language-link" href="${prefix}${nl}" lang="nl">Nederlands</a>`), fr + ': switch to equivalent Dutch page');
  assert.ok(nlPage.includes(`class="language-link" href="${prefix}${fr}" lang="fr">Français</a>`), nl + ': switch to equivalent French page');
  const main = html => html.match(/<main id="inhoud">([\s\S]*?)<\/main>/)[1];
  const images = html => [...new Set([...main(html).matchAll(/<img[^>]*src="([^"]+)"/g)].map(m => m[1]))].sort();
  assert.deepEqual(images(frPage), images(nlPage), fr + ': all content images retained');
  const text = frPage.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ' ');
  assert.ok(!/\b(?:paarden|paard|gebitszorg|behandeling|Bijgewerkt|klinische|afbeelding|Lees|Bekijk|Neem|Tarieven|Spoedgevallen|tandvlees|wortelresten)\b/i.test(text), fr + ': no untranslated Dutch text');
  for (const [, href] of main(frPage).matchAll(/href="([^"]+)"/g)) {
    if (href.startsWith(prefix + '/') && !href.startsWith(prefix + '/assets/')) assert.ok(href.startsWith(prefix + '/fr/'), fr + ': navigation stays in French: ' + href);
  }
  assert.ok(sitemap.includes(`hreflang="fr-BE" href="${publicBase}${fr}"`), fr + ': multilingual XML sitemap');
}
const frenchFees = normalize(indexed.get('/fr/tarifs/'));
for (const detail of ['70', '20 65 par heure', 'Soin dentaire par cheval 135', '1 5', '4 5', '135', '220', '10 m maximum', '3 heures', '1 ml de détomidine']) assert.ok(frenchFees.includes(detail), 'French pricing and preparation: ' + detail);
assert.ok(!/15 (?:m|mètres)\b/.test(frenchFees), 'Only a maximum of ten metres on French pricing page');
const frenchEmergency = normalize(indexed.get('/fr/urgences/'));
for (const detail of ['30', '400', '3 mois', '15 mois']) assert.ok(frenchEmergency.includes(detail), 'French emergency conditions: ' + detail);
const clinicalDetails = {
  '/fr/soins-dentaires/': ['blocs nerveux', 'sédation', 'incisives', 'tartre', 'endodontie', 'échographie', 'transbuccales'],
  '/fr/dents-de-loup/': ['ligaments', 'sans forcer', 'quelques jours', 'incluse', 'racines'],
  '/fr/nivellement-dentaire/': ['couronne de réserve', 'contrôle visuel permanent', 'muserolle', 'au moins une fois par an'],
  '/fr/endoscopie/': ['90', 'infundibulum', 'fracturée', 'parodontite'],
  '/fr/cerclage/': ['6 ans', 'serrure', 'avulsion'],
  '/fr/coiffes/': ['trois premières', 'définitive', 'odeur'],
  '/fr/eotrh/': ['résorption', 'hypercémentose', 'carottes', 'betteraves', 'fistuleux', 'radiographie'],
  '/fr/caries-peripheriques/': ['cément', 'ligament', 'maïs', 'salive', 'fourrage'],
  '/fr/diasteme/': ['parodontite', 'boulettes', 'comblement', 'élargissement', 'contrôles']
};
for (const [route, details] of Object.entries(clinicalDetails)) for (const detail of details) assert.ok(normalize(indexed.get(route)).includes(normalize(detail)), route + ': preserved clinical detail ' + detail);
const frenchFeed = await readFile(path.join(root, 'fr/rss.xml'), 'utf8');
assert.ok(frenchFeed.includes('<language>fr-be</language>') && frenchFeed.includes(publicBase + '/fr/diasteme/'), 'French RSS feed');
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
assert.ok(robots.includes(`Sitemap: ${publicBase}/sitemap.xml`));
assert.ok(articleDate && sitemap.includes(`<lastmod>${articleDate}</lastmod>`));
for (const bot of ['Googlebot', 'bingbot', 'OAI-SearchBot', 'ChatGPT-User']) assert.ok(robots.includes(`User-agent: ${bot}\nAllow: /`));
await stat(path.join(root, '.nojekyll'));
assert.ok((await readFile(path.join(root, 'rss.xml'), 'utf8')).includes(publicBase + '/afwijkingen/diastema/'));
console.log(`OK: ${indexed.size} indexable pages, ${redirects.length + 1} redirects, 31 local imported images, original text coverage, bilingual prices, ${languages.length} reciprocal language pairs and no obsolete website URLs; prefix "${prefix || '/'}".`);
