import { Employee } from 'lib/shared-domain/employees/domain';
import { Container, Grid, GridColumn, Section } from 'components/Layout';
import baseStyles from 'components/Hero/Hero.module.scss';
import styles from './EmployeeHero.module.scss';
import Image from "next/legacy/image";

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
  const commaSeparatedSectors = employee?.sectors?.map((s) => {
    return s.name;
  });

  return (
    <Section
      as={'div'}
      classes={[baseStyles.hero, styles.hero].join(' ')}
      size={'lg'}
      bg={'light'}
      color={'primary'}
    >
      <Container classes={styles.heroContainer}>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <GridColumn sm={12} md={6} lg={6}>
            <h1 className={styles.title}>
              {firstName} {lastName}
            </h1>
            <h4>{jobTitle}</h4>
            <ul className={styles.details}>
              {commaSeparatedSectors && employee?.sectors?.length > 0 && (
                <Detail
                  as={'li'}
                  title={content?.sectorTitle}
                  text={commaSeparatedSectors.join(' - ')}
                />
              )}

              {employee?.office && (
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
                  alt={`${employee.firstName} ${employee.lastName}`}
                  // layout={'fill'}
                  // objectFit={'cover'}
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
