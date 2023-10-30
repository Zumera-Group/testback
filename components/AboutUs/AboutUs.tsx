import { SectionHeading } from 'components/SectionHeading';
import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { Button } from 'components/Button';
import { BulletPoints } from './BulletPoints';
import { SanityBlockContent } from 'components/SanityBlockContent';

import { SCREEN_SIZE_MD } from 'lib/constants';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';

import styles from './AboutUs.module.scss';

export const AboutUs = ({ ...rest }) => {
  const { title, subtitle, description, link, bulletPoints } = rest;

  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);

  const CTA = () => {
    if (!link?.page?.slug?.current) return null;
    return (
      <div className={styles.btnWrapper}>
        <Button variant={'secondary'} link={link?.page} onDark={false}>
          {link?.title}
        </Button>
      </div>
    );
  };

  return (
    <Section size={'md'} bg={'light'} color={'primary'} id={'about'}>
      <Container>
        <Grid
          justifyContent={'space-between'}
          alignItems={'start'}
          fullWidth={true}
        >
          <GridColumn sm={12} md={6} lg={6} className={styles.title}>
            <SectionHeading
              title={title}
              subtitle={subtitle}
              headingType={'h2'}
              align={'left'}
            />
            {!isMobile && <CTA />}
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6} className={styles.description}>
            {Array.isArray(description) ? (
              <SanityBlockContent text={description} />
            ) : (
              <p>{description}</p>
            )}
            {isMobile && <CTA />}
          </GridColumn>
        </Grid>
        {bulletPoints?.length > 0 && (
          <BulletPoints bulletPoints={bulletPoints} />
        )}
      </Container>
    </Section>
  );
};

export default AboutUs;
