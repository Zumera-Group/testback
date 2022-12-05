import { getBase64FromImage, getPDFUrl } from 'lib/pdfHelper';
import { getEmployeeFullName } from 'lib/shared-domain/employees/domain/getEmployeeFullName';
import { Sector } from 'lib/shared-domain/page/domain';
import { PDFSettings } from 'lib/shared-domain/pdf/pdfSettings.facade';
import { PDFContainer, PDFHeader } from './components';

const Transaction: React.FC<{
  company1: string;
  company2: string;
  text: string;
}> = ({ text, company1, company2 }) => {
  return (
    <div
      style={{
        backgroundImage: `url("${getPDFUrl('page5/bg2.png')}")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100px',
        marginBottom: '10px',
      }}
    >
      <div
        style={
          {
            width: '100%',
            display: '-webkit-flex',
            '-webkit-justify-content': 'center',
            paddingTop: '20px',
          } as any
        }
      >
        <div style={{ width: '50px' }}>
          {company1 && (
            <img
              style={{ display: 'block', objectFit: 'cover' }}
              width="50px"
              height="20px"
              src={company1}
            />
          )}
        </div>
        <img
          style={{
            display: 'block',
            paddingLeft: '15px',
            paddingRight: '15px',
          }}
          height="20px"
          src={getPDFUrl('page5/x.png')}
        />
        <div style={{ width: '50px' }}>
          {company2 && (
            <img
              style={{ display: 'block', objectFit: 'cover' }}
              width="50px"
              height="20px"
              src={company2}
            />
          )}
        </div>
      </div>
      <div
        style={{
          paddingTop: '15px',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <p style={{ color: '#ffffff', fontSize: '8px', lineHeight: 1.6 }}>
          {text}
        </p>
      </div>
    </div>
  );
};

export const PDFPage5: React.FC<{
  pdfSettings: PDFSettings;
  sector: Sector;
  employeeBase64Image: string;
  transactionsWithBase64Image: {
    company1: string;
    company2: string;
    text: string;
  }[];
}> = ({
  pdfSettings,
  sector,
  employeeBase64Image,
  transactionsWithBase64Image,
}) => {
  return (
    <div style={{ pageBreakAfter: 'always', width: '100%' }}>
      <div
        style={{
          paddingBottom: '10px',
        }}
      >
        <PDFHeader type="dark" pageNumber={4} />
        <PDFContainer>
          <h1 style={{ color: '#001D1A' }}> {pdfSettings.page5.title}</h1>
          <p style={{ color: '#001D1A' }}>{pdfSettings.page5.text}</p>
        </PDFContainer>
      </div>
      <div
        style={{
          backgroundImage: `url("${getPDFUrl('page5/bg.png')}")`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <PDFContainer>
          <div
            style={{
              paddingTop: '20px',
              paddingBottom: '20px',
            }}
          >
            <div style={{ display: '-webkit-flex' }}>
              <div style={{ width: '45%', paddingRight: '15px' }}>
                <h2 style={{ color: '#ffffff' }}>
                  {pdfSettings.page5.bgTitle}
                </h2>
                <p style={{ color: '#ffffff' }}>{pdfSettings.page5.bgText}</p>
              </div>
              <div style={{ width: '55%', paddingLeft: '15px' }}>
                {sector?.teamSection?.author && (
                  <div style={{ display: '-webkit-flex', marginTop: '50px' }}>
                    {employeeBase64Image && (
                      <img
                        height="150px"
                        width="auto"
                        style={{ objectFit: 'cover' }}
                        src={employeeBase64Image}
                      />
                    )}

                    <div style={{ paddingLeft: '10px' }}>
                      <h3
                        style={{
                          color: '#ffffff',
                          lineHeight: 1,
                          paddingTop: '15px',
                        }}
                      >
                        {getEmployeeFullName(sector?.teamSection?.author)}
                      </h3>
                      <p
                        style={{
                          color: '#ffffff',
                          lineHeight: 1,
                          paddingBottom: '10px',
                          fontSize: '10px',
                        }}
                      >
                        {sector?.teamSection?.author?.jobTitle}
                      </p>
                      {sector?.teamSection?.author?.mobile && (
                        <p
                          style={{
                            color: '#ffffff',
                            lineHeight: 1,
                            fontSize: '10px',
                          }}
                        >
                          {`M ${sector?.teamSection?.author?.mobile}`}
                        </p>
                      )}
                      {sector?.teamSection?.author?.phone && (
                        <p
                          style={{
                            color: '#ffffff',
                            lineHeight: 1,
                            fontSize: '10px',
                          }}
                        >
                          {`P ${sector?.teamSection?.author?.phone}`}
                        </p>
                      )}
                      {sector?.teamSection?.author?.email && (
                        <p
                          style={{
                            color: '#ffffff',
                            lineHeight: 1,
                            fontSize: '10px',
                          }}
                        >
                          {`E ${sector?.teamSection?.author?.email}`}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </PDFContainer>
      </div>
      <PDFContainer>
        <div style={{ display: '-webkit-flex' }}>
          <div style={{ width: '45%', paddingRight: '15px' }}>
            <h2 style={{ color: '#001D1A' }}>
              {pdfSettings.page5.leftColTitle}
            </h2>
            <p style={{ color: '#001D1A' }}>{pdfSettings.page5.leftColText}</p>
          </div>
          <div
            style={{ width: '55%', paddingLeft: '15px', paddingTop: '15px' }}
          >
            {transactionsWithBase64Image?.map((transaction, index) => (
              <Transaction {...transaction} key={index} />
            ))}
          </div>
        </div>
      </PDFContainer>
    </div>
  );
};
