const origin = (process.env.SITE_URL || 'https://ilse-paardentandarts-diastema.mich-bv-4396.chatgpt.site').replace(/\/$/, '');
if (!/^https?:\/\/[^/]+$/.test(origin)) throw new Error('SITE_URL moet alleen de oorsprong bevatten, bijvoorbeeld https://naam.github.io');
export default {
  url: origin,
  name: 'Ilse Van Den Broeck',
  homeImage: { path: '/assets/praktijk/ilsevandenbroeck.jpeg', width: 1004, height: 1504 },
  profession: 'Dierenarts · Paardentandheelkunde',
  phone: '+32 499 32 77 92',
  phoneLink: '+32499327792',
  email: 'info@ilsevandenbroeck.be',
  street: 'Rue Chênu 5',
  postalCode: '5300',
  city: 'Andenne',
  country: 'BE',
  fax: '+32 (0)15 33 17 33',
  vat: 'BE 0816.795.824',
  maps: 'https://www.google.com/maps/search/?api=1&query=Rue%20Ch%C3%AAnu%205%2C%205300%20Andenne%2C%20Belgium',
  facebook: 'https://www.facebook.com/dierenartsilsevandenbroeck',
  personalFacebook: 'https://www.facebook.com/ilse.vandenbroeck.18',
  navigationFr: [{"title": "Accueil", "url": "/fr/"}, {"title": "Diastèmes", "url": "/fr/diasteme/"}, {"title": "Soins dentaires", "url": "/fr/soins-dentaires/"}, {"title": "Tarifs", "url": "/fr/tarifs/"}, {"title": "Contact", "url": "/fr/contact/"}],
  treatmentsFr: [{"title": "Diastèmes", "url": "/fr/diasteme/"}, {"title": "Dents de loup", "url": "/fr/dents-de-loup/"}, {"title": "Nivellement dentaire", "url": "/fr/nivellement-dentaire/"}, {"title": "Surdents", "url": "/fr/surdents/"}, {"title": "Crochets", "url": "/fr/crochets/"}, {"title": "Coiffes", "url": "/fr/coiffes/"}, {"title": "EOTRH", "url": "/fr/eotrh/"}, {"title": "Endoscopie", "url": "/fr/endoscopie/"}, {"title": "Caries périphériques", "url": "/fr/caries-peripheriques/"}, {"title": "Extractions dentaires", "url": "/fr/extractions-dentaires/"}, {"title": "Radiographie numérique", "url": "/fr/radiographie-numerique/"}, {"title": "Cerclage", "url": "/fr/cerclage/"}],
  treatments: [
    { title: 'Diastema', url: '/afwijkingen/diastema/' },
    { title: 'Wolfstanden', url: '/wolfstanden/' },
    { title: 'Raspen', url: '/raspen/' },
    { title: 'Scherpe emailpunten', url: '/afwijkingen/scherpe-emailpunten/' },
    { title: 'Haken', url: '/afwijkingen/haken/' },
    { title: 'Doppen', url: '/doppen/' },
    { title: 'EOTRH', url: '/afwijkingen/eotrh/' },
    { title: 'Endoscopie', url: '/endoscopie/' },
    { title: 'Perifere cariës', url: '/afwijkingen/perifere-caries/' },
    { title: 'Tandextracties', url: '/tandextracties/' },
    { title: 'Digitale radiografie', url: '/digitale-radiografie/' },
    { title: 'Cerclage', url: '/cerclage/' }
  ],
  navigation: [{ title: 'Home', url: '/' }, { title: 'Diastema', url: '/afwijkingen/diastema/' }, { title: 'Gebitszorg', url: '/gebitszorg/' }, { title: 'Tarieven', url: '/tarieven/' }, { title: 'Contact', url: '/contact/' }]
};
