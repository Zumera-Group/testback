import { Grid, GridColumn } from 'components/Layout'
import { FooterMenu } from 'components/Footer';

export const FooterSitemap = ({ sitemap }) => {

  if (!sitemap.length) return null;

  const footerMenuColSize =
    sitemap?.length > 0 ?
    12 / sitemap.length :
    4;

  return (
    <Grid
      justifyContent={'space-between'}
      alignItems={'start'}
      fullWidth={true}
    >
      {sitemap.map(({ _key, type, title, items }, index: number) => (
        <GridColumn
          key={`footerMenu-${_key}`}
          xs={12}
          sm={6}
          md={footerMenuColSize}
          lg={footerMenuColSize}
        >
          <FooterMenu
            type={type}
            title={title}
            items={items}
            index={index}
          />
        </GridColumn>
      ))}
    </Grid>
  );
};

export default FooterSitemap;