import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { useFetchJobs } from 'lib/shared-domain/jobs/application/useGetJobs';
import { JobItem } from 'components/OpenJobsList/JobItem';
import { useRouter } from 'next/router';

export const OpenJobsList: React.FC<any> = ({ specificContentModule }) => {
  const { title, subtitle, description } = specificContentModule;
  const jobs = useFetchJobs();
  const { query } = useRouter();
  const personioTrackingID = query?._pc;
  return (
    <Section size={'md'} bg={'light'} color={'primary'} id={'jobsList'}>
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
            {jobs.map((item) => (
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
  );
};
