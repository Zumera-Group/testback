import React from 'react';
import { Container, Grid, GridColumn, Section } from 'components/Layout';
import baseStyles from '../Hero.module.scss';
import { SectionHeading } from 'components/SectionHeading';
import styles from './AnchorHero.module.scss';
import { useRouter } from 'next/router';

export const AnchorHero: React.FC<any> = ({
  allPageContent,
  title,
  title2,
  description,
}) => {
  const router = useRouter();

  const pageSections = allPageContent.filter(
    (item) =>
      item.specificContentModule?.constructor &&
      item.specificContentModule.constructor.name !== 'HeroSectionModule',
  );
  const smoothScrollTo = (e, id) => {
    e.preventDefault();
    const toElement = document.getElementById(id);
    window.scroll({
      top: toElement.offsetTop - 100,
      left: 0,
      behavior: 'smooth',
    });
  };
  return (
    <Section
      as={'div'}
      classes={[baseStyles.hero].join(' ')}
      size={'xl'}
      bg={'light'}
      color={'primary'}
    >
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'start'}
        >
          <GridColumn sm={12} md={6} lg={6} className={styles.titles}>
            <SectionHeading
              title={title}
              description={description}
              headingType={router.locale === 'de' ? 'h3' : 'h2'}
              align={'left'}
            />
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6}>
            <div>{title2}</div>
            <ul className={styles.anchorLinks}>
              {pageSections.map((section) => {
                const { specificContentModule } = section;
                return (
                  <li key={section._key}>
                    <span
                      onClick={(e) =>
                        smoothScrollTo(
                          e,
                          specificContentModule.title.replaceAll(' ', '-'),
                        )
                      }
                    >
                      {specificContentModule.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};
