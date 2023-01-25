import { Container, Grid, GridColumn, Section } from 'components/Layout';
import styles from './TextWithImageGrid.module.scss';
import { Sector } from 'lib/shared-domain/page/domain';
import { SectionHeading } from 'components/SectionHeading';
import { Button } from 'components/Button';
import Image from 'next/image';
import { TextWithImageGridModule } from 'lib/shared-domain/page/domain/contentModule';
import { Icon } from 'components/Icon';

export const TextWithImageGrid: React.FC<{
  specificContentModule: TextWithImageGridModule;
}> = ({ specificContentModule }) => {
  const { title, subtitle, description, button, background, image, bullets } =
    specificContentModule;

  const sectionStyles = [
    styles.gridContainer,
    styles[`bg-${background}`] || styles['bg-light'],
  ].join(' ');

  return (
    <Section size={'lg'} bg={'light'} color={'white'}>
      <Container classes={sectionStyles}>
        <Grid
          fullWidth={true}
          justifyContent={'start'}
          alignItems={'center'}
          className={styles.grid}
        >
          <GridColumn sm={12} md={6} lg={6}>
            <SectionHeading
              title={title}
              subtitle={subtitle}
              description={description}
              headingType={'h3'}
              align={'left'}
            />
            {button.title ? (
              <Button {...button} onDark={background !== 'light'}>
                {button.title}
              </Button>
            ) : null}
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6} className={styles.imageCol}>
            <Image
              unoptimized
              loading="lazy"
              src={image?.asset?.url}
              alt={image?.name}
              objectFit="contain"
              layout="fill"
            />
          </GridColumn>
        </Grid>
        {bullets && bullets.length ? (
          <Grid
            fullWidth={true}
            justifyContent={'start'}
            alignItems={'center'}
            className={styles.bullets}
          >
            {bullets.map((bullet) => (
              <GridColumn
                key={bullet}
                sm={12}
                md={4}
                lg={4}
                className={styles.bullet}
              >
                <Icon iconName={'tick'} width={32} height={32} />
                <div>{bullet}</div>
              </GridColumn>
            ))}
          </Grid>
        ) : null}
      </Container>
    </Section>
  );
};
