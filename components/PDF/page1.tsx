import { getPDFUrl } from 'lib/pdfHelper';
import { PDFSettings } from 'lib/shared-domain/pdf/pdfSettings.facade';
import { PDFContainer } from './components';

export const PDFPage1: React.FC<{ pdfSettings: PDFSettings }> = ({
  pdfSettings,
}) => {
  return (
    <div
      style={{
        pageBreakAfter: 'always',
        height: '842px',
        width: '100%',
        position: 'relative',
      }}
    >
      <div
        style={{
          backgroundImage: `url("${getPDFUrl('page1/bg.png')}")`,
          backgroundSize: 'cover',
          height: '100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div style={{ paddingTop: '30px' }}>
          <PDFContainer>
            <img height="20px" src={getPDFUrl('page1/logo.png')} />
          </PDFContainer>
        </div>

        <PDFContainer>
          <div
            style={{
              marginTop: '400px',
            }}
          >
            <h1 style={{ color: '#001D1A', fontSize: '36px' }}>
              {pdfSettings.page1.title}
            </h1>
            <p style={{ color: '#001D1A' }}>{pdfSettings.page1.text}</p>

            <p
              style={{
                color: '#001D1A',
                fontSize: '8px',
                lineHeight: 1.6,
                position: 'absolute',
                bottom: '30px',
                width: '530px',
              }}
            >
              {pdfSettings.page1.footer}
            </p>
          </div>
        </PDFContainer>
      </div>
    </div>
  );
};
