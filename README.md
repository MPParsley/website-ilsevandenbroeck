# Paardentandarts Ilse Van Den Broeck

Publieke vervangingswebsite voor de praktijk in **Rue Chênu 5, 5300 Andenne, België**.

**Live:** https://ilse-paardentandarts-diastema.mich-bv-4396.chatgpt.site

De site gebruikt Markdown en Eleventy. Teksten, praktijkfoto’s, tarieven, voorbereiding, betaalvoorwaarden en spoedinformatie zijn overgenomen. De site is volledig tweetalig: 19 Nederlandse pagina’s en 19 Franse tegenhangers, inclusief alle twaalf behandelingsonderwerpen. De taalschakelaar opent dezelfde pagina in de andere taal. Zie [het migratieverslag](docs/migration.md) voor de inventaris en uitzonderingen.

## Lokaal bewerken

Node.js 24 wordt aanbevolen (22 of nieuwer wordt door de site ondersteund):

```sh
npm ci
npm run dev
```

Open de URL die Eleventy toont, normaal `http://localhost:8080`. De bestanden in `src/` zijn de bron. `npm run build` maakt een schone statische website in `_site/`.

## Waar staat welke informatie?

| Bestand of map | Inhoud |
| --- | --- |
| `src/index.md` | Homepage |
| `src/gebitszorg.md` | Volledig behandelaanbod en praktijkbeelden |
| `src/afwijkingen/diastema.md` | Uitgebreide informatie over diastema en FAQ |
| `src/wolfstanden.md`, `src/raspen.md`, `src/doppen.md` | Gebitsproblemen en behandeling |
| `src/afwijkingen/` | Ook EOTRH, perifere cariës, haken en scherpe emailpunten |
| `src/endoscopie.md`, `src/digitale-radiografie.md` | Diagnostiek |
| `src/tandextracties.md`, `src/cerclage.md` | Behandelingen |
| `src/tarieven.md` | Prijzen, voorbereiding en betalen |
| `src/urgences-spoedgevallen.md` | Spoedzorg, prijzen en patiëntenvoorwaarden |
| `src/contact.md` | Adres, contactgegevens en route |
| `src/fr/` | Volledige Franse vertaling van alle pagina’s, inclusief behandelingen, FAQ en contact |
| `src/_data/languages.json` | Negentien vaste koppelingen tussen Nederlandse en Franse pagina’s |
| `src/_data/site.js` | Centrale contactgegevens en navigatie |
| `src/_data/redirects.json` | Verwijzingen van eerdere paginapaden naar de huidige pagina’s |
| `src/assets/praktijk/` | Lokaal opgeslagen praktijkbeelden, logo en de nieuwe homepagefoto |
| `src/_includes/` | Gedeelde HTML-opmaak en beeldengalerij |
| `src/assets/style.css` | Vormgeving en mobiele weergave |

Bovenaan Markdown-bestanden staat YAML tussen `---`. `title` is de paginatitel, `description` de omschrijving voor zoekresultaten, `heading` de zichtbare hoofdtitel en `intro` de introductie. Zet tekst met een dubbele punt tussen aanhalingstekens. De tekst daaronder is Markdown.

Interne links gebruiken `[Contact]({{ '/contact/' | local }})`. Zo werken dezelfde bronnen ook op GitHub Pages onder een repositorypad. Alle afbeeldingen staan lokaal. E-mailadressen blijven `mailto:`-links; er zijn geen websitelinks, bronverwijzingen, canonicals of afbeeldingsverzoeken naar het vorige domein.

De FAQ staat één keer in de YAML van de diastemapagina. De zichtbare vragen en de JSON-LD worden daaruit opgebouwd. `lastUpdated` wordt alleen bij een inhoudelijke wijziging handmatig aangepast, niet bij elke build. De zichtbare datum, structured data en sitemap gebruiken dezelfde waarde.

Werk bij elke inhoudelijke wijziging de Nederlandse en Franse pagina samen bij. Alle behandelingen, contactinformatie, tarieven en FAQ hebben een eigen Markdown-bron in beide talen. `docs/migration.json` bevat controlegegevens van de inhoudelijke overname. Werk dit controlebestand bewust mee bij wanneer de praktijk originele inhoud aanpast; zo blijft de volledigheidscontrole zinvol.

## GitHub Actions en Pages

