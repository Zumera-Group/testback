import { Box } from 'components/Layout/Flex/Flex';
import React, { useMemo } from 'react';
import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import { Employee } from '../domain/index';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { getTranslateByScope } from 'translation/i18n';
import { SimpleGrid } from '@chakra-ui/react';
import { EmployeeCard } from '../../employees/presentation/EmployeeCard';
import { LinkWithArrow } from '../../page/presentation/components/LinkWithArrow';

const t = getTranslateByScope('website.employeeDetails.team');

export const EmployeeMoreMembers: React.FC<{
  employee: Employee;
  employees: Employee[];
  content: any;
}> = ({ employee, employees, content }) => {
  const employeesToFilter = [...employees];
  const filteredEmployees = employeesToFilter?.filter(
    (e) => e._id !== employee._id,
  );

  const maxIndex =
    filteredEmployees.length > 3 ? filteredEmployees.length - 3 : 0;
  const randomIndex = Math.floor(Math.random() * maxIndex);
  const display = filteredEmployees.slice(randomIndex, randomIndex + 3);

  if (!filteredEmployees || filteredEmployees.length === 0) return null;

  return (
    <SectionContainer py="md">
      <Box width={{ base: '100%', lg: '50%' }}>
        <TitleWithSubtitleAndDescription
          description={
            employee.moreMembersSection?.description || content?.description
          }
          title={employee.moreMembersSection?.title || content?.title}
          subtitle={employee.moreMembersSection?.subtitle || content?.subtitle}
        />
      </Box>
      <SimpleGrid mt={8} columns={{ base: 1, md: 2, lg: 3 }} spacing={3}>
        {display.map((p, index) => (
          <EmployeeCard
            linkText={
              employee.moreMembersSection?.cardEmployeeLink || content?.linkText
            }
            employee={p}
            key={p._id}
          />
        ))}
      </SimpleGrid>
    </SectionContainer>
  );
};
3;
