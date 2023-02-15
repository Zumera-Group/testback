import { Container, Grid, GridColumn, Section } from 'components/Layout';
import styles from './TransactionSector.module.scss';
import { Sector } from 'lib/shared-domain/page/domain';
import { SectionHeading } from 'components/SectionHeading';
import { Button } from 'components/Button';
import Image from "next/legacy/image";
interface IProps {
  sector: Sector;
  linkText: string;
  subtitle: string;
}
export const TransactionSector: React.FC<IProps> = ({
  sector,
  linkText,
  subtitle,
}) => {
  return (
    <Section size={'sm'} bg={'light'} color={'white'}>
      <Container classes={styles.gridContainer}>
        <Grid
          fullWidth={true}
          justifyContent={'start'}
          alignItems={'stretch'}
          className={styles.grid}
        >
          <GridColumn sm={12} md={6} lg={6}>
            <SectionHeading
              title={sector.name}
              subtitle={subtitle}
              description={sector.description}
              headingType={'h2'}
              align={'left'}
            />
            <Button
              variant={'secondary'}
              link={{ slug: { current: `/sectors/${sector?.slug?.current}` } }}
              onDark={true}
              classes={styles.button}
            >
              {linkText}
            </Button>
          </GridColumn>
          {sector?.detailPageHeroImage?.asset?.url && (
            <GridColumn sm={12} md={6} lg={6} className={styles.imageCol}>
              <Image
                unoptimized
                loading="lazy"
                src={sector?.detailPageHeroImage?.asset?.url}
                alt={sector?.name}
                objectFit="contain"
                layout="fill"
              />
            </GridColumn>
          )}
        </Grid>
      </Container>
    </Section>
  );
};