1. Maak een GitHub-repository en zet de **inhoud van deze map**, inclusief `.github`, in de hoofdmap van de `main`-branch.
2. Kies **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Push naar `main`, of start **Actions → Build and deploy GitHub Pages → Run workflow**.
4. De workflow voert `npm ci` en de controles uit, test ook een repositorypad en publiceert `_site` met `actions/deploy-pages`.

Pull requests worden gecontroleerd maar niet gepubliceerd. De workflow leidt automatisch de GitHub Pages-URL af. Er zijn geen persoonlijke toegangstokens nodig. Pas `branches: [main]` aan wanneer de standaardbranch anders heet.

Voor een eigen domein configureer je **Settings → Pages → Custom domain** en de DNS volgens [de GitHub-documentatie](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site). Voeg `src/CNAME` met het nieuwe domein toe. De workflow gebruikt dit voor de juiste canonical- en sitemap-URL’s.

De repositoryvariabele `SITE_URL` kan de volledige publicatiebasis overschrijven, inclusief een eventueel repositorypad. Bij een handmatige build zijn oorsprong en pad afzonderlijk:

```sh
SITE_URL=https://voorbeeld.github.io PATH_PREFIX=/paardentandarts npm test
```

De GitHub Pages-workflow is klaar, maar er is nog geen GitHub-repository gekoppeld.

## Hosting via Sites

De site is publiek. `.openai/hosting.json` bewaart de bestaande Sites-identiteit; maak bij wijzigingen geen nieuwe Site aan en behoud de publieke toegang.

```sh
npm run build:sites
npm run check
```

Dit bouwt `_site` en kopieert de publiceerbare bestanden naar `dist/`. Zonder omgevingsvariabelen wordt de huidige publieke Sites-URL gebruikt. Voor een ander werkelijk gekoppeld domein stel je `SITE_URL` in op de oorsprong van dat domein. Dezelfde bronnen blijven geschikt voor GitHub Pages.

Een nieuw opgeslagen broncommit en het bijbehorende statische archief moeten via de Sites-tools als versie worden opgeslagen en gepubliceerd. Lokaal bouwen alleen wijzigt de live website niet.

## Zoekmachines en AI-zoekdiensten

De site levert volledige HTML zonder browser-JavaScript. Ingebouwd: semantische pagina’s, inhoudsopgaven, interne links naar alle behandelingen, zichtbare FAQ, zelfverwijzende canonicals, sitemap, RSS, Open Graph, lokale afbeeldingen met alt-tekst en afmetingen, VeterinaryCare-, WebSite-, WebPage-, Article- en BreadcrumbList-JSON-LD en wederzijdse Nederlandse/Franse `hreflang`-links op alle pagina’s en in de XML-sitemap, en aparte RSS-feeds per taal.

`robots.txt` laat crawlers toe, inclusief expliciet Googlebot, bingbot, OAI-SearchBot en ChatGPT-User. OAI-SearchBot heeft betrekking op ChatGPT Search; modeltraining is een afzonderlijk onderwerp. Er zijn geen ranking- of indexeringsgaranties, geen verzonnen beoordelingen en geen fictieve medische reviewers toegevoegd.

Google Search Console en Bing Webmaster Tools zijn nog niet gekoppeld. De eigenaar moet eigendom verifiëren en de sitemap indienen:

