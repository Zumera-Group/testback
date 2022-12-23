import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { TrustItem } from './TrustItem';

export const Trust = ({ ...rest }) => {

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
      bg={'light'}
      color={'primary'}
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
              sm={12}
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