import React from 'react';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { WhitePaperDownload } from './index';

export const WhitePaperDownloadSection: React.FC<{
  specificContentModule: any;
}> = ({ specificContentModule }) => {
  const sharedContent = useSharedContentContext();
  return (
    <WhitePaperDownload
      variant="sector"
      siteSettings={{
        contactSectionContent: {
          contactForm: {
            checkboxPrivacyText1: sharedContent.checkboxPrivacyText1,
            checkboxPrivacyText2: sharedContent.checkboxPrivacyText2,
            checkboxPrivacyText3: sharedContent.checkboxPrivacyText3,
            checkboxPrivacyPage: sharedContent.checkboxPrivacyPage,
          },
        },
      }}
      sector={{
        name: 'Sector',
        whitePaperDownload: {
          pdfURL: specificContentModule.file,
          pdfThumbnail: specificContentModule.image,
        },
      }}
      content={{
        whitePaperDownload: {
          title: specificContentModule.title,
          description: specificContentModule.description,
          whitePaperForm: {
            ...specificContentModule.whitePaperFormFields,
            numberLabel:
              specificContentModule.whitePaperFormFields.phoneNumberLabel,
            submitLabel: sharedContent.downloadButtonContent.buttonCaption,
          },
        },
      }}
    />
  );
};
