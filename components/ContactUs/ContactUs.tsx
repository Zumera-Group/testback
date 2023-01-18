import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { Offices } from './Offices';
import { ContactForm } from './ContactForm';

import styles from './ContactUs.module.scss';

interface Props {
  title?: string;
  subtitle?: string;
  description?: any;
  offices?: any;
  appointmentLinkText?: string;
  contactForm?: any;
  siteSettings?: any;
}

export const ContactUs: React.FC<Props> = (props) => {
  const {
    title,
    subtitle,
    description,
    offices,
    appointmentLinkText,
    contactForm,
  } = props;

  return (
    <Section
      size={'md'}
      bg={'gradient'}
      color={'white'}
      classes={styles.contactUs}
    >
      <Container>
        <Grid
          justifyContent={'space-between'}
          alignItems={'start'}
          fullWidth={true}
        >
          <GridColumn sm={12} md={6} lg={5}>
            <SectionHeading
              title={title}
              subtitle={subtitle}
              description={description}
              align={'left'}
            />
            {offices?.length > 0 && (
              <Offices
                offices={offices || []}
                appointmentLinkText={appointmentLinkText}
              />
            )}
          </GridColumn>
          <GridColumn sm={12} md={6} lg={7} xl={6}>
            <ContactForm contactForm={contactForm} />
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

export default ContactUs;
