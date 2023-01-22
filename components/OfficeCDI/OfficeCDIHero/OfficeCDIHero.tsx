import { Office } from 'lib/shared-domain/offices/domain';
import { useRef } from 'react';
import styles from './OfficeCDIHero.module.scss';
import Gradient from 'components/Hero/Home/Gradient';
import { Container } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
export const OfficeCDIHero: React.FC<{
  office: Office;
  subtitle: string;
}> = ({ office, subtitle }) => {
  const heroRef = useRef();

  return (
    <div className={[styles.heroGlobal, styles.hero].join(' ')} ref={heroRef}>
      <Gradient parent={heroRef} />
      <Container classes={styles.container}>
        <SectionHeading
          title={office.city}
          subtitle={subtitle}
          headingType={'h1'}
          align={'left'}
        />
        <address className={styles.address}>
          <span>
            {office.street} {office.houseNumber}
          </span>
          <span>
            {office.zipCode} {office.city}
          </span>
          <span>{office.country}</span>
        </address>
        {/*<SanityBlockContent text={description} />*/}
      </Container>
    </div>
  );
};
