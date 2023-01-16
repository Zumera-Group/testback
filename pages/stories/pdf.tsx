// @ts-nocheck
import { useRouter } from 'next/router';
import { EnvironmentService } from '../../environment.service';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from '@react-pdf/renderer';
import logo from './Group 4486.png';
import bg from './bg.png';
import { fontSizes } from '../../styles/foundations/fontStyles';
import { colors } from '../../styles/foundations/colors';

Font.register({ family: 'Condor', src: '/fonts/Condor-Regular-Testing.otf' });

const spacing = (n: number) => 8 * n;
const definitions = {
  pageSize: 'A4',
  documentSpacingHorizontal: spacing(4),
  sessionSpacingTop: spacing(2),
  textColor: '#001D1A',
  spaceBetweenTitleAndDescription: spacing(2),
  spaceBetweenTitleAndSubtitle: spacing(1),
} as const;

const frontPageStyles = StyleSheet.create({
  // front page
  section: {
    margin: spacing(2),
    padding: 10,
    flexGrow: 1,
  },
  image: {
    position: 'absolute',
    minWidth: '100%',
    height: '100%',
    width: '100%',
  },
  topView: {
    minWidth: '100%',
    width: '100%',
    minHeight: '40%',
  },
  bottomView: {
    minWidth: '100%',
    minHeight: '60%',
    paddingHorizontal: definitions.documentSpacingHorizontal,
    paddingTop: definitions.sessionSpacingTop,
  },
  logo: {
    width: logo.width * 0.07,
    height: logo.height * 0.07,
    paddingHorizontal: definitions.documentSpacingHorizontal,
    marginTop: spacing(3),
    objectFit: 'contain',
  },
  footerText: {
    fontSize: 6,
    fontWeight: 300,
    lineHeight: 2,
    position: 'absolute',
    bottom: definitions.sessionSpacingTop,
    left: definitions.documentSpacingHorizontal,
    color: definitions.textColor,
    fontFamily: 'Condor',
  },
  secondPage: {
    height: '100%',
  },
  secondPageTop: {
    margin: 16,
    height: 200,
  },

  secondPageContent: {
    paddingHorizontal: 32,
    width: '70%',
  },
});

const sharedStyles = StyleSheet.create({
  title1: {
    fontSize: 32,
    lineHeight: 1.4,
    paddingTop: 24,
    color: definitions.textColor,
  },
  title: {
    fontSize: 24,
    lineHeight: 1.4,
    paddingTop: 24,
    color: definitions.textColor,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 1.4,
    color: definitions.textColor,
  },
  subtitle2: {
    fontSize: 14,
    lineHeight: 1.4,
    color: definitions.textColor,
  },
  description: {
    fontSize: fontSizes.p,
    lineHeight: 1.4,
    fontWeight: 400,
    color: definitions.textColor,
    fontFamily: 'Condor',
  },
  smallText: {
    fontSize: 12,
    lineHeight: 1.5,
    fontWeight: 400,
    color: definitions.textColor,
    fontFamily: 'Condor',
  },
  smallText2: {
    fontSize: 10,
    lineHeight: 1.5,
    fontWeight: 400,
    color: definitions.textColor,
    fontFamily: 'Condor',
  },
  whiteText: {
    color: 'white',
  },
});

function FrontCover() {
  return (
    <Page size={definitions.pageSize}>
      <View style={frontPageStyles.topView}>
        <Image src={bg.src} style={frontPageStyles.image} />
        <Image src={logo.src} style={frontPageStyles.logo} />
      </View>
      <View style={frontPageStyles.bottomView}>
        <Text style={sharedStyles.title1}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy.
        </Text>
        <Text
          style={[
            sharedStyles.description,
            { marginTop: definitions.spaceBetweenTitleAndDescription },
          ]}
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
        </Text>
        <Text style={frontPageStyles.footerText}>
          Labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
          et accusam et justo duo dolores et ea rebum. Stet clita kasd
          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </Text>
      </View>
    </Page>
  );
}

const secondPageStyles = StyleSheet.create({
  secondPage: {
    height: '100%',
  },
  image: {
    position: 'absolute',
    minWidth: '100%',
    height: '100%',
    width: '100%',
  },
  secondPageTop: {
    paddingHorizontal: definitions.documentSpacingHorizontal,
    paddingVertical: spacing(2),
  },
  secondPageBottom: {
    flex: 1,
  },
  secondPageContent: {
    paddingHorizontal: definitions.documentSpacingHorizontal,
    width: '70%',
    paddingBottom: spacing(4),
  },
});

interface TitleAndText {
  title: string;
  text: string;
}
interface SecondPartProps {
  header: TitleAndText;
  content: TitleAndText;
  bottomPartLeft: TitleAndText;
  bottomPartRight: TitleAndText;
  bottomTitle: string;
}

