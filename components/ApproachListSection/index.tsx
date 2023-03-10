import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { ApproachListSectionModule } from 'lib/shared-domain/page/domain/contentModule';
import styles from './ApproachListSection.module.scss';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';

export const ApproachListSection: React.FC<{
  specificContentModule: ApproachListSectionModule;
}> = ({ specificContentModule }) => {
  const { title, subtitle, description, textBlocks } = specificContentModule;
  return (
    <Section size={'sm'} bg={'light'} color={'primary'}>
      <Container>
        <Grid fullWidth={true} justifyContent={'start'} alignItems={'stretch'}>
          <SectionHeading
            title={title}
            subtitle={subtitle}
            description={description}
            headingType={'h2'}
            align={'center'}
            classes={styles.titles}
          />
        </Grid>
        {textBlocks?.map((block) => (
          <Grid
            key={block._key}
            fullWidth={true}
            justifyContent={'space-around'}
            alignItems={'stretch'}
            className={[
              styles.approachItem,
              block.reversed ? styles.reversed : '',
            ].join(' ')}
          >
            <GridColumn sm={12} md={6} lg={6} className={styles.imageCol}>
              <div className={styles.image}>
                <Image
                  unoptimized
                  loading="lazy"
                  src={sanityImageUrlFor(block.image?.asset?.url).url()}
                  alt={block.image?.name}
                  fill
                  style={{
                    maxWidth: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </GridColumn>
            <GridColumn sm={12} md={5} lg={5} className={styles.textCol}>
              <SectionHeading
                title={block.title}
                subtitle={block.subtitle}
                description={block.description}
                headingType={'h3'}
                align={'left'}
              />
            </GridColumn>
          </Grid>
        ))}
      </Container>
    </Section>
  );
};
