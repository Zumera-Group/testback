import { Container, Grid, GridColumn } from 'components/Layout';
import styles from './QuoteBlock.module.scss';
import { Quotation } from 'components/Icons/Quotation';
import { HiddenAnchor } from 'components/BlogModules/HiddenAnchor/HiddenAnchor';

export const QuoteBlock: React.FC<any> = ({ specificContentModule }) => {
  const { quote, name, position, anchor } = specificContentModule;

  return (
    <>
      <HiddenAnchor id={anchor} />

      <Container classes={styles.quoteBlockWrapper}>
        <Grid
          justifyContent={'space-between'}
          alignItems={'center'}
          fullWidth={true}
        >
          <GridColumn sm={12} md={6} lg={12} className={styles.quoteWrapper}>
            <blockquote>
              <span className={styles.quote}>{quote}</span>
              <cite>
                <Grid
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  fullWidth={true}
                  className={styles.citeWrapper}
                >
                  <GridColumn sm={12} md={6} lg={6} className={styles.name}>
                    {name && <span>{name}</span>}
                    {position && <span>, {position}</span>}
                  </GridColumn>
                  <GridColumn
                    sm={12}
                    md={6}
                    lg={6}
                    className={styles.iconWrapper}
                  >
                    <Quotation />
                  </GridColumn>
                </Grid>
              </cite>
            </blockquote>
          </GridColumn>
        </Grid>
      </Container>
    </>
  );
};
export default QuoteBlock;
