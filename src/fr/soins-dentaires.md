---
layout: "base.njk"
tags: "page"
title: "Soins dentaires pour chevaux — tous les traitements"
shortTitle: "Soins dentaires"
heading: "Des soins attentifs commencent par un examen attentif."
eyebrow: "Examen & traitement"
intro: "Chaque cheval et chaque bouche sont différents. Un examen approfondi est la base de soins individualisés, en prenant en compte le cheval dans son ensemble."
description: "Tous les soins de dentisterie équine d’Ilse Van Den Broeck : diastèmes, nivellement, dents de loup, EOTRH, extractions, endoscopie, radiographie et cerclage."
lang: "fr-BE"
permalink: "/fr/soins-dentaires/"
alternateLanguage: "/gebitszorg/"
alternates: [{"lang":"nl-BE","url":"/gebitszorg/"},{"lang":"fr-BE","url":"/fr/soins-dentaires/"}]
---

## Le cheval dans son ensemble

Chaque cheval mérite les meilleurs soins dentaires, dans le respect de son équilibre naturel. Ilse Van Den Broeck est une vétérinaire expérimentée, formée en dentisterie équine, et suit régulièrement des formations continues.

La bouche n’est pas considérée isolément. Les liens avec l’alimentation, les performances, la physiologie et d’autres affections sont également pris en compte. Vous pouvez demander conseil à ce sujet lors de l’examen.

## Sédation et anesthésie locale

Le cabinet travaille sous sédation et avec du matériel moderne adapté. Cela permet un travail minutieux, y compris chez les chevaux plus difficiles à soigner, en veillant à la sécurité du cheval et des personnes qui l’accompagnent et en limitant le stress.

Des blocs nerveux et une anesthésie locale permettent d’insensibiliser la zone à traiter. La prise en charge varie selon l’anomalie dentaire. La vétérinaire détermine la sédation, l’anesthésie et les médicaments nécessaires.

## Tous les traitements

<ul class="treatment-links">{% for item in site.treatmentsFr %}<li><a href="{{ item.url | local }}">{{ item.title }} <span aria-hidden="true">→</span></a></li>{% endfor %}</ul>

### Entretien courant et équilibrage

Le contrôle dentaire recherche notamment les surdents et les anomalies d’usure. L’entretien peut comprendre l’équilibrage de la dentition, incisives comprises, ainsi que la correction des crochets et des vagues et l’enlèvement des coiffes et du tartre.

[Le nivellement dentaire]({{ '/fr/nivellement-dentaire/' | local }}) · [Les surdents]({{ '/fr/surdents/' | local }}) · [Les crochets]({{ '/fr/crochets/' | local }}) · [Les coiffes]({{ '/fr/coiffes/' | local }})

### Diastèmes et parodontite

Des aliments coincés entre deux dents peuvent provoquer douleur et inflammation. Le traitement des diastèmes et de la parodontite est adapté à la localisation et à l’état de l’espace ainsi qu’aux tissus environnants, en tenant compte des connaissances scientifiques.

[Symptômes, traitement et suivi des diastèmes]({{ '/fr/diasteme/' | local }})

### Extractions et cerclage

Le cabinet propose des extractions dentaires, notamment des extractions transbuccales mini-invasives. Pour certaines fractures simples de la mâchoire ou l’avulsion de dents, une stabilisation par cerclage peut être envisagée.

[Extractions dentaires]({{ '/fr/extractions-dentaires/' | local }}) · [Dents de loup et fragments de racines]({{ '/fr/dents-de-loup/' | local }}) · [EOTRH]({{ '/fr/eotrh/' | local }}) · [Cerclage]({{ '/fr/cerclage/' | local }})

### Endodontie et traitement des caries

L’endodontie et le traitement des caries font également partie des soins proposés. Les possibilités dépendent des tissus dentaires atteints et des résultats de l’examen. [En savoir plus sur les caries périphériques]({{ '/fr/caries-peripheriques/' | local }}).

## Examens complémentaires sur place

Pour les cas complexes, la radiographie, l’endoscopie et l’échographie permettent de compléter le diagnostic sur place. Un traitement médicamenteux peut être proposé si nécessaire. Les examens et les soins sont déterminés pour chaque cheval.

[Radiographie numérique]({{ '/fr/radiographie-numerique/' | local }}) · [Endoscopie]({{ '/fr/endoscopie/' | local }})

## Exemples du cabinet

{% include "clinical-overview-fr.njk" %}

## Informations pratiques

Un lieu couvert adapté, une personne pour tenir le cheval et un accès pour le matériel sont importants. Consultez [la préparation complète, les tarifs et les modalités de paiement]({{ '/fr/tarifs/' | local }}). Si ces conditions ne sont pas réunies à l’écurie, un autre lieu peut être convenu.

[Nous contacter pour un rendez-vous]({{ '/fr/contact/' | local }})
