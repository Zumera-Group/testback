import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { Button } from 'components/Button';
import { TransactionCard } from './TransactionCard';

import styles from './TransactionShowcase.module.scss';

interface Props {
  title?: string;
  subtitle?: string;
  description?: any;
  link?: any;
  transaction?: any;
}

export const TransactionShowcase: React.FC<Props> = ({ ...rest }) => {
  const { title, subtitle, description, link, transaction } = rest;

  return (
    <Section as={'section'} size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <GridColumn sm={12} md={6} lg={5}>
            <SectionHeading
              headingType={'h2'}
              title={title}
              subtitle={subtitle}
              description={description}
            />
            {link?.title && (
              <div className={styles.btnWrapper}>
                <Button variant={'secondary'} link={link.page}>
                  {link?.title}
                </Button>
              </div>
            )}
          </GridColumn>
          {transaction && (
            <GridColumn sm={12} md={6} lg={6}>
              <TransactionCard transaction={transaction} />
            </GridColumn>
          )}
        </Grid>
      </Container>
    </Section>
  );
};

export default TransactionShowcase;
