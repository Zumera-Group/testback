import React from 'react';
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

import styles from './EmployeeTeam.module.scss';
import { Employee as IEmployee } from 'lib/shared-domain/employees/domain';
import { Employee } from 'components/NewsGrid';

export const EmployeeTeam: React.FC<{
  employee: IEmployee;
  employees: IEmployee[];
  content: any;
}> = ({ employee, employees, content }) => {
  const swiperPrevRef = useRef();
  const swiperNextRef = useRef();
  const employeesToFilter = [...employees];
  const filteredEmployees = employeesToFilter?.filter(
    (e) => e._id !== employee._id,
  );

  const maxIndex =
    filteredEmployees.length > 3 ? filteredEmployees.length - 3 : 0;
  const randomIndex = Math.floor(Math.random() * maxIndex);
  const display = filteredEmployees.slice(randomIndex, randomIndex + 3);

  if (!filteredEmployees || filteredEmployees.length === 0) return null;

  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'end'}
        >
          <GridColumn xs={12} sm={6} md={7} lg={7}>
            <SectionHeading
              description={
                employee.moreMembersSection?.description || content?.description
              }
              title={employee.moreMembersSection?.title || content?.title}
              subtitle={
                employee.moreMembersSection?.subtitle || content?.subtitle
              }
            />
          </GridColumn>
          {Array.isArray(display) && display.length > 0 && (
            <GridColumn
              xs={12}
              sm={6}
              md={5}
              lg={5}
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
      {Array.isArray(display) && display.length > 0 && (
        <SwiperPeople
          prevButton={swiperPrevRef}
          nextButton={swiperNextRef}
          classes={styles.swiperWrapper}
          slides={1.33}
          lgSlides={2.33}
          xxlSlides={3.33}
        >
          {display?.map((p, index) => (
            <React.Fragment key={index}>
              <SwiperSlide className={styles.slide}>
                <Employee article={p} cardLabel={content.linkText} />
              </SwiperSlide>
            </React.Fragment>
          ))}
        </SwiperPeople>
      )}
    </Section>
  );
};

export default EmployeeTeam;
