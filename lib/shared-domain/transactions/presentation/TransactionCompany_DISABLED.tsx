import React from 'react';
import Image from 'next/image';

import { Transaction } from '../domain/index';
import { Box, FlexCol } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { getTranslateByScope } from 'translation/i18n';
import { Grid, GridItem } from '@chakra-ui/react';
import { P } from 'components/Typography/P';
import { colors } from 'styles/foundations/colors';
import { fontSizes } from 'styles/foundations/fontStyles';

const t = getTranslateByScope('website.transactionDetails.company');

const COMPANY_IMAGE_HEIGHT = '45px';

const Company: React.FC<{
  represented: boolean;
  subHeadline: string;
  description: string;
  image: string;
  content?: string;
  companyName?: string;
}> = ({
  represented,
  subHeadline,
  description,
  image,
  content,
  companyName,
}) => {
  const t = (item) => content?.[item];

  return (
    <>
      <Grid templateColumns="1fr">
        <GridItem minH={14}>
          {represented && (
            <P
              fontSize={fontSizes.websiteTransactionDetailH}
              color={colors.primary.darkGreen}
              mb={1}
              mt={{ base: 4, lg: 0 }}
            >
              {t('representedText')}
            </P>
          )}
        </GridItem>
        <GridItem minH={14} display="grid" alignItems="center">
          {image ? (
            <Box
              mb={3}
              position="relative"
              height={COMPANY_IMAGE_HEIGHT}
              minH={14}
            >
              <Image
                unoptimized
                loading="lazy"
                objectPosition="left"
                objectFit="contain"
                layout="fill"
                alt=""
                src={image}
              />
            </Box>
          ) : (
            <Box
              mb={3}
              position="relative"
              alignItems="center"
              minH={14}
              display="grid"
            >
              <P> {companyName}</P>
            </Box>
          )}
        </GridItem>
        <GridItem>
          <P mt={2} fontSize={fontSizes.websiteTransactionDetailH}>
            {subHeadline}
          </P>
          <P whiteSpace="pre-wrap" mt={2} color={colors.text.light}>
            {description}
          </P>
        </GridItem>
      </Grid>
    </>
  );
};

export const TransactionCompany: React.FC<{
  transaction: Transaction;
  content: any;
}> = ({ transaction, content }) => {
  if (
    !transaction?.companyDescription1?.length ||
    !transaction?.companyDescription2?.length
  )
    return null;

  return (
    <FlexCol
      width="100%"
      justifyContent="center"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <SectionContainer py="md">
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
          <GridItem>
            <Company
              subHeadline={transaction.companySubHeadline1}
              description={transaction.companyDescription1}
              image={transaction.companyLogo1?.asset?.url}
              represented={transaction.representedBySaxenhammer === 'company-1'}
              content={content}
              companyName={transaction?.companyName1}
            />
          </GridItem>
          <GridItem>
            <Company
              subHeadline={transaction.companySubHeadline2}
              description={transaction.companyDescription2}
              image={transaction.companyLogo2?.asset?.url}
              represented={transaction.representedBySaxenhammer === 'company-2'}
              content={content}
              companyName={transaction?.companyName2}
            />
          </GridItem>
        </Grid>
      </SectionContainer>
    </FlexCol>
  );
};
