import Image from "next/legacy/image";
import { Section, Container, Grid, GridColumn } from 'components/Layout';

import { getEmployeeFullName } from 'lib/shared-domain/employees/domain/getEmployeeFullName';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';

import baseStyles from 'components/Hero/Hero.module.scss';
import styles from './SectorHero.module.scss';

export const SectorHero = ({ sector, content }) => {
  const format = useFormatDate();

  const contributorsAsText = sector?.contributors
    ?.map((c) => getEmployeeFullName(c))
    .join(', ');

  const t = (item) => content?.[item];

  const Detail = ({ as, title, text }) => {
    const Component = as || 'div';
    return (
      <Component className={styles.detail}>
        <h3 className={styles.detail_title}>{title}</h3>
        <p className={styles.detail_text}>{text}</p>
      </Component>
    );
  };

  return (
    <Section
      as={'div'}
      classes={[baseStyles.hero].join(' ')}
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
            <h1 className={styles.title}>{sector.name && sector.name}</h1>
            {sector.description && <p>{sector.description}</p>}
            <ul className={styles.details}>
              {sector.date && (
                <Detail
                  as={'li'}
                  title={t('lateUpdate')}
                  text={format(new Date(sector.date))}
                />
              )}
              {sector.type && (
                <Detail as={'li'} title={t('type')} text={sector.type} />
              )}
              {contributorsAsText && (
                <Detail
                  as={'li'}
                  title={t('contributors')}
                  text={contributorsAsText}
                />
              )}
            </ul>
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6}>
            {sector.detailPageHeroImage?.asset?.url && (
              <div className={styles.imageWrapper}>
                <Image
                  unoptimized
                  src={sector.detailPageHeroImage?.asset?.url}
                  alt={'sector.name'}
                  // layout={'fill'}
                  // objectFit={'contain'}
                  // objectPosition={'center center'}
                />
              </div>
            )}
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

export default SectorHero;
