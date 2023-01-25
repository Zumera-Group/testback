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

import styles from './SectorTeam.module.scss';

export const SectorTeam = ({ sector }) => {
  const swiperPrevRef = useRef();
  const swiperNextRef = useRef();

  if (
    !sector.contributors ||
    sector.contributors.length === 0 ||
    !sector.teamSection
  )
    return null;
  console.log(sector);
  const { teamSection, contributors } = sector;

  const Quote = () => {
    return (
      <blockquote className={styles.quote}>
        <p>{teamSection.quote}</p>
        <cite>
          {sector.teamSection.author?.jobTitle}
          <span>{`${sector.teamSection.author?.firstName} ${sector.teamSection.author?.lastName}`}</span>
        </cite>
      </blockquote>
    );
  };

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
              description={teamSection.description}
              title={teamSection.title}
              subtitle={teamSection.subtitle}
            />
          </GridColumn>
          {Array.isArray(contributors) && contributors.length > 0 && (
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
      {Array.isArray(contributors) && contributors.length > 0 && (
        <SwiperPeople
          prevButton={swiperPrevRef}
          nextButton={swiperNextRef}
          classes={styles.swiperWrapper}
          slides={1}
          lgSlides={2}
          xxlSlides={2.3}
        >
          {contributors?.map((p, index) => (
            <>
              <SwiperSlide className={styles.slide}>
                <Employee article={p} cardLabel={sector.teamSection.linkText} />
              </SwiperSlide>
              {index === 0 && teamSection ? (
                <SwiperSlide
                  className={styles.slide}
                  key={`sectorTeamQuote-${index}`}
                >
                  <Quote />
                </SwiperSlide>
              ) : null}
            </>
          ))}
        </SwiperPeople>
      )}
    </Section>
  );
};

export default SectorTeam;
