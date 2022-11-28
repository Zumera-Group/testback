import { getPDFUrl } from 'lib/pdfHelper';
import { PDFSettings } from 'lib/shared-domain/pdf/pdfSettings.facade';
import { PDFContainer, PDFHeader } from './components';

const Indicator = () => {
  return (
    <div
      style={{
        width: '130px',
        height: '12px',
        display: '-webkit-flex',
        flexDirection: 'row',
      }}
    >
      <div style={{ width: '33%', backgroundColor: '#3DDFBA' }} />
      <div style={{ width: '33%', backgroundColor: '#0C4E40' }} />
      <div style={{ width: '33%', backgroundColor: '#17AA8B' }} />
    </div>
  );
};

export const PDFPage3: React.FC<{ pdfSettings: PDFSettings }> = ({
  pdfSettings,
}) => {
  return (
    <div style={{ pageBreakAfter: 'always', width: '100%' }}>
      <div
        style={{
          backgroundImage: `url("${getPDFUrl('page3/bg.png')}")`,
          backgroundSize: 'cover',
          paddingBottom: '10px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <PDFHeader type="white" pageNumber={2} />
        <PDFContainer>
          <h1 style={{ color: '#ffffff' }}>{pdfSettings.page3.title}</h1>
          <p style={{ color: '#ffffff' }}>{pdfSettings.page3.text}</p>
        </PDFContainer>
      </div>
      <div>
        <PDFContainer>
          <div>
            <h2 style={{ color: '#001D1A' }}>Ihr Unternehmen</h2>
          </div>

          <div style={{ display: '-webkit-flex', flexDirection: 'row' }}>
            <div
              style={{
                borderRight: '1px solid #000000',
                paddingRight: '6px',
                marginRight: '6px',
              }}
            >
              <p style={{ fontWeight: '500' }}>800.000 €</p>
              <p style={{ fontSize: '8px', lineHeight: '4px' }}>Umsatz</p>
            </div>
            <div
              style={{
                borderRight: '1px solid #000000',
                paddingRight: '6px',
                marginRight: '6px',
              }}
            >
              <p style={{ fontWeight: '500' }}>Umwelttechnik</p>
              <p style={{ fontSize: '8px', lineHeight: '4px' }}>Branche</p>
            </div>
            <div
              style={{
                borderRight: '1px solid #000000',
                paddingRight: '6px',
                marginRight: '6px',
              }}
            >
              <p style={{ fontWeight: '500' }}>21-30</p>
              <p style={{ fontSize: '8px', lineHeight: '4px' }}>
                Kundenstruktur
              </p>
            </div>
            <div
              style={{
                borderRight: '1px solid #000000',
                paddingRight: '6px',
                marginRight: '6px',
              }}
            >
              <p style={{ fontWeight: '500' }}>1.600.000 €</p>
              <p style={{ fontSize: '8px', lineHeight: '4px' }}>Gewinn EBIT</p>
            </div>
            <div
              style={{
                borderRight: '1px solid #000000',
                paddingRight: '6px',
                marginRight: '6px',
              }}
            >
              <p style={{ fontWeight: '500' }}>Niedrig</p>
              <p style={{ fontSize: '8px', lineHeight: '4px' }}>
                Abhängig vom Eigentümer
              </p>
            </div>
            <div>
              <p style={{ fontWeight: '500' }}>5%</p>
              <p style={{ fontSize: '8px', lineHeight: '4px' }}>
                Anteile des größten Kunden
              </p>
            </div>
          </div>

          <div>
            <h2 style={{ color: '#001D1A' }}>Unsere Analyse</h2>
            <p style={{ color: '#001D1A' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do
              eiusmod tempor.
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            <div
              style={{
                display: '-webkit-flex',
                flexDirection: 'row',
                background:
                  'linear-gradient(90deg, #11302D 0%, #066250 32.73%, #17AA8B 80.33%, #3DDFBA 114.25%)',
              }}
            >
              <div
                style={{
                  borderRight: '1px solid #ffffff',
                  width: '20%',
                  paddingLeft: '6px',
                  paddingRight: '6px',
                }}
              >
                <p
                  style={{
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: 500,
                    lineHeight: '12px',
                  }}
                >
                  Szenario
                </p>
              </div>
              <div
                style={{
                  borderRight: '1px solid #ffffff',
                  width: '50%',
                  paddingLeft: '6px',
                  paddingRight: '6px',
                }}
              >
                <p
                  style={{
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: 500,
                    lineHeight: '12px',
                  }}
                >
                  Unternehmenswert
                </p>
              </div>
              <div
                style={{
                  width: '30%',
                  paddingLeft: '6px',
                  paddingRight: '6px',
                }}
              >
                <p
                  style={{
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: 500,
                    lineHeight: '12px',
                  }}
                >
                  Einschätzung
                </p>
              </div>
            </div>
            <div
              style={{
                display: '-webkit-flex',
                flexDirection: 'row',
                borderBottom: '1px solid #0C4E40',
                paddingTop: '8px',
                paddingBottom: '8px',
              }}
            >
              <div
                style={{
                  width: '20%',
                  paddingLeft: '6px',
                  paddingRight: '6px',
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#595959',
                  }}
                >
                  1 - Best
                </p>
              </div>
              <div
                style={{
                  width: '50%',
                  paddingLeft: '6px',
                  paddingRight: '6px',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', top: '15px', left: '45%' }}>
                  <Indicator />
                </div>
              </div>
              <div
                style={{
                  width: '30%',
                  paddingLeft: '6px',
                  paddingRight: '6px',
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#595959',
                  }}
                >
                  EUR 29 - 33 Mio.
                </p>
              </div>
            </div>
            <div
              style={{
                display: '-webkit-flex',
                flexDirection: 'row',
                borderBottom: '1px solid #0C4E40',
                paddingTop: '8px',
                paddingBottom: '8px',
              }}
            >
              <div
                style={{
                  width: '20%',
                  paddingLeft: '6px',
                  paddingRight: '6px',
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#595959',
                  }}
                >
                  2 - Average
                </p>
              </div>
              <div
                style={{
                  width: '50%',
                  paddingLeft: '6px',
                  paddingRight: '6px',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', top: '15px', left: '25%' }}>
                  <Indicator />
                </div>
              </div>
              <div
                style={{
                  width: '30%',
                  paddingLeft: '6px',
                  paddingRight: '6px',
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#595959',
                  }}
                >
                  EUR 26 - 28 Mio.
                </p>
              </div>
            </div>
            <div
              style={{
                display: '-webkit-flex',
                flexDirection: 'row',
                borderBottom: '1px solid #0C4E40',
                paddingTop: '8px',
                paddingBottom: '8px',
              }}
            >
              <div
                style={{
                  width: '20%',
                  paddingLeft: '6px',
                  paddingRight: '6px',
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#595959',
                  }}
                >
                  3 - Worst
                </p>
              </div>
              <div
                style={{
                  width: '50%',
                  paddingLeft: '6px',
                  paddingRight: '6px',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', top: '15px', left: '5%' }}>
                  <Indicator />
                </div>
              </div>
              <div
                style={{
                  width: '30%',
                  paddingLeft: '6px',
                  paddingRight: '6px',
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#595959',
                  }}
                >
                  EUR 23 - 26 Mio.
                </p>
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                left: '35%',
                top: 25,
                height: '260px',
                padding: '6px',
                width: '80px',
              }}
            >
              <div
                style={{
                  backgroundImage: `url("${getPDFUrl(
                    'page3/transparent-bg.png',
                  )}")`,
                  backgroundSize: 'cover',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#595959',
                    textAlign: 'center',
                    lineHeight: '6px',
                  }}
                >
                  23 - 29
                </p>
                <p
                  style={{
                    fontSize: '8px',
                    color: '#595959',
                    textAlign: 'center',
                  }}
                >
                  Bewertungsbandbreite
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              boxShadow: '4.98661px 8.31102px 33.2441px rgba(0, 29, 26, 0.25)',
              backgroundColor: '#ffffff',
              padding: '6px',
              textAlign: 'center',
              marginTop: '100px',
            }}
          >
            <p style={{ color: '#001D1A', fontWeight: 500 }}>
              Bei Bewertungsbandrbeite von 23 - 29 Mio. errechnet ... ein EBIT
              Multiplikator von xy - xy.
            </p>
          </div>
        </PDFContainer>
      </div>
    </div>
  );
};
