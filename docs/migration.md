# Migratie-inventaris

Deze website vervangt de bestaande praktijkwebsite. De overname is geïnventariseerd op 17 november 2026. De bronpaden hieronder zijn uitsluitend herkenningspunten: alle bezoekerslinks verwijzen naar de vervangingssite. Er worden geen pagina’s of afbeeldingen vanaf het vorige domein ingeladen.

## Inhoud

| Eerder pad | Bestemming | Overname |
| --- | --- | --- |
| `/` en `/node/17` | `/` en `/fr/` | Volledige Franse praktijkintroductie behouden; Nederlandstalige introductie en behandelaanbod aangevuld |
| `/node/3` | `/gebitszorg/` | Sedatie, zenuwblokken, behandeloverzicht en alle bereikbare voorbeeldbeelden |
| `/wolfstanden` | `/wolfstanden/` | Definitie, werkwijze, blinde wolfstanden, wortelresten en vier foto’s |
| `/raspen` | `/raspen/` | Gebitsslijtage, behoud van reservekroon, visuele controle, ponycasus, scherpe punten en vijf beelden |
| `/afwijkingen/diastema` | `/afwijkingen/diastema/` | Definitie, gevolgen, reinigen, opvullen, verbreden en twee beelden; uitgebreide informatie en FAQ behouden |
| `/doppen` | `/doppen/` | Melktanden, klachten, locaties en verwijderen; drie foto’s |
| `/afwijkingen/eotrh` | `/afwijkingen/eotrh/` | Betekenis, wortelveranderingen, symptomen, radiografie, extractie en drie beelden |
| `/endoscopie` | `/endoscopie/` | Instrument, optiekhoek van 90°, drie toepassingen met beelden |
| `/afwijkingen/perifere-caries` | `/afwijkingen/perifere-caries/` | Cementlaag, zuur, dieet, gevolgen, preventie en afbeelding |
| `/tandextracties` | `/tandextracties/` | Onderwerp behouden; aanbod aangevuld uit de praktijkintroductie en verwante pagina’s |
| `/digitale-radiografie` | `/digitale-radiografie/` | Diagnostiek, apparatuur ter plaatse en drie beelden |
| `/cerclage` | `/cerclage/` | Kaakbreuken/avulsie, casus van een zesjarig paard en beide beelden |
| `/node/28` | `/tarieven/` en `/fr/tarifs/` | Alle bedragen, inbegrepen/uitgesloten prestaties, werkplekvoorwaarden, locaties en betaling |
| `/contact` | `/contact/` | Telefoon, primair e-mailadres, fax, btw, Facebook en route naar het bevestigde adres |
| `/urgences-spoedgevallen` | Gelijknamige pagina en `/fr/urgences/` | Alleen in de praktijk, vooraf bellen, €30/€400 plus behandeling en 3/15-maandsvoorwaarden |
| `/sitemap` | `/sitemap/` | Volledig navigatieoverzicht, met alle nieuwe onderwerpen |
| `/rss.xml` | `/rss.xml` | Werkende feed met verwijzingen naar de huidige informatiepagina’s |

De meer gedetailleerde inventaris, tekstblokken voor volledigheidscontroles en lokale afbeeldingspaden staan in `docs/migration.json`. De praktijkfoto’s en het logo zijn met toestemming van de opdrachtgever overgenomen en lokaal opgeslagen. Er zijn **31 bereikbare originele beelden** overgenomen, waaronder de oorspronkelijke behandelillustraties, overzichtsbeelden, banner en het logo.

## Uitzonderingen die tijdens de inventaris zijn vastgesteld

- `/afwijkingen/scherpe-emailpunten` en `/afwijkingen/haken` leverden in de bron een HTTP 404 op. Beide bestemmingen zijn hersteld met de uitleg, ponycasus en beelden die wel op `/raspen` stonden.
- De menuafbeelding `scherpe emailpunten menu.png` leverde eveneens een HTTP 404 op. De werkende klinische foto van de pagina over raspen wordt daarvoor gebruikt; er is geen kapotte afbeeldingslink overgenomen.
- `/tandextracties` had alleen een titel en administratieve publicatievermelding, geen inhoudelijke tekst. Er is dus geen verborgen extractieartikel weggelaten. Het onderwerp is aangevuld met het expliciet genoemde aanbod en verwijzingen naar de relevante diagnostiek.
- Het Mechelse adres op de contactpagina is vervangen door **Rue Chênu 5, 5300 Andenne**, zoals de opdrachtgever uitdrukkelijk bevestigde. De kaart is eveneens aangepast.
- Het zichtbare e-mailadres en de achterliggende e-maillink verschilden. Op 19 november 2026 heeft de opdrachtgever het alternatieve adres laten verwijderen uit beide contactpagina’s; alleen het primaire e-mailadres blijft beschikbaar.
- De opdrachtgever bevestigde op 19 november 2026 een maximale afstand van 10 meter tot de werkplaats. Beide talen hanteren nu uitsluitend die afstand, zonder kruisverwijzing naar een afwijkende taalinstructie.
- De tarieven zijn op instructie van de opdrachtgever bijgewerkt op 19 november 2026: €135 voor standaardverzorging, €70 voor verplaatsing/installatie/ontsmetting binnen 25 km en €20 + €65/uur bij grotere afstand. De uitsluitingen en spoedconsultatietarieven blijven behouden.
- Kleine taal- en spelfouten zijn gecorrigeerd zonder de inhoudelijke strekking te wijzigen. De algemene voorlichting vervangt geen onderzoek van een individueel paard.

## Oude paden en indexering

Bestaande beschrijvende behandelpaden zijn behouden. Er zijn 17 extra verwijzingen voor Drupal-nodepaden en herkenbare korte paden, naast de reeds aanwezige `/diastema/`-verwijzing. Deze verwijspagina’s bevatten een canonical en HTML-refresh naar de huidige interne pagina en staan op `noindex`.

Dit zijn geen HTTP-301-redirects op het vorige domein. Een daadwerkelijke domeinomschakeling en permanente serverredirects vereisen nog toegang tot DNS en/of de bestaande hosting. De live vervangingssite verwijst zelf nergens terug naar het vorige webadres.

## Tweetalige uitbreiding — 18 november 2026

De oorspronkelijke migratie-inventaris hierboven beschrijft de eerste overname. De vervangingssite is daarna uitgebreid naar **19 volledige taalparen**, samen 38 indexeerbare pagina’s. Alle inhoud, behandelingen, praktische gegevens, tarieven en FAQ zijn nu zowel Nederlands als Frans. De Franse pagina’s hebben eigen titels, beschrijvingen, afbeeldingsbijschriften, knoppen en structured data. De 31 beelden en alle eerdere werkende paginapaden zijn behouden.

De koppelingen staan in `src/_data/languages.json`. De taalschakelaar en `hreflang`-links verwijzen steeds naar dezelfde inhoud in de andere taal. De eerder gedeeltelijk Franse introductie is nagekeken op taal en verwerkt in de volledige Franse homepage en het overzicht van de zorg. De oorspronkelijke Nederlandse tekstinventaris blijft beschikbaar in het controlebestand; dit bevat geen bezoekerslinks naar het vorige domein.
