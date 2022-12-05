import { getPDFUrl } from 'lib/pdfHelper';

export const PDFContainer: React.FC = ({ children }) => {
  return (
    <div style={{ paddingRight: '20px', paddingLeft: '20px' }}>{children}</div>
  );
};

export const PDFHeader: React.FC<{
  type: 'dark' | 'white';
  pageNumber: number;
}> = ({ type, pageNumber }) => (
  <PDFContainer>
    <div
      style={{
        paddingTop: '5px',
        paddingBottom: '5px',
        display: '-webkit-flex',
        borderBottom:
          type === 'dark' ? '1px solid #001D1A' : '1px solid #ffffff',
      }}
    >
      <p
        style={{
          lineHeight: 0.8,
          color: type === 'dark' ? '#001D1A' : '#ffffff',
        }}
      >
        {pageNumber}
      </p>
      <div style={{ marginLeft: 'auto', marginTop: '12px' }}>
        <img
          height="10px"
          src={getPDFUrl(
            type === 'dark' ? 'header/logo-dark.png' : 'header/logo-white.png',
          )}
        />
      </div>
    </div>
  </PDFContainer>
);
