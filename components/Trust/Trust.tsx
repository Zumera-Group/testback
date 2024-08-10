import { Container, Grid, GridColumn, Section } from 'components/Layout';

import dynamic from 'next/dynamic';
const TrustItem = dynamic(() => import('./TrustItem/TrustItem'), {ssr: false});

export const Trust = ({ isResultsCompactOnMobile, ...rest }: {
  isResultsCompactOnMobile?: boolean,
  textElements: any
}) => {

  const { textElements } = rest;

  if (!textElements?.length) return null;

  const trustColumns = 12 / textElements?.length;

  const extractNumberFromString = (string) => {
    const regexForNumber = /\d+/g;
    const matches = string.match(regexForNumber);
    if (!matches) return null;
    // return parseInt(matches);
    return matches;
  };

  return (
    <Section
      size={'sm'}
      bg={'secondary'}
      color={'white'}
    >
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'center'}
          alignItems={'stretch'}
        >
          {textElements.map(({ title, subtitle }, index: number) => (
            <GridColumn
              key={`trustItem-${index}`}
              xs={isResultsCompactOnMobile ? trustColumns : 12}
              sm={isResultsCompactOnMobile ? trustColumns : 12}
              md={trustColumns}
              lg={trustColumns}
            >
              <TrustItem
                title={title}
                extractNumberFromString={extractNumberFromString}
                subtitle={subtitle}
                index={index}
              />
            </GridColumn>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Trust;