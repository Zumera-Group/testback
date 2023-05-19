import React, { useCallback, useEffect, useState } from 'react';
import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import styles from './WhitePaperDownload.module.scss';
import { WhitePaperForm } from 'components/WhitePaperDownload/WhitePaperForm';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';
import axios from 'axios';
export const WhitePaperDownload: React.FC<any> = ({
  specificContentModule,
}) => {
  const { title, subtitle, description, whitePaperFormFields, image, file } =
    specificContentModule;

  // console.log(specificContentModule);
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
                title={title}
                subtitle={subtitle}
                description={description}
                headingType={'h3'}
                align={'left'}
              />
              <div className={styles.image}>
                <Image
                  unoptimized={true}
                  src={sanityImageUrlFor(image.asset.url).url()}
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
              <WhitePaperForm {...whitePaperFormFields} file={file} />
            </GridColumn>
          </Grid>
        </div>
      </Container>
    </Section>
  );
};
