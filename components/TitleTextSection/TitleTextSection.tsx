import { SectionHeading } from 'components/SectionHeading';
import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { Button } from 'components/Button';
import { SanityBlockContent } from 'components/SanityBlockContent';
import styles from './TitleTextSection.module.scss';
import { TitleTextSectionModule } from 'lib/shared-domain/page/domain/contentModule';

export const TitleTextSection: React.FC<{
  specificContentModule: TitleTextSectionModule;
}> = ({ specificContentModule }) => {
  const { title, subtitle, description, leftButtons, rightButtons } =
    specificContentModule;
  console.log(specificContentModule);
  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <Grid
          justifyContent={'space-between'}
          alignItems={'start'}
          fullWidth={true}
        >
          <GridColumn sm={12} md={7} lg={7}>
            <SectionHeading
              title={title}
              subtitle={subtitle}
              headingType={'h2'}
              align={'left'}
            />
            {leftButtons && leftButtons.length ? (
              <div className={styles.btnWrapper}>
                {leftButtons.map((btn) => (
                  <Button key={btn._key} {...btn}>
                    {btn.title}
                  </Button>
                ))}
              </div>
            ) : null}
          </GridColumn>
          <GridColumn sm={12} md={5} lg={5} className={styles.description}>
            {Array.isArray(description) ? (
              <SanityBlockContent text={description} />
            ) : (
              <p>{description}</p>
            )}
            {rightButtons && rightButtons.length ? (
              <div className={styles.btnWrapper}>
                {rightButtons.map((btn) => (
                  <Button key={btn._key} {...btn}>
                    {btn.title}
                  </Button>
                ))}
              </div>
            ) : null}
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

export default TitleTextSection;
