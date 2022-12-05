import { getPDFUrl } from 'lib/pdfHelper';
import { getEmployeeFullName } from 'lib/shared-domain/employees/domain/getEmployeeFullName';
import { Sector } from 'lib/shared-domain/page/domain';
import { PDFSettings } from 'lib/shared-domain/pdf/pdfSettings.facade';
import { PDFContainer, PDFHeader } from './components';

export const PDFPage4: React.FC<{
  pdfSettings: PDFSettings;
  sector: Sector;
  employeeBase64Image: string;
  numberOfTransactions: number;
}> = ({ pdfSettings, sector, employeeBase64Image, numberOfTransactions }) => {
  const significantTransactions =
    sector?.transactionsTable?.significantTransactions
      ?.map((s) => {
        return `${s.company1.trim()} X ${s.company2.trim()} ${
          s.year ? `(${s.year})` : null
        }`;
      })
      ?.join(', ');


  return (
    <div style={{ pageBreakAfter: 'always', width: '100%' }}>
      <div
        style={{
          backgroundImage: `url("${getPDFUrl('page4/bg.png')}")`,
          backgroundSize: 'cover',
          paddingBottom: '10px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <PDFHeader type="white" pageNumber={3} />
        <PDFContainer>
          <h1 style={{ color: '#ffffff' }}>{sector.name}</h1>
          <p style={{ color: '#ffffff' }}>{sector.description}</p>
        </PDFContainer>
      </div>
      <PDFContainer>
        <div style={{ display: '-webkit-flex' }}>
          <div style={{ width: '50%', paddingRight: '15px' }}>
            <h2 style={{ color: '#001D1A' }}>
              {pdfSettings.page4.leftColTitle}
            </h2>
            <p style={{ color: '#001D1A' }}>{pdfSettings.page4.leftColText}</p>
          </div>
          <div style={{ width: '50%', paddingLeft: '15px' }}>
            <div
              style={{
                backgroundImage: `url("${getPDFUrl('page4/bg2.png')}")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                paddingTop: '5px',
                paddingBottom: '5px',
                paddingLeft: '10px',
                paddingRight: '10px',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  display: '-webkit-flex',
                  borderBottom: '1px solid #ffffff',
                  paddingBottom: '10px',
                  marginBottom: '10px',
                }}
              >
                <div style={{ width: '40%' }}>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#ffffff',
                      lineHeight: 0.8,
                    }}
                  >
                    {pdfSettings.page4.growthRatesTitle}
                  </p>
                </div>
                <div
                  style={{
                    display: '-webkit-flex',
                    width: '60%',
                    paddingLeft: '15px',
                  }}
                >
                  {sector?.growthRatesTable?.growthRates?.map((g) => (
                    <div key={g.title} style={{ paddingRight: '15px' }}>
                      <p
                        style={{
                          fontSize: '11px',
                          color: '#ffffff',
                          lineHeight: 0.8,
                        }}
                      >
                        {g.title}
                      </p>
                      <p
                        style={{
                          fontSize: '8px',
                          color: '#CACACA',
                          lineHeight: 1.4,
                        }}
                      >
                        {g.subtitle}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: '-webkit-flex',
                  borderBottom: '1px solid #ffffff',
                  paddingBottom: '10px',
                  marginBottom: '10px',
                }}
              >
                <div style={{ width: '40%' }}>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#ffffff',
                      lineHeight: 0.8,
                    }}
                  >
                    {pdfSettings.page4.trendsTitle}
                  </p>
                </div>
                <div
                  style={{
                    width: '60%',
                    paddingLeft: '15px',
                  }}
                >
                  {sector?.trendsTable?.trends?.map((t) => (
                    <div key={t.title}>
                      <p
                        style={{
                          fontSize: '11px',
                          color: '#ffffff',
                          lineHeight: 1.2,
                        }}
                      >
                        {t.title}
                      </p>
                      <p
                        style={{
                          fontSize: '8px',
                          color: '#CACACA',
                          lineHeight: 1.4,
                        }}
                      >
                        {t.subtitle}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: '-webkit-flex',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#ffffff',
                      lineHeight: 0.8,
                    }}
                  >
                    {pdfSettings.page4.transactionsTitle}
                  </p>

                  <div
                    style={{
                      display: '-webkit-flex',
                    }}
                  >
                    <div
                      style={{
                        width: '50%',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '8px',
                          color: '#CACACA',
                          lineHeight: 1.4,
                        }}
                      >
                        {pdfSettings.page4.numberOfMAATransactions}
                      </p>
                      <p
                        style={{
                          fontSize: '11px',
                          color: '#ffffff',
                          lineHeight: 0.8,
                        }}
                      >
                        {sector?.transactionsTable?.mAndATransactionsNumber}
                      </p>
                    </div>
                    {sector?.transactionsTable?.significantTransactions
                      ?.length > 0 && (
                      <div
                        style={{
                          width: '50%',
                          paddingLeft: '10px',
                        }}
                      >
                        <p
                          style={{
                            fontSize: '8px',
                            color: '#CACACA',
                            lineHeight: 1.4,
                          }}
                        >
                          {significantTransactions}
                        </p>
                        <p
                          style={{
                            fontSize: '11px',
                            color: '#ffffff',
                            lineHeight: 1.4,
                          }}
                        >
                          {pdfSettings.page4.significantTransactions}
                        </p>
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      display: '-webkit-flex',
                    }}
                  >
                    <div
                      style={{
                        width: '50%',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '8px',
                          color: '#CACACA',
                          lineHeight: 1.4,
                        }}
                      >
                        {pdfSettings.page4.numberOfTransactions}
                      </p>
                      <p
                        style={{
                          fontSize: '11px',
                          color: '#ffffff',
                          lineHeight: 0.8,
                        }}
                      >
                        {numberOfTransactions}
                      </p>
                    </div>
                    {sector?.transactionsTable?.mostPopularTransaction
                      ?.companyName1 &&
                      sector?.transactionsTable?.mostPopularTransaction
                        ?.companyName2 && (
                        <div
                          style={{
                            width: '50%',
                            paddingLeft: '10px',
                          }}
                        >
                          <p
                            style={{
                              fontSize: '8px',
                              color: '#CACACA',
                              lineHeight: 1.4,
                            }}
                          >
                            {pdfSettings.page4.mostPopularTransactions}
                          </p>
                          <p
                            style={{
                              fontSize: '11px',
                              color: '#ffffff',
                              lineHeight: 1.4,
                            }}
                          >
                            {`${sector?.transactionsTable?.mostPopularTransaction?.companyName1} x ${sector?.transactionsTable?.mostPopularTransaction?.companyName2}`}
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
            {sector?.teamSection?.author && (
              <div
                style={{
                  backgroundImage: `url("${getPDFUrl('page4/bg3.png')}")`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  height: '160px',
                }}
              >
                <div
                  style={{
                    display: '-webkit-flex',
                    paddingTop: '10px',
                    paddingLeft: '15px',
                  }}
                >
                  {employeeBase64Image && (
                    <img
                      height="75px"
                      width="auto"
                      style={{ objectFit: 'cover' }}
                      src={employeeBase64Image}
                    />
                  )}

                  <div style={{ paddingLeft: '10px' }}>
                    <h3
                      style={{
                        color: '#001D1A',
                        lineHeight: 1,
                        paddingTop: '15px',
                        fontSize: '11px',
                      }}
                    >
                      {getEmployeeFullName(sector?.teamSection?.author)}
                    </h3>
                    <p
                      style={{
                        color: '#001D1A',
                        lineHeight: 1,
                        fontSize: '9px',
                      }}
                    >
                      {sector?.teamSection?.author?.jobTitle}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    paddingTop: '5px',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '9px',
                      lineHeight: 1.2,
                      color: '#ffffff',
                    }}
                  >
                    {sector?.teamSection?.quote}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </PDFContainer>
    </div>
  );
};
