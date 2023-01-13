import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from '@chakra-ui/react';
import { colors } from 'styles/foundations/colors';
import { icons } from '../../../../../../components/Icons/index';
import {
  fontWeights,
  fontSizes,
} from '../../../../../../styles/foundations/fontStyles';
import { Box, FlexRow } from '../../../../../../components/Layout/Flex/Flex';
import { Sector } from 'lib/shared-domain/page/domain';
import { P } from 'components/Typography/P';

const Dropdown: React.FC<{
  data: { name: string }[];
  handleSelect(e: any, s: any): void;
}> = ({ data, handleSelect }) => {
  const [selected, setSelected] = useState<string>(data[0].name);
  return (
    <Menu>
      <MenuButton
        as={Button}
        _hover={{ boxShadow: 'none' }}
        border="none"
        borderBottom={`2px solid ${colors.primary.darkGreen}`}
        rightIcon={<icons.DropdownArrow />}
        cursor="pointer"
        px={0}
        w="100%"
        textAlign="justify"
      >
        <P
          fontWeight={fontWeights.semiBold}
          fontSize={fontSizes.h2}
          textTransform="uppercase"
          lineHeight="20px"
          color={colors.primary.darkGreen}
          isTruncated
          maxWidth="100%"
        >
          {selected}
        </P>
      </MenuButton>
      <MenuList bg={colors.white} borderRadius="none" maxWidth="350px">
        {data &&
          data.map((s, index) => (
            <MenuItem
              key={index}
              fontWeight={fontWeights.semiBold}
              fontSize={fontSizes.h3}
              textTransform="uppercase"
              lineHeight="20px"
              color={colors.primary.darkGreen}
              mb={1}
              onClick={() => {
                setSelected(s.name);
                handleSelect(s.name, s);
              }}
            >
              {s.name}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
};

export const DropdownMenu: React.FC<{
  sectors: {
    name: string;
  }[];
  services: {
    name: string;
  }[];
  handleSector(sectorName: string, s: Sector): void;
  handleService(serviceName: string): void;
}> = ({ sectors, services, handleSector, handleService }) => {
  // const isMobile = useBreakpointValue({ base: true, lg: false });
  const isMobile = false;
  return (
    <>
      <Dropdown
        data={[{ name: 'ALL' }, ...sectors]}
        handleSelect={handleSector}
      />
      <FlexRow
        justify="center"
        my={isMobile ? 5 : 0}
        mb={isMobile && 1}
        mx={isMobile ? 0 : 8}
      >
        <icons.TransactionX
          size="25px"
          color={colors.primary.darkGreen}
          strokeW="6px"
        />
      </FlexRow>
      <Dropdown
        data={[{ name: 'ALL' }, ...services]}
        handleSelect={handleService}
      />
    </>
  );
};
