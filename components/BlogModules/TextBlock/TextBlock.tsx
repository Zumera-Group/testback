import styles from './TextBlock.module.scss';
import { RichText } from '../RichText';
import { Container, Grid, GridColumn } from 'components/Layout';
import { HiddenAnchor } from 'components/BlogModules/HiddenAnchor/HiddenAnchor';

export const TextBlock: React.FC<any> = ({ specificContentModule }) => {
  const { subheading, text, anchor } = specificContentModule;

  return (
    <>
      <HiddenAnchor id={anchor} />
      <Container classes={styles.textBlock}>
        <div className={styles.innerOffset}>
          <Grid
            fullWidth={true}
            justifyContent={'space-between'}
            className={styles.content}
          >
            <GridColumn sm={12} md={12} lg={12}>
              {subheading && <h4>{subheading}</h4>}
              <RichText content={text} />
            </GridColumn>
          </Grid>
        </div>
      </Container>
    </>
  );
};
export default TextBlock;