const SecondPage: React.FC<SecondPartProps> = ({
  header,
  content,
  bottomTitle,
  bottomPartLeft,
  bottomPartRight,
}) => {
  return (
    <Page size={definitions.pageSize}>
      <View style={secondPageStyles.secondPage}>
        <View style={secondPageStyles.secondPageTop}>
          <Text style={{ fontSize: 10, marginBottom: spacing(2) }}>1</Text>
          <View style={{ borderBottom: '1px solid #001D1A' }} />
          <Text style={sharedStyles.title}>{header.title}</Text>
          <Text
            style={[sharedStyles.subtitle2, { paddingVertical: spacing(3) }]}
          >
            {header.text}
          </Text>
        </View>

        <View>
          <Image src={bg.src} style={secondPageStyles.image} />
          <View style={secondPageStyles.secondPageContent}>
            <Text style={[sharedStyles.title, sharedStyles.whiteText]}>
              {content.title}
            </Text>
            <Text
              style={[
                sharedStyles.smallText,
                sharedStyles.whiteText,
                { paddingTop: spacing(3) },
              ]}
            >
              {content.text}
            </Text>
          </View>
        </View>

        <View>
          <Text
            style={[
              sharedStyles.subtitle,
              {
                paddingHorizontal: definitions.documentSpacingHorizontal,
                marginBottom: spacing(2),
                marginTop: definitions.sessionSpacingTop,
              },
            ]}
          >
            {bottomTitle}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: definitions.documentSpacingHorizontal,
              paddingBottom: spacing(2),
            }}
          >
            <View style={{ maxWidth: '50%' }}>
              <View style={{ backgroundColor: colors.primary['500'] }}>
                <Text
                  style={{ color: 'white', fontSize: 12, padding: spacing(1) }}
                >
                  {bottomPartLeft.title}
                </Text>
              </View>
              <Text
                style={[
                  sharedStyles.smallText2,
                  {
                    paddingLeft: spacing(1),
                    paddingRight: spacing(2),
                    paddingTop: spacing(2),
                  },
                ]}
              >
                {bottomPartLeft.text}
              </Text>
            </View>

            <View style={{ maxWidth: '50%' }}>
              <View
                style={{
                  borderLeft: '1px solid white',
                  paddingLeft: spacing(2),
                  backgroundColor: colors.primary['500'],
                }}
              >
                <Text
                  style={{ color: 'white', fontSize: 12, padding: spacing(1) }}
                >
                  {bottomPartRight.title}
                </Text>
              </View>
              <Text
                style={[
                  sharedStyles.smallText2,
                  { paddingLeft: spacing(3), paddingTop: spacing(2) },
                ]}
              >
                {bottomPartRight.text}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
};

const MyDocument = () => (
  <Document>
    <FrontCover />
    <SecondPage
      header={{
        title:
          'Unsere Wertschätzung trägt einen Namen: Saxenhammer Valuation X.',
        text: 'Welchen Preis Sie mit Ihrem Unternehmen auf dem Markt erzielen können? Mit dem Saxenhammer Valuation X Tool© erfahren Sie was möglich ist – unbeschönigt, unverbindlich und unter Berücksichtigung relevanter Szenarien und Bewertungsfaktoren.',
      }}
      content={{
        title:
          'Präzisere  Bewertungen dank Big Data und überlegener Analytik.  ',
        text:
          'Kennt man seinen Wert, ist man klar im Vorteil. Diese Binsenweisheit gilt nicht nur für das Leben allgemein, sondern insbesondere in der Geschäftswelt. Um den Wert eines Unternehmens richtig einzuschätzen, braucht es die richtige Mischung aus Analyse, professionellem Urteilsvermögen und den Zugang zu einer großen Menge relevanter Vergleichsdaten. Wir haben Saxenhammer\n' +
          'Valuation X © entwickelt, damit Unternehmer in wenigen Schritten herausfinden können, welchen Preis das eigene Unternehmen\n' +
          'auf dem Markt erzielen kann.\n' +
          '\n' +
          'Durch den Einsatz von Big Data und fortschrittlicher Analytik\n' +
          'haben wir eine Informationslandschaft geschaffen, die der Tragweite der wichtigsten Entscheidung eines Unternehmerlebens gerecht wird.\n' +
          '\n' +
          'Saxenhammer Valuation X © verbindet Erfahrungswerte aus über 20 Jahren M&A-Praxis mit modernster Technologie, damit Sie die richtigen Entscheidungen treffen können.',
      }}
      bottomPartLeft={{
        title: 'Das Multiplikatorverfahren',
        text:
          'Bei der Erstellung der indikativen Unternehmensbewertung ziehen wir das Multiplikatorverfahren heran. Hierbei wird das Betriebsergebnis bzw. der Umsatz mit einem Faktor multipliziert und so der Unternehmenswert ermittelt.​\n' +
          'Dabei nutzen wir die von Ihnen getätigten Angaben zu Ihrem Unternehmen, um eine möglichst enge und genau Bandbreite für die Bewertungsmultiplikatoren zu errechnen. ​n',
      }}
      bottomPartRight={{
        title: 'Szenarioanalysen',
        text: 'Bei der Ermittlung des Unternehmenswertes werten wir die von Ihnen getätigten Angaben aus und lassen diese in den Multiplikator einfließen. Somit ist der Bewertungsmultiplikator aber auch sensibel gegenüber der Gewichtung der einzelnen Bewertungs-faktoren. ​Um dieser Sensibilität entgegenzuwirken, gewichten wir die einzelnen Faktoren in mehreren Szenarien unterschiedlich. So sind wir in der Lage, Ihnen ein mögliches genaues Bild der Bewertungsbandbreite zu präsentieren.​',
      }}
      bottomTitle="Verfahren & Analysen "
    />
  </Document>
);

function About() {
  const router = useRouter();
  if (EnvironmentService.isProduction() && router.isReady) {
    router.replace('404');
  }

  if (!router.isReady) return null;

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <MyDocument />
    </PDFViewer>
  );
}

export default About;
