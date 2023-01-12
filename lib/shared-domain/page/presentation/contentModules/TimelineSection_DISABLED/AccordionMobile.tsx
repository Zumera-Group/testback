import Link from 'next/link';
import { P } from 'components/Typography/P';
import { colors } from 'styles/foundations/colors';
import { LinkWithArrow } from '../../components/LinkWithArrow';
import { Service } from '../../../domain/index';
import { TimelineSectionModule } from 'lib/shared-domain/page/domain/contentModule';
import { ServicesLargeGridSectionModule } from '../../../domain/contentModule';
import {
  AccordionItemCustom,
  AccordionCustom,
} from '../../components/AccordionCustom';
import { links } from 'lib/links';

const Card: React.FC<{
  service: Service;
  specificContentModule: TimelineSectionModule | ServicesLargeGridSectionModule;
}> = ({ service, specificContentModule }) => {
  return (
    <AccordionItemCustom buttonText={service.name}>
      <Link passHref href={links().services(service)}>
        <P as="a" height="72px" noOfLines={3} mt={2} mb={3}>
          {service.description}
        </P>
      </Link>
      <LinkWithArrow
        color={colors.primary.lightGreen}
        href={links().services(service)}
        title={specificContentModule.linkText}
      />
    </AccordionItemCustom>
  );
};

export const AccordionMobile: React.FC<{
  services: Service[];
  specificContentModule: TimelineSectionModule;
}> = ({ services, specificContentModule }) => {
  return (
    <>
      {services?.map((s, index) => (
        <AccordionCustom key={index}>
          <Card service={s} specificContentModule={specificContentModule} />
        </AccordionCustom>
      ))}
    </>
  );
};
