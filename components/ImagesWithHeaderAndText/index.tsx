import React from 'react';
import {ImagesWithHeaderAndTextModule} from 'lib/shared-domain/page/domain/contentModule';
import {
  Section,
  Container
} from 'components/Layout';
import styles from './ImagesWithHeaderAndText.module.scss';
import {RichText} from 'components/BlogModules/RichText';
import Image from 'next/image';
import {sanityImageUrlFor} from 'lib/sanity';
import clsx from 'clsx';

export const ImagesWithHeaderAndText: React.FC<{
  specificContentModule: ImagesWithHeaderAndTextModule;
}> = ({specificContentModule}) => {
  const {columns} = specificContentModule;

  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <div className={clsx(styles.wrapper, styles.wrapper3Col)}>
          {Array.isArray(columns) && columns.map((column, i) =>
            <div key={i} className={clsx(styles.column, styles.column3Col)}>
              {column.image.asset?.url &&
                <div className={styles.columnImgWrapper}>
                  <Image
                    unoptimized
                    loading="lazy"
                    src={sanityImageUrlFor(column.image.asset?.url).quality(80).width(500).url()}
                    fill
                    alt={column.title}
                    className={styles.columnImg}
                  />
                </div>
              }
              {column.title && <h5 className={styles.columnHeader}>{column.title}</h5>}
              {Array.isArray(column.textBlocks) &&
                <div className={styles.columnText}>
                  <RichText content={column.textBlocks}/>
                </div>
              }
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
