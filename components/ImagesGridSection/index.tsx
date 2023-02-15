import { Container, Grid, GridColumn, Section } from 'components/Layout';
import React, { useEffect, useState } from 'react';
import { ImagesGridSectionModule } from 'lib/shared-domain/page/domain/contentModule';
import styles from './ImagesGridSection.module.scss';
import Image from "next/image";

export const ImagesGridSection: React.FC<{
  specificContentModule: ImagesGridSectionModule;
}> = ({ specificContentModule }) => {
  const { images } = specificContentModule;
  const [displayImage, setDisplayImages] = useState([]);
  const chunkSize = 2;

  useEffect(() => {
    let chunk = images.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / chunkSize);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);
    setDisplayImages(chunk);
  }, [images]);

  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container classes={styles.container}>
        {displayImage.map((chunkImg, topIndex) => {
          const isOddLine = topIndex % 2 === 0;
          return (
            <Grid
              key={topIndex}
              justifyContent={'space-between'}
              alignItems={'stretch'}
              className={styles.row}
            >
              {isOddLine ? (
                <>
                  <GridColumn
                    xs={12}
                    sm={8}
                    md={8}
                    lg={8}
                    className={styles.imageWrapper}
                  >
                    <img src={chunkImg[0]?.asset?.url} alt={''} />
                  </GridColumn>
                  <GridColumn
                    xs={12}
                    sm={4}
                    md={4}
                    lg={4}
                    className={styles.imageWrapper}
                  >
                    <img src={chunkImg[1]?.asset?.url} alt={''} />
                  </GridColumn>
                </>
              ) : (
                <>
                  <GridColumn
                    xs={12}
                    sm={4}
                    md={4}
                    lg={4}
                    className={styles.imageWrapper}
                  >
                    <img src={chunkImg[0]?.asset?.url} alt={''} />
                  </GridColumn>
                  <GridColumn
                    xs={12}
                    sm={8}
                    md={8}
                    lg={8}
                    className={styles.imageWrapper}
                  >
                    <img src={chunkImg[1]?.asset?.url} alt={''} />
                  </GridColumn>
                </>
              )}
            </Grid>
          );
        })}
      </Container>
    </Section>
  );
};
