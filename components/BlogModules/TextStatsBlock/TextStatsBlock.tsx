import React from 'react';
import { RichText } from '../RichText';
import { Container, Grid, GridColumn } from 'components/Layout';
import styles from './TextStatsBlock.module.scss';
import { StatsCircle } from '../StatsCircle';

export const TextStatsBlock = ({ specificContentModule }) => {
  const { subheading, text, statistics, anchor } = specificContentModule;
  return (
    <Container classes={styles.textStatsWrapper} id={anchor}>
      <div className={styles.innerOffset}>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          className={styles.content}
        >
          <GridColumn sm={12} md={6} lg={8}>
            {subheading && <h4>{subheading}</h4>}
            <RichText content={text} />
          </GridColumn>
          <GridColumn sm={12} md={6} lg={3} className={styles.statsWrapper}>
            <StatsCircle number={statistics.number} />
            <span className={styles.description}>{statistics.description}</span>
          </GridColumn>
        </Grid>
      </div>
    </Container>
  );
};

export default TextStatsBlock;
