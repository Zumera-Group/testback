import { icons } from 'components/Icons';
import { Box, FlexRow, FlexCol } from 'components/Layout/Flex/Flex';
import { P } from 'components/Typography/P';
import { FakeLinkWithArrow } from 'lib/shared-domain/page/presentation/components/LinkWithArrow';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import backgroundImage from '/public/transactionCard-bg.webp';

import { colors } from 'styles/foundations/colors';
import { fontWeights } from 'styles/foundations/fontStyles';
import { Transaction } from '../../domain/index';
import { links } from 'lib/links';
import { fontSizes } from '../../../../../styles/foundations/fontStyles';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useHover } from 'lib/hooks/useOnHover';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';
import { useBreakpointValue } from '@chakra-ui/react';

const textProps = {
  color: colors.white,
};

const backgroundProps = {
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const TitleWithText: React.FC<{
  title: string;
  text: string;
  fontSize?: string;
}> = ({ title, text }) => {
  return (
    <Box>
      <P
        mb={1}
        fontSize={fontSizes.small}
        color={colors.white}
        fontWeight={fontWeights.bold}
      >
        {title}
      </P>
      <P fontSize={fontSizes.h3} color={colors.duckEgg}>
        {text}
      </P>
    </Box>
  );
};

const TransactionSectorServiceDateAndOtherInfos = ({ transaction }) => {
  const format = useFormatDate();
  const firstSector = transaction.sectors?.[0];
  const sharedContent = useSharedContentContext();
  const location = 'CDI ' + transaction?.location?.country || '';
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <FlexCol
        backgroundImage={`url(${backgroundImage.src})`}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        height={{
          base: transaction.hasCDIRelation ? '80%' : '70%',
          md: '260px',
        }}
        width="100%"
        px={5}
        py={4}
      >
        {firstSector && (
          <FlexCol mr={1} flex={1} mb={{ base: 4 }}>
            <TitleWithText
              title={sharedContent?.transactions?.sector}
              text={firstSector?.name}
            />
          </FlexCol>
        )}
        {transaction.typeOfService && (
          <FlexCol mb={{ base: 4 }} flex={1}>
            <TitleWithText
              title={sharedContent?.transactions?.transactionType}
              text={transaction.typeOfService?.name}
            />
          </FlexCol>
        )}
        {transaction.date && (
          <FlexCol mb={{ base: 4 }} mr={1} flex={1}>
            <TitleWithText
              title={sharedContent?.transactions?.closingTime}
              text={format(new Date(transaction.date))}
            />
          </FlexCol>
        )}
        {transaction.hasCDIRelation && (
          <FlexCol flex={1}>
            <TitleWithText title={sharedContent.cdiText} text={location} />
          </FlexCol>
        )}
      </FlexCol>
    );
  }

  return (
    <FlexCol
      backgroundImage={`url(${backgroundImage.src})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      height={{ base: '70%', md: '260px' }}
      width="100%"
      px={5}
      py={4}
    >
      <FlexRow flex={1} justify="space-between">
        {firstSector && (
          <FlexCol mr={1} width="50%" flex={1} mb={{ base: 4 }}>
            <TitleWithText
              title={sharedContent?.transactions?.sector}
              text={firstSector?.name}
            />
          </FlexCol>
        )}
        {transaction.typeOfService && (
          <FlexCol mb={{ base: 4 }} flex={1}>
            <TitleWithText
              title={sharedContent?.transactions?.transactionType}
              text={transaction.typeOfService?.name}
            />
          </FlexCol>
        )}
      </FlexRow>
      <FlexRow mb={{ base: 4 }} flex={1} justify="space-between">
        {transaction.date && (
          <FlexCol mr={1} flex={1}>
            <TitleWithText
              title={sharedContent?.transactions?.closingTime}
              text={format(new Date(transaction.date))}
            />
          </FlexCol>
        )}
        {transaction.hasCDIRelation && (
          <FlexCol flex={1}>
            <TitleWithText title={sharedContent.cdiText} text={location} />
          </FlexCol>
        )}
      </FlexRow>
    </FlexCol>
  );
};

export const TRANSACTION_GRID_HEIGHT = 400;

const boxShadow = '0px 5px 18px rgba(12, 78, 64, 0.25)';

export enum transactionCardVariants {
  carousel = 'carousel',
  newsGrid = 'newsGrid',
  hero = 'hero',
  transactionGrid = 'transactionGrid',
}

export const TransactionCard: React.FC<{
  variant: transactionCardVariants;
  transaction: Transaction;
  linkText: string;
}> = ({
  transaction,
  linkText,
  variant = transactionCardVariants.carousel,
}) => {
  const sharedContent = useSharedContentContext();
  const format = useFormatDate();
  const [ref, isHovered] = useHover();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const getDate = (transaction) =>
    transaction.date ? format(new Date(transaction.date)) : '';

  const config = {
    carousel: {
      backgroundImage: `url(${backgroundImage.src})`,
      px: 3,
      py: 4,
      height: 382,
      getSubtitle: (transaction) =>
        transaction.subtitleForCard || getDate(transaction),
    },

    newsGrid: {
      backgroundImage: `url(${backgroundImage.src})`,
      px: 3,
      py: 4,
      height: 382,
      getSubtitle: (transaction) => getDate(transaction),
    },

    hero: {
      backgroundImage: `url(${backgroundImage.src})`,
      px: 3,
      py: 4,
      height: 482,
      getSubtitle: (transaction) => getDate(transaction),
      renderDownPart: (transaction: Transaction): any =>
        (
          <TransactionSectorServiceDateAndOtherInfos
            transaction={transaction}
          />
        ) as any,
    },
    transactionGrid: {
      backgroundImage: `url(${backgroundImage.src})`,
      px: 3,
      py: 4,
      height: TRANSACTION_GRID_HEIGHT,
      maxWidth: 300,
      getSubtitle: (transaction) => getDate(transaction),
    },
  } as any;

  if (!transaction) return null;
  const configForVariant = config[variant];
  const { headline, hasCDIRelation } = transaction;

  const renderLogo = (url, alt, fallback) => {
    if (!url)
      return (
        <FlexCol noOfLines={4} width={100} maxWidth={100}>
          <P fontSize={fontSizes.tiny}>{fallback}</P>
        </FlexCol>
      );
    return (
      <Image
        unoptimized
        objectFit="contain"
        width={100}
        height={80}
        alt={alt}
        src={`${url}`}
      />
    );
  };

  const CDIText = hasCDIRelation ? (
    <P
      textAlign={{ base: 'left', lg: 'right' }}
      width="150px"
      fontWeight={fontWeights.semiBold}
      fontSize={fontSizes.small}
      color={colors.white}
      mt={{ base: 2, lg: 0 }}
    >
      {sharedContent.cdiText}
    </P>
  ) : null;

  const DownPart = () => (
    <FlexCol
      justify="space-between"
      flex={1}
      backgroundImage={configForVariant.backgroundImage}
      {...backgroundProps}
      px={configForVariant.px}
      py={configForVariant.py}
    >
      <FlexCol>
        <P mb={2} fontSize={fontSizes.small} {...textProps}>
          {configForVariant.getSubtitle(transaction)}
        </P>
        {headline ? (
          <P noOfLines={2} {...textProps} fontWeight={fontWeights.semiBold}>
            {headline}
          </P>
        ) : null}
      </FlexCol>
      <FlexRow
        flexWrap={{ base: 'wrap', lg: 'nowrap' }}
        alignItems="center"
        justifyContent="space-between"
      >
        <FlexCol mt={{ base: 2, lg: 0 }}>
          <FakeLinkWithArrow
            fontWeight={fontWeights.highlight}
            color={colors.white}
            title={linkText || 'Read More'}
          />
        </FlexCol>
        {CDIText}
      </FlexRow>
    </FlexCol>
  );

  const styles = {
    height: configForVariant.height,
    maxHeight: configForVariant.height,
    boxShadow,
    maxWidth: configForVariant.maxWidth,
  };

  return (
    <Link passHref href={links().transactions(transaction)}>
      <FlexCol
        as="a"
        cursor="pointer"
        ref={ref}
        style={
          isMobile
            ? styles
            : {
                ...styles,
                transition: 'all 0.3s ease',
              }
        }
        _hover={
          isMobile ? {} : { boxShadow: colors.transactionsCardBoxShadowStrong }
        }
      >
        <FlexCol flex={1.3} bg="white">
          <FlexRow
            flex={1}
            justify="center"
            px={configForVariant.px}
            alignItems="center"
          >
            <FlexCol flex={0.4} flexShrink={0}>
              {renderLogo(
                transaction.companyLogo1?.asset?.url,
                transaction.companyName1,
                transaction.companyName1,
              )}
            </FlexCol>
            <FlexCol
              flex={0.2}
              flexShrink={0}
              transformOrigin="center"
              transform={
                isHovered && !isMobile ? 'rotate(45deg)' : 'rotate(0deg)'
              }
              transition={isMobile ? 'none' : '.2s ease-in all'}
              mx={2}
              width={24}
              alignItems="center"
            >
              <icons.TransactionX size="24px" strokeW="8px" />
            </FlexCol>
            <FlexCol flex={0.4} flexShrink={0}>
              {renderLogo(
                transaction.companyLogo2?.asset?.url,
                transaction.companyName2,
                transaction.companyName2,
              )}
            </FlexCol>
          </FlexRow>
        </FlexCol>
        {configForVariant.renderDownPart ? (
          configForVariant.renderDownPart(transaction)
        ) : (
          <DownPart />
        )}
      </FlexCol>
    </Link>
  );
};
