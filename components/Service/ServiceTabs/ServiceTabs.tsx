import { Section, Container, Grid } from 'components/Layout';
import { Tab } from 'lib/shared-domain/page/domain';
import { Button } from 'components/Button';
import styles from './ServiceTabs.module.scss';
interface ServiceTabsProps {
  tabs: Tab[];
  onSelectTab(t: Tab): void;
  activeTabKey: string;
}

export const ServiceTabs: React.FC<any> = ({
  tabs,
  activeTabKey,
  onSelectTab,
}) => {
  return (
    <Section size={'sm'} bg={'light'} color={'primary'}>
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'center'}
          alignItems={'center'}
          className={styles.buttonsWrapper}
        >
          {tabs.map((tab) => (
            <Button
              hideIcon={true}
              key={tab._key}
              variant={activeTabKey !== tab._key ? 'secondary' : 'primary'}
              callBack={() => onSelectTab(tab)}
            >
              {tab.title}
            </Button>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};
