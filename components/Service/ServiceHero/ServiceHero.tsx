import Image from "next/image";
import { Section, Container, Grid, GridColumn } from 'components/Layout';

import baseStyles from 'components/Hero/Hero.module.scss';
import styles from './ServiceHero.module.scss';

export const ServiceHero = ({ service }) => {
  return (
    <Section
      as={'div'}
      classes={[baseStyles.hero, styles.serviceHero].join(' ')}
      size={'lg'}
      bg={'light'}
      color={'primary'}
    >
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <GridColumn sm={12} md={6} lg={6}>
            <h1 className={styles.title}>{service.name && service.name}</h1>
            {service.description && <p>{service.description}</p>}
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6}>
            {service.detailPageHeroImage?.asset?.url && (
              <div className={styles.imageWrapper}>
                <Image
                  unoptimized
                  src={service.detailPageHeroImage?.asset?.url}
                  // layout={'fill'}
                  // objectFit={'contain'}
                  // objectPosition={'center center'}
                  alt={'service.name'}
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              </div>
            )}
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

export default ServiceHero;
