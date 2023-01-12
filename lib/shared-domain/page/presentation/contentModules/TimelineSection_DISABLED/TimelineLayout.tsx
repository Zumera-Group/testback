import Link from 'next/link';

import { Service } from '../../../domain/index';
import { FlexCol, Box } from '../../../../../../components/Layout/Flex/Flex';
import { colors } from 'styles/foundations/colors';
import { icons } from '../../../../../../components/Icons/index';
import { useHover } from '../../../../../hooks/useOnHover';
import { fontSizes } from '../../../../../../styles/foundations/fontStyles';
import { LinkWithArrow } from '../../components/LinkWithArrow';
import { H } from '../../../../../../components/Typography/H';
import { P } from '../../../../../../components/Typography/P';
import { Flex } from '@chakra-ui/react';
import { links } from 'lib/links';

const Card: React.FC<{
  linkText: string;
  service: Service;
}> = ({ linkText, service }) => {
  const [ref, isHovered] = useHover();
  return (
    <>
      {service && (
        <>
          <Link passHref href={links().services(service)}>
            <Box
              display="block"
              as="a"
              ref={ref}
              cursor="pointer"
              pb={4}
              px={3}
            >
              <H
                color={
                  isHovered
                    ? colors.primary.lightGreen
                    : colors.primary.darkGreen
                }
                fontSize={fontSizes.h2}
                lineHeight="30px"
              >
                {service.name}
              </H>
              <P height="72px" noOfLines={3} mt={2} mb={3}>
                {service.shortDescription}
              </P>
              <LinkWithArrow
                color={isHovered ? colors.primary.lightGreen : colors.black}
                href={links().services(service)}
                title={linkText}
              />
            </Box>
          </Link>
          <Box position="absolute" bottom="-10px" left="-10px">
            <icons.TimelineDot color={isHovered && colors.primary.lightGreen} />
          </Box>
        </>
      )}
    </>
  );
};

export const Column: React.FC<{
  services: Service[];
  linkText: string;
}> = ({ services, linkText }) => {
  return (
    <FlexCol
      borderLeft={`1px solid ${colors.timelineBar}`}
      h={600}
      w="33%"
      justify="space-between"
      position="relative"
    >
      <Box mr="30%" w="70%">
        <Card service={services[0]} linkText={linkText} />
      </Box>
      <Box
        borderLeft={`1px solid ${colors.timelineBar}`}
        ml="30%"
        w="70%"
        position="relative"
        pb={7}
      >
        <Card service={services[1]} linkText={linkText} />
      </Box>
    </FlexCol>
  );
};

export const TimelineLayout: React.FC<{
  services: Service[];
  linkText: string;
}> = ({ services, linkText }) => {
  return (
    <Flex w="100%">
      <Column services={services.slice(0, 2)} linkText={linkText} />
      <Column services={services.slice(2, 4)} linkText={linkText} />
      <Column services={services.slice(4)} linkText={linkText} />
    </Flex>
  );
};
