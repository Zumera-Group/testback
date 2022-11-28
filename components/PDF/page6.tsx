import { getPDFUrl } from 'lib/pdfHelper';
import { PDFSettings } from 'lib/shared-domain/pdf/pdfSettings.facade';
import { PDFContainer } from './components';

export const PDFPage6: React.FC<{ pdfSettings: PDFSettings }> = ({
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
          backgroundImage: `url("${getPDFUrl('page6/bg.png')}")`,
          backgroundSize: 'cover',
          height: '100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div style={{ paddingTop: '30px' }}>
          <PDFContainer>
            <img height="20px" src={getPDFUrl('page6/logo.png')} />
          </PDFContainer>
        </div>
        <PDFContainer>
          <p
            style={{
              color: '#ffffff',
              fontSize: '8px',
              lineHeight: 1.6,
              position: 'absolute',
              bottom: '30px',
              width: '530px',
            }}
          >
            {pdfSettings.page6.footer}
          </p>
        </PDFContainer>
      </div>
    </div>
  );
};
