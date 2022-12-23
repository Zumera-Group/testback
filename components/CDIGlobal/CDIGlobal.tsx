import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { Button } from 'components/Button';
import { Marquee } from './Marquee';

import styles from './CDIGlobal.module.scss';

export const CDIGlobal = ({ ...rest }) => {

  const {
    title,
    subtitle,
    description,
    button,
    locations,
    sectionType,
  } = rest;

  const isHeader = sectionType === 'header';

  return (
    <Section
      size={'md'}
      bg={isHeader ? 'primary' : 'light'}
      color={isHeader ? 'white' : 'primary'}
    >
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'start'}
        >
          <GridColumn sm={12} md={7} lg={7}>
            <SectionHeading
              headingType={'h3'}
              title={title}
              subtitle={subtitle}
              description={description}
            />
            {button?.page?.slug?.current && (
              <div className={styles.btnWrapper}>
                <Button
                  variant={'secondary'}
                  link={button?.page}
                  onDark={isHeader}
                >
                  {button?.text}
                </Button>
              </div>
            )}
          </GridColumn>
          <GridColumn sm={12} md={5} lg={5}>
          </GridColumn>
        </Grid>
      </Container>
      <Marquee items={locations} />
    </Section>
  );
};

export default CDIGlobal;