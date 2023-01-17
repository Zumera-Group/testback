import { SectionHeading } from 'components/SectionHeading';
import { Grid, GridColumn } from 'components/Layout';

export const FutureTrends = ({ futureTrends }) => {
  if (!futureTrends) return null;

  const { title, trendDescription, trendsImage } = futureTrends;

  return (
    <Grid
      justifyContent={'space-between'}
      alignItems={'center'}
      fullWidth={true}
    >
      <GridColumn sm={12} md={6} lg={6}>
        <SectionHeading
          title={title}
          description={trendDescription}
          align={'left'}
        />
      </GridColumn>
      <GridColumn sm={12} md={6} lg={6}>
        <img src={trendsImage?.asset?.url} alt="" width={'100%'} />
      </GridColumn>
    </Grid>
  );
};

export default FutureTrends;
