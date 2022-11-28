import React from 'react';
import Image from 'next/image';
import * as EmailValidator from 'email-validator';

import { Box, FlexRow } from 'components/Layout/Flex/Flex';
import { P } from 'components/Typography/P';
import { LinkWithArrow } from '../../page/presentation/components/LinkWithArrow';
import { fontSizes } from 'styles/foundations/fontStyles';
import { colors } from 'styles/foundations/colors';
import { Checkbox, Flex } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { fontWeights } from '../../../../styles/foundations/fontStyles';
import { FlexCol } from '../../../../components/Layout/Flex/Flex';
import Link from 'next/link';
import { Btn } from 'components/Buttons/Button';
import { icons } from 'components/Icons';
import downloadBgImage from '../../../../public/contentModules/newsGridSection/download-bg.png';
import fallback from '../../employees/fallback_squared.jpg';
import { Input } from 'components/Inputs';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { MarketingParamsService } from 'lib/shared-domain/salesforce/application/marketingParamsService';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import { sanityImageUrlFor } from 'lib/sanity';

type Props = {
  title: string;
  subtitle: string;
  linkText: string;
  href: string;
};

const CARD_HEIGHT_PX = `500`;
const INSIDE_HEIGHT = '100%';

const sharedBoxProps = {
  transition: '.2s ease-in all',
  _hover: { boxShadow: colors.transactionsCardBoxShadowStrong },
  style: { boxShadow: colors.transactionsCardBoxShadow },
};

const SmallNewsCard: React.FC<
  {
    image: string;
    bgImage?: string;
    imageObjectFit: 'cover' | 'contain';
    newsGridWithAdditionalPaddingForImage: boolean;
  } & Props
> = ({
  bgImage,
  imageObjectFit,
  newsGridWithAdditionalPaddingForImage,
  ...props
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Link passHref href={props.href}>
        <FlexCol
          as="a"
          cursor="pointer"
          backgroundImage={`url(${sanityImageUrlFor(bgImage)
            ?.height(250)
            ?.auto('format')
            ?.url()}), linear-gradient(264.95deg, #E0C6B7 -2.77%, #F8F8E6 62.17%)`}
          backgroundPosition="center"
          backgroundSize="contain"
          backgroundRepeat="no-repeat"
          flexBasis="50%"
          m={newsGridWithAdditionalPaddingForImage ? 2.5 : 0}
        >
          <FlexCol justifyContent="space-between" p={3}>
            <FlexCol>
              <P noOfLines={2} color="black" fontSize={fontSizes.tiny}>
                {props.subtitle}
              </P>
              <P
                noOfLines={2}
                fontWeight={fontWeights.semiBold}
                color="black"
                mt={1}
                mb={3}
              >
                {props.title}
              </P>
            </FlexCol>
            <Box>
              <LinkWithArrow
                color="black"
                title={props.linkText || 'Read More'}
                href={props.href}
              />
            </Box>
          </FlexCol>
        </FlexCol>
      </Link>
    );
  }

  return (
    <Link passHref href={props.href}>
      <Flex
        {...sharedBoxProps}
        bgColor={colors.white}
        as="a"
        cursor="pointer"
        role="group"
        overflow="hidden"
      >
        <FlexCol
          backgroundImage={`url(${bgImage}), linear-gradient(264.95deg, #E0C6B7 -2.77%, #F8F8E6 62.17%)`}
          backgroundPosition="center"
          backgroundSize="contain"
          backgroundRepeat="no-repeat"
          flexBasis="50%"
        >
          <FlexCol justifyContent="space-between" p={3}>
            <FlexCol>
              <P noOfLines={1} color="black" fontSize={fontSizes.tiny}>
                {props.subtitle}
              </P>
              <P
                noOfLines={3}
                fontWeight={fontWeights.semiBold}
                color="black"
                mt={1}
                mb={3}
              >
                {props.title}
              </P>
            </FlexCol>
            <Box>
              <LinkWithArrow
                color="black"
                title={props.linkText || 'Read More' || 'Read More'}
                href={props.href}
              />
            </Box>
          </FlexCol>
        </FlexCol>
        <Flex w="50%" overflow="hidden">
          <FlexCol
            position="relative"
            flexBasis="100%"
            _groupHover={{
              transform: 'scale(1.2)',
            }}
            transform="scale(1)"
            transition="transform 1s cubic-bezier(0.25, 0.45, 0.45, 0.95)"
          >
            {props.image && (
              <Image
                unoptimized
                loading="lazy"
                objectFit={imageObjectFit || 'cover'}
                layout="fill"
                alt=""
                src={sanityImageUrlFor(props.image)
                  .height(Number(CARD_HEIGHT_PX))
                  .auto('format')
                  .url()}
              />
            )}
          </FlexCol>
        </Flex>
      </Flex>
    </Link>
  );
};

const SmallNewsCardBackgroundImage: React.FC<
  {
    image: string;
    bgImage?: string;
  } & Props
