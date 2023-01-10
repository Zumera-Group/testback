import { SectionHeading } from 'components/SectionHeading';

export const FutureTrends = ({ futureTrends }) => {
  if (!futureTrends) return null;

  const { title, trendDescription } = futureTrends;

  return (
    <SectionHeading
      title={title}
      description={trendDescription}
      align={'center'}
    />
  );
};

export default FutureTrends;