- [Google Search Console](https://search.google.com/search-console/)
- [Bing Webmaster Tools](https://www.bing.com/webmasters/)

Gebruik een URL-prefix-property voor de publieke Sites-URL en dien `sitemap.xml` in. Een verificatiebestand of metatag kan worden toegevoegd zodra de eigenaar die code aanlevert. Houd externe praktijkvermeldingen consequent op Andenne. Er zijn geen ongevraagde profielen aangemaakt of berichten verstuurd.

Relevante technische documentatie:

- [OpenAI-crawlers](https://developers.openai.com/api/docs/bots)
- [Google: AI-functies en je website](https://developers.google.com/search/docs/appearance/ai-features)

## Verificatie

```sh
npm test           # Schone build en controles
npm run check:live # Publieke HTTP-controles op de live site
```

De bouwcontrole onderzoekt alle lokale links en ankers, metadata, talen, canonical-URL’s, afbeeldingen, JSON-LD, FAQ, sitemap, RSS, oude paginapaden, overgenomen tekstblokken en belangrijke tariefvoorwaarden. Alle 31 geïmporteerde beelden moeten beschikbaar blijven. De site toont het oorspronkelijke beeld of de vervanger in `docs/migration.json`. Een regressiecontrole voorkomt dat websitelinks naar het vorige domein terugkomen.

De live controle haalt alle indexeerbare pagina’s en alle geïmporteerde beelden zonder login op. Ook worden verzoeken met namen van zoekcrawlers gedaan. Een nagebootste useragent bewijst niet dat de echte crawler vanaf zijn eigen netwerk is langsgekomen; indexering en zoekposities worden hiermee niet vastgesteld.

De eerdere browserpreview was niet beschikbaar. Visuele browsercontrole en Lighthouse zijn geen onderdeel van de gemelde technische testresultaten tenzij afzonderlijk geverifieerd.

## Volledig tweetalig

Sinds 18 november 2026 is iedere inhoudspagina beschikbaar in het Nederlands én Frans. De Nederlandse paden zijn behouden; de Franse versie gebruikt beschrijvende paden onder `/fr/`. `src/_data/languages.json` koppelt de 19 paren. Iedere pagina heeft een eigen canonical en wederzijdse `hreflang`-links; de taalschakelaar opent de overeenkomstige pagina, niet alleen de andere homepage. Behandelingsmenu’s, knoppen, afbeeldingsbeschrijvingen, FAQ, datumnotatie en structured data volgen de gekozen taal.

De foutpagina heeft eveneens een Franse tegenhanger. `/rss.xml` bevat de Nederlandse pagina’s, `/fr/rss.xml` de Franse. De sitemap bevat alle 38 indexeerbare pagina’s. Bestaande Drupal-verwijspaden en de 31 afbeeldingen blijven behouden.

De controles verifiëren alle taalparen, interne links, lokale beelden in beide versies, vertaalde metadata en FAQ, belangrijke medische begrippen en de overgenomen numerieke tarief- en spoedvoorwaarden. De oorspronkelijke Nederlandstalige tekstcontroles blijven van toepassing. De Franstalige praktijkintroductie is taalkundig herwerkt en opgenomen in de volledige Franse homepage en het behandelaanbod.

## GitHub Actions — Node.js 24

De Pages-workflow gebruikt `actions/checkout@v5`, `actions/setup-node@v6`, `actions/configure-pages@v6`, `actions/upload-artifact@v6` en `actions/deploy-pages@v5`. De daadwerkelijke JavaScript-runtime van deze versies is Node.js 24; ook de websitebuild gebruikt Node.js 24. De officiële actiegegevens zijn gecontroleerd op 19 november 2026.

De statische uitvoer wordt rechtstreeks in `artifact.tar` verpakt en als artifact **github-pages** geüpload. Daardoor is de verouderde onderliggende uploadstap van de samengestelde Pages-uploadactie niet meer nodig. Er is geen instelling toegevoegd om afgeschafte Node-versies alsnog toe te staan.

Vervang bij het bijwerken van je repository ook **`.github/workflows/pages.yml`** door de versie uit deze zip. Verwijder eventuele oude, dubbele Pages-workflows uit `.github/workflows/`; anders kan GitHub nog waarschuwingen uit die andere workflow tonen. Zet bij Settings → Pages de bron op GitHub Actions. Deze zip is lokaal gecontroleerd; er is vanuit deze werkomgeving geen workflowrun in jouw GitHub-repository gestart.

Officiële actiegegevens: [checkout](https://github.com/actions/checkout/blob/v5/action.yml), [setup-node](https://github.com/actions/setup-node/blob/v6/action.yml), [configure-pages](https://github.com/actions/configure-pages/blob/v6/action.yml), [upload-artifact](https://github.com/actions/upload-artifact/blob/v6/action.yml) en [deploy-pages](https://github.com/actions/deploy-pages/blob/v5/action.yml).

## Homepagefoto

Beide homepages gebruiken `src/assets/praktijk/ilsevandenbroeck.jpeg`, op verzoek van de opdrachtgever gedownload op 19 november 2026. Het originele JPEG-bestand is ongewijzigd opgenomen. De foto wordt volledig als portret getoond, met behoud van de oorspronkelijke logo’s en credits. Afmetingen en pad staan centraal in `site.homeImage`; alt-teksten zijn beschikbaar in beide talen. Ook de Open Graph-afbeelding van beide homepages gebruikt deze foto. De 31 eerdere migratiebeelden blijven als historisch bronmateriaal beschikbaar; de nieuwe homepagefoto is aanvullend.
