import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import styles from './PartnerVisionSection.module.scss';
import { SanityBlockContent } from 'components/SanityBlockContent';
export const PartnerVisionSection: React.FC<any> = ({
  specificContentModule,
}) => {
  const { title, subtitle, description, bulletTitle, bulletPoints } =
    specificContentModule;
  // console.log(specificContentModule);
  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <Grid
          justifyContent={'space-between'}
          alignItems={'start'}
          fullWidth={true}
        >
          <GridColumn sm={12} md={6} lg={6}>
            <SectionHeading
              title={title}
              subtitle={subtitle}
              description={description}
              headingType={'h2'}
              align={'left'}
            />
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6}>
            <h4 className={styles.bulletTitle}>{bulletTitle}</h4>
            <ul className={styles.items}>
              {bulletPoints.map((item) => (
                <li key={item._key}>
                  <h5>{item.title}</h5>
                  <SanityBlockContent text={item.description} />
                </li>
              ))}
            </ul>
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};
