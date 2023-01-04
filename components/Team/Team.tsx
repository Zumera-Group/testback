import { useRef } from 'react';

import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { Employee } from 'components/NewsGrid';

import { SwiperPeople, NavigationButtons } from 'components/Layout/SwiperPeople';
import { SwiperSlide } from 'swiper/react';

import { useFetchEmployees } from 'lib/shared-domain/employees/application/useGetEmployees';

import styles from './Team.module.scss';

interface Props {
  title?: string;
  subtitle?: string;
  description?: any;
}

export const Team: React.FC<Props> = ({ ...rest }) => {
  const swiperPrevRef = useRef();
  const swiperNextRef = useRef();

  const { title, subtitle, description } = rest;

  const fallbackIndex = 99;
  const employees = useFetchEmployees();

  const ordered = employees?.sort((a, b) =>
    (a.listOrderIndex != null ? a.listOrderIndex : fallbackIndex) <
    (b.listOrderIndex != null ? b.listOrderIndex : fallbackIndex)
      ? -1
      : 1,
  );

  return (
    <Section
      size={'md'}
      bg={'light'}
      color={'primary'}
    >
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'end'}>
          <GridColumn xs={12} sm={6} md={6} lg={6}>
            <SectionHeading
              title={title}
              subtitle={subtitle}
              description={description}
            />
          </GridColumn>
          <GridColumn xs={12} sm={6} md={6} lg={6} className={styles.navigationColumn}>
            <NavigationButtons
              prev={swiperPrevRef}
              next={swiperNextRef} />
          </GridColumn>
        </Grid>
      </Container>
      <SwiperPeople
        prevButton={swiperPrevRef}
        nextButton={swiperNextRef}
        classes={styles.swiperWrapper}
      >
        {ordered
          ?.filter((e) => !e.hasLeftTheTeam && !e.isInLeadershipTeam)
          ?.map((member, index) => (
            <SwiperSlide key={`TeamMember-${index}`}>
              <Employee article={member} />
            </SwiperSlide>
        ))}
      </SwiperPeople>
    </Section>
  );
};

export default Team;