import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { useFetchJobs } from 'lib/shared-domain/jobs/application/useGetJobs';
import { JobItem } from 'components/OpenJobsList/JobItem';
import { useRouter } from 'next/router';
import styles from './OpenJobsList.module.scss';

export const OpenJobsList: React.FC<any> = ({ specificContentModule }) => {
  const { title, subtitle, description } = specificContentModule;
  const jobs = useFetchJobs();
  const { query } = useRouter();
  const personioTrackingID = query?._pc;
  const sortedJobs = jobs.sort((a, b) =>
    a.department > b.department ? 1 : -1,
  );
  console.log(sortedJobs);
  return (
    <>
      <div id="jobsList" className={styles.empty}></div>
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
                description={description}
                headingType={'h2'}
                align={'left'}
              />
            </GridColumn>
            <GridColumn sm={12} md={12} lg={12}>
              {sortedJobs.map((item) => (
                <JobItem
                  key={item._id}
                  job={item}
                  personioTrackingID={personioTrackingID}
                />
              ))}
            </GridColumn>
          </Grid>
        </Container>
      </Section>
    </>
  );
};
