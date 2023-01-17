import { Employee } from 'lib/shared-domain/employees/domain';
import { Container, Grid, GridColumn, Section } from 'components/Layout';
import baseStyles from 'components/Hero/Hero.module.scss';
import styles from './EmployeeHero.module.scss';
import Image from 'next/image';

const Detail = ({ as, title, text }) => {
  const Component = as || 'div';
  return (
    <Component className={styles.detail}>
      <h3 className={styles.detail_title}>{title}</h3>
      <p className={styles.detail_text}>{text}</p>
    </Component>
  );
};
export const EmployeeHero: React.FC<{
  employee: Employee;
  content: any;
}> = ({ employee, content }) => {
  const { firstName, lastName, jobTitle } = employee;
  const comaSeparatedSectors = employee?.sectors?.map((s) => {
    return s.name;
  });

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
            <h1 className={styles.title}>
              {firstName} {lastName}
            </h1>
            <p>{jobTitle}</p>
            <ul className={styles.details}>
              {comaSeparatedSectors && (
                <Detail
                  as={'li'}
                  title={content?.sectorTitle}
                  text={comaSeparatedSectors.join(' - ')}
                />
              )}

              {employee.office && (
                <Detail
                  as={'li'}
                  title={content?.officeTitle}
                  text={employee.office?.city}
                />
              )}
            </ul>
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6}>
            {employee.detailPagePicture?.picture?.asset?.url && (
              <div className={styles.imageWrapper}>
                <Image
                  unoptimized
                  src={employee.detailPagePicture?.picture?.asset?.url}
                  alt={'employee.name'}
                  layout={'fill'}
                  objectFit={'cover'}
                  objectPosition={'center center'}
                />
              </div>
            )}
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};
