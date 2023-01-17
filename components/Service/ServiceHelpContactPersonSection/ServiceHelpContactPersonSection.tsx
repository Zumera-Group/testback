import { ServiceHelpContactSection } from 'lib/shared-domain/page/domain';
import { Container, Grid, GridColumn, Section } from 'components/Layout';
import styles from './ServiceHelpContactPersonSection.module.scss';
import { SectionHeading } from 'components/SectionHeading';
import { Icon } from 'components/Icon';
import { H } from 'components/Typography/H';
import Link from 'next/link';

interface IProps {
  helpContactPerson: ServiceHelpContactSection;
}
export const ServiceHelpContactPersonSection: React.FC<IProps> = ({
  helpContactPerson,
}) => {
  const {
    title,
    description,
    checkmarkTexts,
    cardTitle,
    employee,
    appointmentLinkUrl,
    linkText,
  } = helpContactPerson;

  return (
    <Section size={'md'} bg={'light'} color={'white'}>
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'start'}
          alignItems={'stretch'}
          className={styles.section}
        >
          <GridColumn xs={12} sm={6} md={6} lg={6}>
            <SectionHeading
              title={title}
              description={description}
              headingType={'h3'}
              align={'left'}
            />
            <ul className={styles.checkmarks}>
              {checkmarkTexts.map((checkmark, index) => (
                <li key={index}>
                  <Icon
                    iconName={'tick'}
                    fill={'#fff'}
                    stroke={'#fff'}
                    width={32}
                    height={32}
                  />
                  {checkmark}
                </li>
              ))}
            </ul>
          </GridColumn>
          <GridColumn xs={12} sm={6} md={6} lg={6}>
            <div className={styles.contactPerson}>
              <p className={styles.cardTitle}>{cardTitle}</p>
              <H variant={'h4'} color={'white'} className={styles.name}>
                {employee.title} {employee.firstName} {employee.lastName}
              </H>
              <p className={styles.jobTitle}>{employee.jobTitle}</p>
              {appointmentLinkUrl && linkText && (
                <Link passHref href={appointmentLinkUrl}>
                  <a className={styles.bookLink}>
                    {linkText}
                    <Icon
                      iconName={'arrow-circle'}
                      viewBox={'0 0 32 32'}
                      width={32}
                      height={32}
                    />
                  </a>
                </Link>
              )}
            </div>
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};
