import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { SanityBlockContent } from 'components/SanityBlockContent';

import styles from './TextElement.module.scss';

export const TextElement = ({ ...rest }) => {

  const { firstBlock, secondBlock } = rest;

  const TextColumn = ({ content }) => {
    return Array.isArray(content) && content?.length > 0 ? (
      <GridColumn sm={12} md={6} lg={6} className={styles.textColumn}>
        <div className={styles.textElementContent}>
          <SanityBlockContent text={content} />
        </div>
      </GridColumn>
    ) : null;
  };

  return (
    <Section
      size={'sm'}
      bg={'light'}
      color={'primary'}
    >
      <Container>
        <div className={styles.textElement}>
          <Grid
            fullWidth={true}
            justifyContent={'space-between'}
            alignItems={'start'}
          >
            <TextColumn content={firstBlock} />
            <TextColumn content={secondBlock} />
          </Grid>
        </div>
      </Container>
    </Section>
  );
};

export default TextElement;