> = ({ bgImage, ...props }) => {
  return (
    <Link passHref href={props.href}>
      <Flex
        {...sharedBoxProps}
        bgColor={colors.white}
        as="a"
        cursor="pointer"
        height="320px"
        position="relative"
      >
        {props.image ? (
          <Image
            loading="lazy"
            unoptimized
            objectFit="contain"
            layout="fill"
            alt=""
            src={sanityImageUrlFor(props.image)
              .height(Number(CARD_HEIGHT_PX) * 2)
              .auto('format')
              .url()}
          />
        ) : null}
        <FlexCol justifyContent="flex-end" p={3} zIndex={100}>
          <FlexCol>
            <P noOfLines={1} color="white" fontSize={fontSizes.tiny}>
              {props.subtitle}
            </P>
            <P
              noOfLines={2}
              fontWeight={fontWeights.semiBold}
              color="white"
              mt={1}
            >
              {props.title}
            </P>
          </FlexCol>
          <Box>
            <LinkWithArrow
              color="white"
              title={'Read More'}
              href={props.href}
            />
          </Box>
        </FlexCol>
      </Flex>
    </Link>
  );
};

const BigNewsCard: React.FC<
  {
    image: string;
    bgImage?: string;
    light: any;
    hasCDIRelation: boolean;
    imageObjectFit: 'contain' | 'cover';
    linkText: string;
  } & Props &
    any
> = ({
  bgImage,
  hasCDIRelation,
  imageObjectFit,
  linkText,
  newsGridWithAdditionalPaddingForImage,
  ...props
}) => {
  const data = useSharedContentContext();

  const CDIText = hasCDIRelation ? (
    <P
      textAlign={{ base: 'left', lg: 'right' }}
      width="150px"
      fontWeight={fontWeights.semiBold}
      fontSize={fontSizes.small}
      color={props.light ? colors.black : colors.white}
      mt={{ base: 2, lg: 0 }}
    >
      {data.cdiTextNews}
    </P>
  ) : null;

  return (
    <Link passHref href={props.href}>
      <Flex
        bgColor={colors.white}
        as="a"
        {...sharedBoxProps}
        height="100%"
        maxWidth="100%"
        cursor="pointer"
        direction="column"
      >
        <FlexCol
          minHeight="50%"
          position="relative"
          justify="center"
          align="center"
          m={newsGridWithAdditionalPaddingForImage ? 2.5 : 0}
        >
          {props.image && (
            <Image
              loading="lazy"
              unoptimized
              objectFit={imageObjectFit || 'contain'}
              layout="fill"
              alt=""
              src={sanityImageUrlFor(props.image)
                .height(250)
                .auto('format')
                .url()}
            />
          )}
        </FlexCol>
        <FlexCol
          flex={1}
          justify="flex-end"
          height="50%"
          bg={
            props.light
              ? 'linear-gradient(264.95deg, #E0C6B7 -2.77%, #F8F8E6 62.17%);'
              : 'linear-gradient(101.37deg, #0C4E40 25.92%, #17AA8B 127.59%)'
          }
        >
          <FlexCol px={3} pb={3} justify="flex-end">
            <FlexCol justify="flex-end" flex={1}>
              <P
                noOfLines={1}
                color={props.light ? 'black' : 'white'}
                fontSize={fontSizes.tiny}
              >
                {props.subtitle}
              </P>
              <P
                noOfLines={2}
                fontWeight={fontWeights.semiBold}
                color={props.light ? 'black' : 'white'}
                mt={1}
                mb={3}
              >
                {props.title}
              </P>
            </FlexCol>
            <FlexRow
              flexWrap={{ base: 'wrap', lg: 'nowrap' }}
              alignItems="center"
              justifyContent="space-between"
            >
              <LinkWithArrow
                color={props.light ? 'black' : 'white'}
                title={linkText}
                href={props.href}
              />
              {CDIText}
            </FlexRow>
          </FlexCol>
        </FlexCol>
      </Flex>
    </Link>
  );
};

const EmployeeCard: React.FC<{ image: string } & Props> = ({ ...props }) => (
  <Link passHref href={props.href}>
    <Flex as="a" cursor="pointer" h="100%" role="group" overflow="hidden">
      <Flex
        position="relative"
        {...sharedBoxProps}
        height="100%"
        minWidth="100%"
      >
        {props.image ? (
          <Flex
            inset={0}
            position="absolute"
            backgroundImage={`url(${sanityImageUrlFor(props.image)
              .height(600)
              .auto('format')
              .url()})`}
            backgroundPosition="center"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            _groupHover={{
              transform: 'scale(1.2)',
            }}
            transform="scale(1)"
            transition="transform 1s cubic-bezier(0.25, 0.45, 0.45, 0.95)"
          />
        ) : (
          <Flex inset={0} position="absolute">
            <Image
              loading="lazy"
              unoptimized
              objectFit="cover"
              src={fallback}
              alt={''}
            />
          </Flex>
        )}
        <FlexCol
          zIndex={8}
          position="absolute"
          width="100%"
          height="80%"
          bottom={0}
          background="linear-gradient(0deg, black, transparent)"
        />
        <FlexCol zIndex={9} justify="flex-end">
          <FlexCol justify="flex-end" justifyContent="space-between" p={3}>
            <FlexCol height={INSIDE_HEIGHT} justify="flex-end">
              <P noOfLines={1} color="white" fontSize={fontSizes.tiny}>
                {props.subtitle}
              </P>
              <P
                noOfLines={2}
                fontWeight={fontWeights.semiBold}
                color="white"
                mt={1}
              >
                {props.title}
              </P>
            </FlexCol>
            <Box mt={2}>
              <LinkWithArrow
                color="white"
                title={props.linkText}
                href={props.href}
              />
            </Box>
          </FlexCol>
        </FlexCol>
      </Flex>
    </Flex>
  </Link>
);

