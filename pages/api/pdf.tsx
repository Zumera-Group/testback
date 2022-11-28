/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import {
  getPDFUrl,
  componentToPDFBuffer,
  getBase64FromImage,
} from 'lib/pdfHelper';
import { NextApiRequest, NextApiResponse } from 'next';
import { PDFPage1 } from 'components/PDF/page1';
import { PDFPage2 } from 'components/PDF/page2';
import { PDFPage3 } from 'components/PDF/page3';
import { PDFPage4 } from 'components/PDF/page4';
import { PDFPage5 } from 'components/PDF/page5';
import { PDFPage6 } from 'components/PDF/page6';
import { PDFSettingsFacade } from 'lib/shared-domain/pdf/pdfSettings.facade';
import { PDFSettings } from '../../lib/shared-domain/pdf/pdfSettings.facade';
import { SectorFacade } from '../../lib/shared-domain/sectors/infrastructure/sector.facade';
import { Sector } from 'lib/shared-domain/page/domain';
import { TransactionFacade } from 'lib/shared-domain/transactions/infrastructure/transaction.facade';

const PDFLayout = ({ children }) => (
  <html>
    <head>
      <meta charSet="utf8" />
      <link rel="stylesheet" href={getPDFUrl('pdf.css')} />
    </head>
    <body style={{ padding: 0, margin: 0 }}>{children}</body>
  </html>
);

const Content: React.FC<{
  pdfSettings: PDFSettings;
  sectorDetail: Sector;
  employeeBase64Image: string;
  numberOfTransactions: number;
  transactionsWithBase64Image: {
    company1: string;
    company2: string;
    text: string;
  }[];
}> = ({
  pdfSettings,
  sectorDetail,
  employeeBase64Image,
  numberOfTransactions,
  transactionsWithBase64Image,
}) => {
  return (
    <div>
      <PDFPage1 pdfSettings={pdfSettings} />
      <PDFPage2 pdfSettings={pdfSettings} />
      <PDFPage3 pdfSettings={pdfSettings} />
      <PDFPage4
        employeeBase64Image={employeeBase64Image}
        sector={sectorDetail}
        pdfSettings={pdfSettings}
        numberOfTransactions={numberOfTransactions}
      />
      <PDFPage5
        transactionsWithBase64Image={transactionsWithBase64Image}
        employeeBase64Image={employeeBase64Image}
        sector={sectorDetail}
        pdfSettings={pdfSettings}
      />
      <PDFPage6 pdfSettings={pdfSettings} />
    </div>
  );
};

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    query: { sectorId },
  } = request;

  const sectorFacade = new SectorFacade();
  const facade = new PDFSettingsFacade();
  const transactionsFacade = new TransactionFacade();

  const sectors = await sectorFacade.getSectors('en');
  const sectorDetail = sectors.find((s) => sectorId === s.id);
  const transactions = await transactionsFacade.getTransactions('en');
  const pdfSettings = await facade.getPDFSettings();

  const filteredTransactions = transactions.filter(
    (t) =>
      t.sectors &&
      t.sectors?.map((s) => s?._id).indexOf(sectorDetail._id) !== -1,
  );

  const employeeBase64Image = sectorDetail?.teamSection?.author
    ?.detailPagePicture?.asset?.url
    ? await getBase64FromImage(
        sectorDetail?.teamSection?.author?.detailPagePicture?.asset?.url,
      )
    : null;

  const lastThreeTransactions = filteredTransactions
    .sort(
      (a, b) =>
        new Date(b.date || null).getTime() - new Date(a.date || null).getTime(),
    )
    ?.slice(0, 3);

  const transactionsWithBase64Image = await Promise.all(
    lastThreeTransactions.map(async (transaction) => {
      return {
        company1: transaction?.companyLogo1?.asset?.url
          ? await getBase64FromImage(transaction?.companyLogo1?.asset?.url)
          : null,
        company2: transaction?.companyLogo2?.asset?.url
          ? await getBase64FromImage(transaction?.companyLogo2?.asset?.url)
          : null,
        text: transaction.headline,
      };
    }),
  );

  const buffer: any = await componentToPDFBuffer(
    <PDFLayout>
      <Content
        employeeBase64Image={employeeBase64Image}
        pdfSettings={pdfSettings}
        sectorDetail={sectorDetail}
        transactionsWithBase64Image={transactionsWithBase64Image}
        numberOfTransactions={filteredTransactions?.length}
      />
    </PDFLayout>,
  );

  response.setHeader('Content-Type', 'application/pdf');
  response.setHeader('Content-Length', buffer.length);
  response.setHeader('Accept-Ranges', 'byte');

  response.end(buffer);
  return response.status(200);
};
