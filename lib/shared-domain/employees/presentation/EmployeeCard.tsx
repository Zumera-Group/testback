/* eslint-disable @next/next/no-img-element */
import { Box } from 'components/Layout/Flex/Flex';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Employee } from '../domain/index';
import Image from 'next/image';
import bg from '../../../../public/employeeCard/bg.png';
import { LinkWithArrow } from '../../page/presentation/components/LinkWithArrow';
import { colors } from 'styles/foundations/colors';
import { P } from 'components/Typography/P';
import { FlexCol } from '../../../../components/Layout/Flex/Flex';
import { H } from '../../../../components/Typography/H';
import { fonts } from 'styles/foundations/fontStyles';
import { links } from 'lib/links';
import { getEmployeeFullName } from '../domain/getEmployeeFullName';
import fallback from '../fallback.png';
import { getImageFitForType } from '../application/getImageFitForType';
import { Partner } from '../../newsArticle/domain/index';
import {
  fontSizes,
  fontWeights,
} from '../../../../styles/foundations/fontStyles';

const IMAGE_HEIGHT = '375px';
const HEIGHT = '575px';
const BOX_HEIGHT = '200px';
const SHOWCASE_IMAGE_HEIGHT = '70px';

export const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => {
  const [isLoading, setLoading] = useState(true);

  const hasImage = !!partner?.picture?.asset?.url;

  const getColor = () => {
    if (hasImage) return colors.primary.darkGreen;
    return colors.primary.darkGreen;
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <Box
      height={HEIGHT}
      mr={3}
      my={2}
      backgroundRepeat="no-repeat"
      backgroundPosition="no-repeat"
      backgroundSize="cover"
    >
      <Box height={IMAGE_HEIGHT}>
        {hasImage ? (
          <Box position="relative" height={IMAGE_HEIGHT}>
            <Image
              unoptimized
              objectFit={getImageFitForType('headshot')}
              layout="fill"
              alt={partner?.fullName}
              src={partner?.picture?.asset?.url + `?h=${isLoading ? 40 : 900}`}
            />
          </Box>
        ) : (
          <Image
            unoptimized
            objectFit="cover"
            src={fallback}
            alt={partner?.fullName}
            width={IMAGE_HEIGHT}
            height={IMAGE_HEIGHT}
          />
        )}
      </Box>

      <FlexCol
        width="100%"
        backgroundImage={hasImage && bg.src}
        backgroundRepeat="no-repeat"
        backgroundPosition="no-repeat"
        backgroundSize="cover"
        justifyContent="center"
        height={BOX_HEIGHT}
        px={3}
      >
        {partner?.logo && (
          <Box position="relative" height={SHOWCASE_IMAGE_HEIGHT}>
            <Image
              unoptimized
              objectFit="contain"
              layout="fill"
              alt=""
              src={
                partner?.logo?.asset?.url +
                `?h=${SHOWCASE_IMAGE_HEIGHT.replace('px', '')}`
              }
            />
          </Box>
        )}
        <H mb={1} color={getColor()} textTransform="capitalize">
          {partner.fullName}
        </H>
        <P
          fontSize={fontSizes.small}
          textTransform="capitalize"
          color={getColor()}
        >
          {partner.jobTitle}
        </P>
      </FlexCol>
    </Box>
  );
};

export const EmployeeCard: React.FC<{
  employee: Employee;
  linkText?: string;
}> = ({ employee, linkText }) => {
  const [currentEmployee, setCurrentEmployee] = useState<Employee>(null);
  const fullName = getEmployeeFullName(currentEmployee);

  const hasImage = !!employee?.cardPicture?.picture?.asset?.url;

  const getColor = () => {
    if (hasImage) return colors.primary.darkGreen;
    return colors.primary.darkGreen;
  };

  useEffect(() => {
    setCurrentEmployee(employee);
  }, []);

  return (
    <Link passHref href={links().employees(employee)}>
      <Box cursor="pointer" as="a">
        <Box height={IMAGE_HEIGHT}>
          <Box position="relative" height={IMAGE_HEIGHT}>
            <Image
              unoptimized
              loading="lazy"
              objectFit="cover"
              layout="fill"
              alt={fullName}
              src={
                currentEmployee?.cardPicture?.picture?.asset?.url ||
                (fallback as any)
              }
            />
          </Box>
        </Box>

        <FlexCol
          width="100%"
          backgroundImage={bg.src}
          backgroundRepeat="no-repeat"
          backgroundPosition="no-repeat"
          backgroundSize="cover"
          justifyContent="center"
          height={BOX_HEIGHT}
          px={3}
        >
          <H mb={0.5} color={getColor()}>
            {fullName}
          </H>
          <P
            fontSize={fontSizes.small}
            fontWeight={fontWeights.highlight}
            color={getColor()}
          >
            {currentEmployee?.jobTitle}
          </P>
          {linkText ? (
            <Box mt={3}>
              <LinkWithArrow
                href={links().employees(currentEmployee)}
                title={linkText}
                color={getColor()}
              />
            </Box>
          ) : null}
        </FlexCol>
      </Box>
    </Link>
  );
};

export const BiggerEmployeeCard: React.FC<{
  employee: any;
  linkText: string;
}> = ({ employee, linkText }) => {
  const fullName = getEmployeeFullName(employee);

  const hasImage = !!employee?.cardPicture?.asset?.url;

  const getColor = () => {
    if (hasImage) return colors.white;
    return colors.black;
  };

  const Content = (
    <Box zIndex="1000">
      <H fontFamily={fonts.condor} mb={0} color={getColor()}>
        {fullName}
      </H>
      <P color={getColor()}>{employee.jobTitle}</P>
      <Box mt={3}>
        <LinkWithArrow
          href={links().employees(employee)}
          title={linkText}
          color={getColor()}
        />
      </Box>
    </Box>
  );

  return (
    <Link passHref href={links().employees(employee)}>
      <Box as="a" cursor="pointer" width="100%" height="100%">
        <Box width="100%" height="100%" position="relative">
          <Box position="relative" width="100%" height="100%">
            <FlexCol
              zIndex={8}
              position="absolute"
              width="100%"
              height="80%"
              bottom={0}
              background={
                employee?.cardPicture?.asset?.url &&
                'linear-gradient(0deg, black, transparent)'
              }
            />
            <img
              style={{ height: 580, width: '100%', objectFit: 'cover' }}
              alt={employee?.fullName}
              src={employee?.cardPicture?.asset?.url || fallback.src}
            />
            <Box position="absolute" bottom={5} left={6} zIndex={100}>
              {Content}
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};
