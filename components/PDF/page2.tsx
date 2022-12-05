import { getPDFUrl } from 'lib/pdfHelper';
import { PDFSettings } from 'lib/shared-domain/pdf/pdfSettings.facade';
import { PDFContainer, PDFHeader } from './components';

export const PDFPage2: React.FC<{ pdfSettings: PDFSettings }> = ({
  pdfSettings,
}) => {
  return (
    <div style={{ pageBreakAfter: 'always', width: '100%' }}>
      <div
        style={{
          paddingBottom: '10px',
        }}
      >
        <PDFHeader type="dark" pageNumber={1} />
        <PDFContainer>
          <h1 style={{ color: '#001D1A' }}>{pdfSettings.page2.title}</h1>
          <p style={{ color: '#001D1A' }}>{pdfSettings.page2.text}</p>
        </PDFContainer>
        <div
          style={{
            backgroundImage: `url("${getPDFUrl('page2/bg.png')}")`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <PDFContainer>
            <div
              style={{
                marginRight: '200px',
                paddingTop: '20px',
                paddingBottom: '20px',
              }}
            >
              <h2 style={{ color: '#ffffff' }}>
                {pdfSettings.page2.secondTitle}
              </h2>
              <p style={{ color: '#ffffff', fontSize: '10px' }}>
                {pdfSettings.page2.secondText}
              </p>
            </div>
          </PDFContainer>
        </div>
        <PDFContainer>
          <div>
            <h2 style={{ color: '#001D1A' }}>
              {pdfSettings.page2.analyseTitle}
            </h2>
          </div>
          <div
            style={{
              display: '-webkit-flex',
              backgroundImage: `url("${getPDFUrl('page2/bg2.png')}")`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              style={{
                width: '50%',
                paddingRight: '8px',
                paddingLeft: '8px',
                borderRight: '1px solid #ffffff',
              }}
            >
              <p style={{ color: '#ffffff', fontWeight: 500, lineHeight: 0.4 }}>
                {pdfSettings.page2.analyseTabOneTitle}
              </p>
            </div>
            <div
              style={{
                width: '50%',
                paddingLeft: '8px',
                paddingRight: '8px',
              }}
            >
              <p style={{ color: '#ffffff', fontWeight: 500, lineHeight: 0.4 }}>
                {pdfSettings.page2.analyseTabTwoTitle}
              </p>
            </div>
          </div>
          <div style={{ display: '-webkit-flex' }}>
            <div
              style={{
                width: '50%',
                paddingRight: '8px',
                paddingLeft: '8px',
              }}
            >
              <p style={{ color: '#001D1A', fontSize: '8px' }}>
                {pdfSettings.page2.analyseTabOneText}
              </p>
            </div>
            <div
              style={{
                width: '50%',
                paddingRight: '8px',
                paddingLeft: '8px',
              }}
            >
              <p style={{ color: '#001D1A', fontSize: '8px' }}>
                {pdfSettings.page2.analyseTabTwoText}
              </p>
            </div>
          </div>
        </PDFContainer>
      </div>
    </div>
  );
};
