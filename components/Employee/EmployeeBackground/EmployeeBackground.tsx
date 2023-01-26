import React from 'react';
import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import styles from './EmployeeBackground.module.scss';
import { Button } from 'components/Button';

export const EmployeeBackground: React.FC<any> = (props) => {
  const { employee, content } = props;
  return (
    <Section as={'div'} size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'start'}
        >
          <GridColumn sm={12} md={6} lg={6} className={styles.leftColumn}>
            <SectionHeading
              title={content.title}
              secondaryTitle={content.subtitle}
              description={employee.description}
              headingType={'h2'}
              align={'left'}
            />
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6} className={styles.rightColumn}>
            <SectionHeading subtitle={'SV HIGHLIGHTS'} align={'left'} />
            {employee?.facts ? (
              <ul className={styles.factsList}>
                {employee?.facts.map((fact, index) => (
                  <li key={index}>{fact}</li>
                ))}
              </ul>
            ) : null}
            <Button
              variant={'secondary'}
              externalUrl={employee.linkedInUrl}
            >
              {content.viewLinkedText}
            </Button>
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};
