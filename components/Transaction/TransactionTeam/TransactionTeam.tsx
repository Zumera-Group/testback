import { useRef } from 'react';

import {
  Section,
  Container,
  Grid,
  GridColumn,
  SwiperPeople,
  SwiperNavigationButtons,
} from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';

import { SwiperSlide } from 'swiper/react';

import { Employee } from 'components/NewsGrid';

import styles from './TransactionTeam.module.scss';

export const TransactionTeam = ({ transaction, content }) => {
  const swiperPrevRef = useRef();
  const swiperNextRef = useRef();

  if (!transaction.peopleInvolved || transaction.peopleInvolved.length === 0) {
    return null;
  }

  const { peopleInvolved } = transaction;
  const { title, description, subtitle } = content;

  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'end'}
        >
          <GridColumn xs={12} sm={6} md={6} lg={6}>
            <SectionHeading
              description={description}
              title={title}
              subtitle={subtitle}
            />
          </GridColumn>
          {Array.isArray(peopleInvolved) && peopleInvolved.length > 0 && (
            <GridColumn
              xs={12}
              sm={6}
              md={6}
              lg={6}
              className={styles.navigationColumn}
            >
              <SwiperNavigationButtons
                prev={swiperPrevRef}
                next={swiperNextRef}
              />
            </GridColumn>
          )}
        </Grid>
      </Container>
      {Array.isArray(peopleInvolved) && peopleInvolved.length > 0 && (
        <SwiperPeople
          prevButton={swiperPrevRef}
          nextButton={swiperNextRef}
          classes={styles.swiperWrapper}
          slides={1}
          lgSlides={2}
          xxlSlides={2.3}
        >
          {peopleInvolved?.map((p, index) => (
            <>
              <SwiperSlide className={styles.slide}>
                <Employee article={p} />
              </SwiperSlide>
            </>
          ))}
        </SwiperPeople>
      )}
    </Section>
  );
};

export default TransactionTeam;
