import Image from 'next/image';
import { Container, Grid, GridColumn, Section } from 'components/Layout';

import baseStyles from 'components/Hero/Hero.module.scss';
import { Employee } from 'components/NewsGrid/Cards/Employee';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';

import styles from './NewsArticleTeam.module.scss';

interface Props {
  employees: any;
  content?: any;
}

const NewsArticleTeam: React.FC<Props> = ({ employees, content }) => {
  return (
    <Section
      as={'div'}
      classes={[baseStyles.hero, styles.wrapper].join(' ')}
      size={'lg'}
      bg={'light'}
      color={'primary'}
    >
      <Container classes={styles.container}>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <GridColumn sm={12} md={12} lg={12}>
            <h2 className={styles.title}>{content.title}</h2>
          </GridColumn>
          {employees.map((item) => (
            <GridColumn sm={12} md={6} lg={6} key={item._id}>
              <Employee article={item} cardLabel={''} />
            </GridColumn>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default NewsArticleTeam;
