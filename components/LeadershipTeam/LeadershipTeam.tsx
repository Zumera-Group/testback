import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { Employee } from 'components/NewsGrid';

import { useFetchEmployees } from 'lib/shared-domain/employees/application/useGetEmployees';

import styles from './LeadershipTeam.module.scss';

interface Props {
  title?: string;
  subtitle?: string;
  description?: any;
}

export const LeadershipTeam: React.FC<Props> = ({ ...rest }) => {
  const { title, subtitle, description } = rest;

  const fallbackIndex = 999;
  const employees = useFetchEmployees();

  const leadershipTeamMembers =
    employees?.filter(
      (e) =>
        !e.hasLeftTheTeam &&
        !!e.isInLeadershipTeam &&
        e.leadershipListIndex !== 0,
    ) || [];

  const bigLeadershipTeamMembers =
    employees?.filter(
      (e) =>
        !e.hasLeftTheTeam &&
        !!e.isInLeadershipTeam &&
        e.leadershipListIndex === 0,
    ) || [];

  const orderedLeadershipTeamMembers = leadershipTeamMembers.sort((a, b) =>
    (a.leadershipListIndex != null ? a.leadershipListIndex : fallbackIndex) <
    (b.leadershipListIndex != null ? b.leadershipListIndex : fallbackIndex)
      ? -1
      : 1,
  );

  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <SectionHeading
          title={title}
          subtitle={subtitle}
          description={description}
          align={'center'}
        />
        <Grid
          fullWidth={true}
          justifyContent={'start'}
          alignItems={'stretch'}
          className={styles.teamGrid}
        >
          {[...bigLeadershipTeamMembers, ...orderedLeadershipTeamMembers]?.map(
            (member, index) => (
              <GridColumn
                key={`leaderShipTeamMember-${index}`}
                xs={12}
                sm={6}
                md={6}
                lg={4}
                className={styles.teamColumn}
              >
                <Employee article={member} />
              </GridColumn>
            ),
          )}
        </Grid>
      </Container>
    </Section>
  );
};

export default LeadershipTeam;
