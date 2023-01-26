import { Container, Grid, Section } from 'components/Layout';
import { optionalUI } from 'lib/shared-domain/transactions/domain';
import Image from 'next/image';
import styles from './TransactionInvolvedParties.module.scss';
export const TransactionInvolvedParties: React.FC<{
  optionalUI: optionalUI;
}> = ({ optionalUI }) => {
  const { involvedParty1, involvedParty2 } = optionalUI;
  const parties = [involvedParty1, involvedParty2];
  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container classes={styles.container}>
        <Grid fullWidth={true} justifyContent={'center'} alignItems={'center'}>
          {parties.map((party) =>
            party ? (
              <div key={party.name} className={styles.party}>
                <div className={styles.image}>
                  <Image
                    unoptimized
                    loading="lazy"
                    src={party.companyLogo?.asset?.url}
                    alt={party.name}
                    objectFit="cover"
                    layout="fill"
                  />
                </div>
                <h4 className={styles.quote}>“{party.quote}”</h4>
                <div>
                  <h4 className={styles.name}>{party.name}</h4>
                  <p>{party.jobTitle}</p>
                </div>
              </div>
            ) : null,
          )}
        </Grid>
      </Container>
    </Section>
  );
};
