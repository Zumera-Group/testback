// eslint-disable-next-line no-undef
const { join } = require('path');

const sassOptions = {
  prependData: `@use "sass:math"; @import "styles/_variables.scss"; @import "styles/_functions.scss"; @import "styles/_mixins.scss";`,
  includePaths: [join(__dirname, 'src', 'styles')],
};

module.exports = {
  // Remove this object
  i18n: {
    locales: ['en', 'de', 'catchAll'],
    defaultLocale: 'catchAll',
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  sassOptions,
  trailingSlash: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/catchAll/',
        destination: '/en/',
        locale: false,
        permanent: false,
      },
      {
        source: '/catchAll/:slug((?!api).*)/',
        destination: '/en/:slug*/',
        locale: false,
        permanent: false,
      },
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      {
        source: '/de/',
        destination: '/de/home',
        permanent: true,
      },
      {
        source: '/en/',
        destination: '/en/home',
        permanent: true,
      },
      {
        source: '/de/news/unternehmenskauf-unternehmensverkauf-im-mittelstand/',
        destination: '/de/news/unternehmertage-2022/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/involvenzen-steigen-ende-2021-carina-kueffen/',
        destination:
          '/de/news/insolvenzen-steigen-erst-gegen-ende-2021-wieder-signifikant-an/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/involvenzen-steigen-ende-2021-carina-kueffen/',
        destination:
          '/de/news/insolvenzen-steigen-erst-gegen-ende-2021-wieder-signifikant-an/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/7-fragen-an-felix-engelhardt-managing-director-von-saxenhammer-co/',
        destination:
          '/de/news/7-fragen-an-felix-engelhardt-managing-director-von-saxenhammer/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/alexander-shard/',
        destination:
          '/de/news/saxenhammer-and-co-advises-woodside-capital-partners-on-the-sale-of-alexander-technologies-europe-ltds-equity-shares-to-shard-credit-partners-limited/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/artikel-von-christian-saxenhammer-in-der-finanzbusiness-zeitschrift/',
        destination:
          '/de/news/artikel-von-christian-saxenhammer-in-der-finanzbusiness-zeitschrift/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/arturschambach-geisler/',
        destination: '/de/news/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/automobilzulieferer-die-chance-in-der-krise/',
        destination: '/de/news/automobilzulieferer-die-chance-in-der-krise/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/bastra-mittel/',
        destination:
          '/de/transaktionen/bayha-&-strackbein-gmbh-mittelständische-beteiligungsgesellschaft-berlin-brandenburg-gmbh/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/berlin-bleibt-die-hauptstadt-der-start-ups/',
        destination: '/de/news/berlin-bleibt-die-hauptstadt-der-start-ups/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/bhattacharya-2/',
        destination: '/de/mitarbeiter/priyanshu-bhattacharya/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/bloch-de/',
        destination: '/de/mitarbeiter/martin-ebloch/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/brix-2/',
        destination: '/de/mitarbeiter/marcel-brix/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/cea-rensa/',
        destination:
          '/de/transaktionen/cea-chemie--und-energie-armaturen-gmbh-rensa-group/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/cfp-mibe/',
        destination: '/de/news/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/christian-saxenhammer-spricht-darueber-wie-die-aktuelle-pandemie-das-geschaeft-veraendert-hat-und-was-unternehmen-in-naher-zukunft-erwarten-koennen/',
        destination:
          '/de/news/christian-saxenhammer-spricht-daruber-wie-die-aktuelle-pandemie-das-geschaft-verandert-hat-und-was-unternehmen-in-naher-zukunft-erwarten-konnen/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/christian-saxenhammer-spricht-im-wv-podcast/',
        destination: '/de/news/christian-saxenhammer-spricht-im-wandv-podcast/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/curasan-donauinvest/',
        destination:
          '/de/transaktionen/curasan-ag-donau-invest-beteiligungs-gesmbh/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/das-preisniveau-von-buyout-transaktionen-erreicht-seinen-hoehepunkt/',
        destination:
          '/de/news/das-preisniveau-von-buyout-transaktionen-erreicht-seinen-hohepunkt/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/datenschutz/',
        destination: '/de/datenschutzerklarung/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/dev-axing/',
        destination:
          '/de/transaktionen/dev-systemtechnik-gmbh-&-co-kg-axing-ag/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/die-auswirkungen-der-covid-19-krise-auf-den-ma-sektor/',
        destination:
          '/de/news/die-auswirkungen-der-covid-19-krise-auf-den-manda-sektor/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/die-corona-krise-als-katalysator-fuer-technologische-trends/',
        destination:
          '/de/news/die-corona-krise-als-katalysator-fur-technologische-trends/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/die-groessten-hindernisse-fuer-start-ups-waehrend-einer-finanzierungsrunde/',
        destination:
          '/de/news/die-grossten-hindernisse-fur-start-ups-wahrend-einer-finanzierungsrunde/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/die-notwendigkeit-einer-amerikanisierung-der-deutschen-vc-kultur/',
        destination:
          '/de/news/die-notwendigkeit-einer-amerikanisierung-der-deutschen-vc-kultur/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/die-optionen-fuer-unternehmen-nach-der-corona-krise/',
        destination:
          '/de/news/die-optionen-fur-unternehmen-nach-der-corona-krise/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/die-strategie-hinter-chinas-investitionen-in-europaeische-unternehmen/',
        destination:
          '/de/news/die-strategie-hinter-chinas-investitionen-in-europaische-unternehmen/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/die-wichtigkeit-der-auswahl-des-richtigen-strategischen-partners/',
        destination:
          '/de/news/die-wichtigkeit-der-auswahl-des-richtigen-strategischen-partners/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/donda-2/',
        destination: '/de/mitarbeiter/jesica-donda/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/dr-nicholas-hanser-steigt-bei-saxenhammer-co-als-partner-und-leiter-des-technologie-investmentbankings-ein/',
        destination:
          '/de/news/dr-nicholas-hanser-steigt-bei-saxenhammer-and-co-als-partner-und-leiter-des-technologie-investmentbankings-ein/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/duisburg-hillwood/',
        destination:
          '/de/transaktionen/dst-duisburg-special-tubes-gmbh-hillwood-deutschland-gmbh/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/ein-interview-mit-christian-saxenhammer-zum-ma-markt/',
        destination:
          '/de/news/ein-interview-mit-christian-saxenhammer-zum-manda-markt/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/eine-verschiebung-in-der-beziehung-von-familienunternehmen-zu-chinesischen-investoren/',
        destination:
          '/de/news/eine-verschiebung-in-der-beziehung-von-familienunternehmen-zu-chinesischen-investoren/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/elm/',
        destination:
          '/de/transaktionen/bio-manufaktur-elm-gmbh-braun-beteiligungs-gmbh/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/enerco-nimex/',
        destination:
          '/de/transaktionen/enerco-systems-gmbh-&-co-kg-nimex-petroleum-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/engelhardt-de/',
        destination: '/de/mitarbeiter/felix-engelhardt/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/euros-tpi/',
        destination:
          '/de/transaktionen/euros-entwicklunggesellschaft-für-windkraftanlagen-mbh-tpi-composite/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/events/',
        destination: '/de/news/isringhausen-acquires-automotive-supplier-gm/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/felix-engelhardt-cfa-ist-als-managing-director-bei-saxenhammer-co-eingestiegen-und-mit-der-leitung-eines-neuen-geschaeftsbereichs-betraut/',
        destination:
          '/de/news/felix-engelhardt-cfa-ist-als-managing-director-bei-saxenhammer-and-co-eingestiegen-und-mit-der-leitung-eines-neuen-geschaftsbereichs-betraut/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/finanzbusiness-volker-ruhl/',
        destination: '/de/news/manda-adviser-volker-ruhl-joins-saxenhammer/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/steigende-insolvenzfaelle-2021-carina-kueffen/',
        destination:
          '/de/news/wir-werden-steigende-insolvenzzahlen-mitte-bis-ende-2021-sehen-prognostiziert-carina-kuffe/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/finanzielle-aspekte-einer-erfolgreichen-unternehmensnachfolge/',
        destination:
          '/de/news/finanzielle-aspekte-einer-erfolgreichen-unternehmensnachfolge/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/fromatob-tankundrast/',
        destination:
          '/de/transaktionen/fromatob-gmbh-autobahn-tank-&-rast-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/gardeur-duijndam/',
        destination: '/de/transaktionen/gardeur-group-duijndam-grupp/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/gerdhochkeppler-dmh/',
        destination: '/de/transaktionen/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/gma-isri/',
        destination: '/de/news/isringhausen-acquires-automotive-supplier-gm/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/hakle-crosslantic/',
        destination:
          '/de/transaktionen/crosslantic-capital-management-gmbh-hakle-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/hanser-2/',
        destination: '/de/mitarbeiter/nicholas-hanser/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/heliocentris-odasco/',
        destination:
          '/de/transaktionen/heliocentris-energy-solutions-ag-odasco-ll/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/helling-de/',
        destination: '/de/ueber-uns/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/henschel-testingservice/',
        destination: '/de/transaktionen/henschel-group-ts-group-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/heydt-2/',
        destination: '/de/mitarbeiter/michael-von-der-heydt/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/hoco/',
        destination: '/de/transaktionen/hoco-holz-gmbh-nexus-investments-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/hoco-nexus/',
        destination: '/de/transaktionen/hoco-holz-gmbh-nexus-investments-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/holtmann-2/',
        destination: '/de/mitarbeiter/leon-holtmann/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/',
        destination: '/de/home/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/im-fokus-des-interesses-chinesischer-investoren/',
        destination:
          '/de/news/im-fokus-des-interesses-chinesischer-investoren/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/jiang-2/',
        destination: '/de/ueber-uns/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/jt-lidl/',
        destination: '/de/transaktionen/jt-touristik-schwarz-grupp/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/kotek-2/',
        destination: '/de/mitarbeiter/fabian-kotek/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/kueffen-2/',
        destination: '/de/mitarbeiter/carina-kueffen/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/kunze-pwk/',
        destination: '/de/news/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/unternehmensfinanzierung/',
        destination:
          '/de/leistungsspektrum/ma-in-sondersituationen-und-finanzrestrukturierung//',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/unternehmensfinanzierung-success/',
        destination:
          '/de/leistungsspektrum/ma-in-sondersituationen-und-finanzrestrukturierung/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/lehmann-de/',
        destination: '/de/mitarbeiter/thomas-lehmann/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/leistungen/',
        destination: '/de/leistungsspektrum/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/littlebit-actionit/',
        destination: '/de/transaktionen/actionit-gmbh-littlebit-technology-a/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/liu-2/',
        destination: '/de/mitarbeiter/can-liu/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/luenemann-mimung/',
        destination:
          '/de/transaktionen/lünemann-gmbh-&-co-kg-mimung-beteiligungen-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/ma-boutique-saxenhammer-baut-digitaleinheit-auf/',
        destination:
          '/de/news/manda-boutique-saxenhammer-baut-digitaleinheit-auf/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/marian-gerster-heuert-als-director-bei-der-ma-beratung-saxenhammer-an/',
        destination:
          '/de/news/marian-gerster-joins-manda-boutique-saxenhammer-as-director/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/marian-gerster-startet-als-director-bei-saxenhammer-co/',
        destination:
          '/de/news/marian-gerster-startet-als-director-bei-saxenhammer-and-co/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/socialwave-meinhotspot/',
        destination: '/de/transaktionen/meinhotspot-gmbh-socialwave-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/michaelschiffer-joos/',
        destination:
          '/de/transaktionen/michael-schiffer-gmbh-&-co-kg-group-joos-n/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/mueller-mueller/',
        destination:
          '/de/transaktionen/müller-engineering-gmbh-mueller-technology-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/neue-lust-auf-digitales-kaufen-wachsendes-interesse-an-digitalen-unternehmen/',
        destination:
          '/de/news/neue-lust-auf-digitales-kaufen-wachsendes-interesse-an-digitalen-unternehme/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/news-de/',
        destination: '/de/news/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/newtron-supplyon/',
        destination: '/de/transaktionen/newtron-ag-supplyon-a/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/nicht-laenger-schieben/',
        destination: '/de/news/nicht-langer-schieben/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/parkettdirekt-parkettoster/',
        destination: '/de/transaktionen/parkett-direkt-gmbh-parkett-oste/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/philipp-koeppe-startet-als-ma-manager-bei-saxenhammer-co-und-komplementiert-das-management-team-der-digital-unit/',
        destination:
          ' en/news/philipp-koppe-joins-as-manda-manager-at-saxenhammer-and-co-and-complements-the-management-team-of-the-digital-unit/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/picard/',
        destination:
          '/de/transaktionen/picard-lederwaren-gmbh-&-co-kg-managemen/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/poetschke-weltbild/',
        destination: '/de/transaktionen/gärtner-pötschke-gmbh-droege-group-a/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/preuss-blectec/',
        destination:
          '/de/transaktionen/preuss-metallverarbeitung-gmbh-blech--und-technologiezentrum-linda-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/ptc-lg/',
        destination: '/de/transaktionen/ptc-deutschland-gmbh-tfe-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-beraet-die-habyt-gmbh-bei-der-akquisition-der-quarters-holding-gmbh/',
        destination: '/de/transaktionen/habyt-gmbh-quarters-holding-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/qubix-hexatronic/',
        destination: '/de/transaktionen/qubix-spa-hexatronic-group-a/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/referenzen/',
        destination: '/de/transaktione/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/reisner-technotrans/',
        destination:
          '/de/transaktionen/reisner-cooling-energy-gmbh-technotrans-a/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/restrukturierungsprozess-des-medizinprodukteherstellers-curasan/',
        destination:
          '/de/news/restrukturierungsprozess-des-medizinprodukteherstellers-curasa/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/rsa-fmc/',
        destination:
          '/de/transaktionen/rsa-cutting-systems-gmbh-fmc-beteiligungs-k/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/rti-enercity/',
        destination: '/de/transaktionen/rti-deutschland-gmbh-enercity-a/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/volker-ruhl/',
        destination: '/de/mitarbeiter/volker-ruhl/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/saxenhammer-zh-2/',
        destination: '/de/mitarbeiter/christian-saxenhammer/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-advises-habyt-eur20m-series-b-financing-round-as-well-as-its-acquisition-of-homefully/',
        destination: '/de/transaktionen/habyt-gmbh-homefully-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-agierte-als-exklusiver-verkaufsberater-fuer-soft-intelligent-therapeutics-biotech-bei-dessen-verkauf-an-das-management/',
        destination:
          '/de/transaktionen/soft-intelligent-therapeutics-biotech-managemen/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-beraet-beim-verkauf-der-tw-audio-gmbh-an-einen-privatinvestor/',
        destination:
          '/de/news/saxenhammer-and-co-berat-beim-verkauf-der-tw-audio-gmbh-an-einen-privatinvesto/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-beraet-das-deutsche-life-science-unternehmen-dyphox-bei-seiner-25-millionen-euro-kapitalerhoehung/',
        destination:
          '/de/news/saxenhammer-and-co-berat-das-deutsche-life-science-unternehmen-dyphox-bei-seiner-25-millionen-euro-kapitalerhohun/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-beraet-die-gustav-zech-stiftung-beim-verkauf-der-elabo-gmbh-an-die-bott-gruppe/',
        destination:
          '/de/news/saxenhammer-and-co-berat-die-gustav-zech-stiftung-beim-verkauf-der-elabo-gmbh-an-die-bott-grupp/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-beraet-die-kapitalerhoehung-der-nexwafe-gmbh/',
        destination:
          '/de/news/saxenhammer-and-co-hat-die-nexwafe-gmbh-bei-der-kapitalerhohung-in-hohe-von-10-mio-euro-als-finanzberater-auf-der-verkauferseite-berate/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/saxenhammer-co-advises-hoshi-international/',
        destination:
          '/de/news/saxenhammer-and-co-advises-hoshi-international-on-its-cad-dollar185m-series-a-financing-roun/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-beraet-teccom-pharma-beim-verkauf-an-regional-investors/',
        destination:
          '/de/news/saxenhammer-and-co-berat-teccom-pharma-beim-verkauf-an-regional-investors/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-beraet-white-case-llp-beim-verkauf-der-immobilie-der-duisburg-special-tubes-gmbh-an-hillwood-germany-gmbh-waehren-des-insolvenzverfahrens/',
        destination:
          '/de/transaktionen/dst-duisburg-special-tubes-gmbh-hillwood-deutschland-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-erbrachte-fairness-opinion-dienstleistungen-fuer-kofler-companie/',
        destination:
          '/de/transaktionen/kofler-&-kompanie-gmbh-privater-investo/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-fungierte-als-exklusiver-sell-side-berater-fuer-ifc-composite-beim-verkauf-an-shandong-sinoma-composite-auto-parts-co-ltd/',
        destination:
          '/de/transaktionen/ifc-composite-gmbh-shandong-sinoma-composite-auto-parts-co,-lt/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-hat-die-bogen-electronic-gmbh-beim-verkauf-an-lika-electronic-sarl-exklusiv-auf-der-verkaufsseite-beraten/',
        destination:
          '/de/transaktionen/bogen-electronic-gmbh-lika-electronic-sr/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-hat-die-delinero-gmbh-beim-verkauf-an-die-foodexplorer-gmbh-als-exklusiver-sell-side-advisor-beraten/',
        destination: '/de/transaktionen/delinero-gmbh-foodexplorer-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-hat-die-fairform-gmbh-bei-ihrem-verkauf-an-einen-privatinvestor-exklusiv-auf-der-verkaufsseite-beraten/',
        destination:
          '/de/transaktionen/fairform-gmbh-gebrueder-sakman-winterdienst-berlin-betriebs-gmbh-&-co-k/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-hat-die-glasmetall-gmbh-beim-verkauf-an-ihren-gesellschafter-exklusiv-auf-der-verkaufsseite-beraten/',
        destination: '/de/transaktionen/glasmetall-gmbh-managemen/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-hat-die-havellaendische-zink-druckguss-beim-verkauf-an-einen-regionalen-investor-exklusiv-auf-der-verkaufsseite-beraten/',
        destination:
          '/de/transaktionen/havellaendische-zink-druckguss-gmbh-&-co-kg-privater-investo/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-hat-die-lykon-gmbh-beim-verkauf-an-eine-gruppe-von-business-angels-exklusiv-auf-der-verkaufsseite-beraten/',
        destination: '/de/transaktionen/lykon-gmbh-privater-investo/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-hat-die-michael-schiffer-gmbh-co-kg-bei-ihrem-verkauf-an-die-solvesta-ag-exklusiv-auf-der-verkaufsseite-beraten/',
        destination: '/de/transaktionen/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-hat-die-sawade-gmbh-beim-verkauf-an-die-fintura-corporate-finance-gmbh-exklusiv-auf-der-verkaufsseite-beraten/',
        destination:
          '/de/news/saxenhammer-and-co-hat-die-sawade-gmbh-beim-verkauf-an-die-fintura-corporate-finance-gmbh-exklusiv-auf-der-verkaufsseite-berate/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-hat-die-sicsone-gmbh-beim-verkauf-an-die-solvesta-ag-exklusiv-auf-der-verkaufsseite-beraten/',
        destination: '/de/transaktionen/sicsone-gmbh-solvesta-a/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-hat-die-solmic-research-gmbh-bei-ihrem-verkauf-an-die-sino-german-ma-service-gmbh-exklusiv-auf-der-verkaufsseite-beraten/',
        destination:
          '/de/transaktionen/solmic-research-gmbh-sino-deutschland-m&a-service-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-hat-die-uetersener-maschinenfabrik-gmbh-bei-ihrem-verkauf-an-die-rother-beteiligungsgesellschaft-exklusiv-auf-der-verkaufsseite-beraten/',
        destination:
          '/de/transaktionen/uetersener-maschinenfabrik-gmbh-rother-beteiligungsgesellschaft-mb/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/saxenhammer-co-hat-westiform-beim-verkauf-an-pentapart-beteiligungskapital-gmbh-als-exklusiver-sell-side-berater-begleitet/',
        destination:
          '/de/transaktionen/westiform-gmbh-pentapart-beteiligungskapital-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/saxenhammer-n-v-lamistahl-productions-gmbh-2/',
        destination:
          '/de/transaktionen/whitesell-deutschland-gmbh-&-co-kg-koninklijke-nedschroef-holding-b/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/saxenhammer-baut-digitale-ma-einheit-auf/',
        destination: '/de/news/saxenhammer-baut-digitale-manda-einheit-au/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/schliesing-see/',
        destination: '/de/transaktionen/schliesing-gmbh-&-co-ohg-see-group/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/seewald-2/',
        destination: '/de/mitarbeiter/mark-seewald/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/sektor-update-tmt-gesichtserkennung/',
        destination: ' en/news/sector-update-tmt-facial-recognition/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/servfood-lg/',
        destination:
          '/de/transaktionen/servfood-doo-lg-capital-and-deltadia-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/siedenburger-glasmetall/',
        destination: '/de/transaktionen/siedenburger-gmbh-glasmetall-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/sl-berliner-synchron/',
        destination:
          '/de/transaktionen/berliner-synchron-gmbh-s&l-medien-gruppe-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/sonovts/',
        destination: '/de/transaktionen/sonovts-gmbh-privater-investo/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/stockheim-kaefer/',
        destination:
          '/de/transaktionen/stockheim-catering-gmbh-feinkost-käfer-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/stockheim-ssp/',
        destination:
          '/de/transaktionen/stockheim-systemgastronomie-ssp-group-pl/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/stones-dgn/',
        destination:
          '/de/transaktionen/stones-mens-fashion-gmbh-dgn-consulting-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/strategische-loesungen-fuer-den-einzelhandel-in-zeiten-von-corona-und-digitaler-disruption/',
        destination:
          '/de/news/strategische-losungen-fur-den-einzelhandel-in-zeiten-von-corona-und-digitaler-disruption/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/stromberg-massenberg/',
        destination:
          '/de/transaktionen/stromberg-oberflächentechnik-gmbh-&-co-kg-massenberg-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/stylebop-fashionid/',
        destination: '/de/transaktionen/stylebob-gmbh-fashion-id-gmbh-&-co-k/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/summary-vocke/',
        destination: '/de/transaktionen/summary-gmbh-vocke-industries-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/sun-2/',
        destination: '/de/mitarbeiter/yi-sun/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team-de/',
        destination: '/de/ueber-uns/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/teamtischer-baierl/',
        destination:
          '/de/transaktionen/teamtischer-gmbh-baierl-&-demmelhuber-innenausbau-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/technologischer-wandel-und-eine-neue-uebernahmewelle-in-der-deutschen-automobilbranche/',
        destination:
          '/de/news/technologischer-wandel-und-eine-neue-ubernahmewelle-in-der-deutschen-automobilbranche/',
        permanent: true,
        locale: false,
      },
      {
        source:
          '/de/artikel/tesla-co-boersenrelevante-firmenuebernahmen-und-partnerschaften/',
        destination:
          '/de/news/tesla-and-co-borsenrelevante-firmenubernahmen-und-partnerschaften-das-erwartet-uns-im-jahr-2021-saxenhammer-kolumne/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/thermico-kapabol/',
        destination:
          '/de/transaktionen/thermico-gmbh-kapabol-surface-technologies-co-lt/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/thoene-seppeler/',
        destination: '/de/transaktionen/thöne-metallwaren-gmbh-seppeler-grou/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/toocan-customeralliance/',
        destination: '/de/transaktionen/toocan-gmbh-ca-customer-alliance-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/trustbills-fintechstudio/',
        destination: '/de/transaktionen/trustbills-fintech-studi/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/unternehmensakquisitionen-im-digitalen-zeitalter/',
        destination:
          '/de/news/unternehmensakquisitionen-im-digitalen-zeitalter/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/unternehmertage/',
        destination: '/de/news/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/venture-capital-und-deutsche-fintech-start-ups/',
        destination: '/de/news/venture-capital-und-deutsche-fintech-start-ups/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/vertraulichkeitszusicherung/',
        destination: '/de/home/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/vorhang-auf-und-tuer-zu/',
        destination: '/de/news/vorhang-auf-und-tur-z/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/weberit/',
        destination:
          '/de/transaktionen/weberit-werke-dräbing-group-hc-hessentaler-container-gmb/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/expertenpanel/',
        destination: '/de/new/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/1020-2/',
        destination:
          '/de/transaktionen/werkladen-conzen-kunst-service-gmbh-mittermeier-gmbh,-ibis-gmbh-&-co-kg,-private-investo/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/wie-koennen-einzelhaendler-in-zukunft-ueberleben/',
        destination: '/de/news/wie-konnen-einzelhandler-in-zukunft-uberlebe/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/wolfinger-2/',
        destination: '/de/mitarbeiter/benjamin-wolfinger/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/artikel/zeitz-remondis/',
        destination:
          '/de/transaktionen/plastic-recycling-zeitz-gmbh-&-co-kg-remondis-se-&-co-k/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/team/zimmermann-2/',
        destination: '/de/ueber-uns/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/landing/10X4SXH/',
        destination: '/de/landing/join-us/',
        permanent: true,
        locale: false,
      },
      {
        source: '/en/transactions/calister-sa-lallemand/',
        destination: '/en/transactions/',
        permanent: true,
        locale: false,
      },
      {
        source: '/de/transaktionen/calister-sa-lallemand/',
        destination: '/de/transaktionen/',
        permanent: true,
        locale: false,
      },
    ];
  },
};
