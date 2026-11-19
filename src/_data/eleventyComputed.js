export default {
  schema(data) {
    const base = data.site.url + '/' + (process.env.PATH_PREFIX || '').replace(/^\/+|\/+$/g, '');
    const origin = base.replace(/\/$/, '') + '/';
    const url = origin + data.page.url.replace(/^\//, '');
    const french = data.lang === 'fr-BE';
    const practiceName = (french ? 'Dentisterie équine ' : 'Paardentandarts ') + data.site.name;
    const graph = [{
      '@type': 'VeterinaryCare', '@id': origin + '#praktijk',
      name: practiceName, url: origin,
      description: french ? 'Cabinet vétérinaire de dentisterie équine à Andenne, Belgique.' : 'Diergeneeskundige praktijk voor paardentandheelkunde in Andenne, België.',
      telephone: data.site.phoneLink, email: data.site.email,
      address: { '@type': 'PostalAddress', streetAddress: data.site.street, postalCode: data.site.postalCode, addressLocality: data.site.city, addressCountry: data.site.country },
      sameAs: [data.site.facebook]
    }, {
      '@type': 'WebSite', '@id': origin + '#website', url: origin,
      name: practiceName, inLanguage: ['nl-BE', 'fr-BE'],
      publisher: { '@id': origin + '#praktijk' }
    }, {
      '@type': ['/contact/', '/fr/contact/'].includes(data.page.url) ? 'ContactPage' : 'WebPage',
      '@id': url + '#pagina', url, name: data.title,
      description: data.description, inLanguage: data.lang || 'nl-BE',
      isPartOf: { '@id': origin + '#website' },
      about: data.topic ? { '@type': 'Thing', name: data.topic } : { '@id': origin + '#praktijk' },
      ...(data.lastUpdated ? { dateModified: new Date(data.lastUpdated).toISOString().slice(0, 10) } : {}),
      ...(data.article ? { mainEntity: { '@id': url + '#artikel' } } : {})
    }];
    if (data.article) graph.push({
      '@type': 'Article', '@id': url + '#artikel', url,
      headline: data.title, description: data.description, inLanguage: data.lang || 'nl-BE',
      mainEntityOfPage: { '@id': url + '#pagina' },
      publisher: { '@id': origin + '#praktijk' },
      about: { '@type': 'Thing', name: data.topic || data.title },
      image: origin + 'assets/praktijk/181dbf-paardenitaliebanner2.jpg',
      ...(data.sources?.length ? { citation: data.sources } : {}),
      ...(data.lastUpdated ? { dateModified: new Date(data.lastUpdated).toISOString().slice(0, 10) } : {})
    });
    if (data.page.url !== '/' && !data.noindex) graph.push({
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: french ? 'Accueil' : 'Home', item: french ? origin + 'fr/' : origin },
        { '@type': 'ListItem', position: 2, name: data.shortTitle || data.title, item: url }
      ]
    });
    if (data.faq?.length) graph.push({ '@type': 'FAQPage', mainEntity: data.faq.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) });
    return { '@context': 'https://schema.org', '@graph': graph };
  }
};
