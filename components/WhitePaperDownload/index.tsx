import React, { useCallback, useEffect, useState } from 'react';
import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import styles from './WhitePaperDownload.module.scss';
import { WhitePaperForm } from 'components/WhitePaperDownload/WhitePaperForm';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';
import axios from 'axios';
import { Sector, SiteSettings } from 'lib/shared-domain/page/domain';
export const WhitePaperDownload: React.FC<{
  sector: Sector;
  siteSettings: SiteSettings;
  content: any;
  variant: 'sector' | 'blog';
}> = ({ sector, siteSettings, content, variant }) => {
  const {
    whitePaperDownload,
    whitePaperDownload: { whitePaperForm },
  } = content;

  // const {
  //   whitePaperDownload: { pdfThumbnail },
  // } = sector;

  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <div className={styles.content}>
          <Grid
            justifyContent={'space-between'}
            alignItems={'stretch'}
            fullWidth={true}
          >
            <GridColumn sm={12} md={6} lg={6}>
              <SectionHeading
                title={whitePaperDownload?.title}
                description={whitePaperDownload?.description}
                headingType={'h3'}
                align={'left'}
              />
              <div className={styles.image}>
                <Image
                  unoptimized={true}
                  src={sanityImageUrlFor(
                    whitePaperDownload?.pdfThumbnail?.asset?.url,
                  )?.url()}
                  alt={''}
                  fill={true}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </GridColumn>
            <GridColumn sm={12} md={6} lg={6}>
              <WhitePaperForm
                buttonText={whitePaperForm?.submitLabel}
                namePlaceholder={whitePaperForm?.nameLabel}
                emailPlaceholder={whitePaperForm?.emailLabel}
                termsAndConditionsLabel={
                  siteSettings?.contactSectionContent?.contactForm
                }
                successMessage={whitePaperForm?.successMessage}
                errorMessage={whitePaperForm?.errorMessage}
                downloadAgain={whitePaperDownload?.downloadAgain}
                file={sector?.whitePaperDownload?.pdfURL}
                phoneNumber={whitePaperForm?.numberLabel}
                variant={variant}
                sectorName={sector?.name}
              />
            </GridColumn>
          </Grid>
        </div>
      </Container>
    </Section>
  );
};