export const CardDownload: React.FC<{
  noBg?: boolean;
  bgLight?: boolean;
  hideIconBtn?: boolean;
  padding?: number;
  btnWidth?: string | number;
  content: {
    title?: string;
    description?: string;
    emailLabel: string;
    buttonCaption: string;
    file: {
      asset: {
        url: string;
      };
    };
  };
}> = ({
  noBg = false,
  bgLight,
  hideIconBtn,
  padding = 4,
  btnWidth = '100%',
  content,
}) => {
  const [checkboxIsChecked, setCheckboxIsChecked] = React.useState(false);
  const [pressed] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const emailIsValid = email.trim() && EmailValidator.validate(email);
  const sharedContent = useSharedContentContext();

  const BG = bgLight
    ? { background: colors.white }
    : {
        backgroundImage: `url(${noBg ? '' : downloadBgImage.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      };

  const PColor = bgLight ? colors.primary.darkGreen : colors.white;
  const inputColor = bgLight ? colors.text.regular : colors.white;

  const linkWithCurrentLocale = useLinkWithCurrentLocale();

  return (
    <FlexCol height="100%" flex={1} p={padding} {...BG}>
      {content?.title && (
        <P mb={2} fontSize={fontSizes.websiteTransactionDetailH} color={PColor}>
          {content?.title}
        </P>
      )}
      {content?.description && (
        <P whiteSpace="pre-wrap" mb={2} color={PColor} fontSize={fontSizes.h3}>
          {content?.description}
        </P>
      )}
      <form action={process.env.NEXT_PUBLIC_DOWNLOAD_REPORT_URL} method="POST">
        {MarketingParamsService.renderHiddenInputElements()}
        <input
          type="hidden"
          name="file_url"
          value={content?.file?.asset?.url}
        />

        <Input
          name="email"
          type="text"
          _placeholder={{ color: noBg ? colors.text.lightest : inputColor }}
          color={inputColor}
          backgroundColor="transparent"
          background="transparent"
          borderTop="none"
          borderLeft="none"
          borderRight="none"
          borderBottom="1px"
          borderBottomColor={inputColor}
          focusBorderColor={inputColor}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder={content?.emailLabel}
          borderRadius={0}
          paddingLeft={0}
          isInvalid={!emailIsValid && pressed}
        />
        <FlexCol flexGrow={1} justify="flex-end">
          <Checkbox
            isInvalid={pressed && !checkboxIsChecked}
            onChange={(e) => setCheckboxIsChecked(e.target.checked)}
            isChecked={checkboxIsChecked}
            mt={3}
            mb={3}
            colorScheme={bgLight ? 'primary' : 'white'}
            borderColor={bgLight ? 'black' : 'white'}
            iconColor={bgLight ? 'black' : 'white'}
            alignItems="flex-start"
          >
            <P
              fontSize={fontSizes.small}
              color={bgLight ? colors.text.light : colors.white}
              textAlign="left"
              mt={-0.5}
            >
              <P
                fontSize={fontSizes.small}
                color={bgLight ? colors.text.light : colors.white}
                textAlign="left"
                mt={-0.5}
              >
                {sharedContent?.checkboxPrivacyText1}
                <Link
                  passHref
                  href={linkWithCurrentLocale(
                    sharedContent?.checkboxPrivacyPage?.slug?.current,
                  )}
                >
                  <a style={{ borderBottom: '1px solid white' }}>
                    {' ' + sharedContent?.checkboxPrivacyText2}
                  </a>
                </Link>
                {' ' + sharedContent?.checkboxPrivacyText3}
              </P>
            </P>
          </Checkbox>
          <Box w={btnWidth}>
            <Btn
              aria-label="Submit button"
              disabled={!checkboxIsChecked || !emailIsValid}
              type="submit"
              width="100%"
              variant={bgLight ? 'outlineGreen' : 'outlineWhite'}
            >
              <FlexRow alignItems="center">
                {!hideIconBtn && (
                  <FlexCol mr={1}>
                    <icons.Download />
                  </FlexCol>
                )}
                {content?.buttonCaption}
              </FlexRow>
            </Btn>
          </Box>
        </FlexCol>
      </form>
    </FlexCol>
  );
};

export const NewsGridCard = {
  SmallNewsCard,
  SmallNewsCardBackgroundImage,
  EmployeeCard: EmployeeCard,
  Download: CardDownload,
  BigNewsCard: BigNewsCard,
};
