import { FlexCol } from './Layout/Flex/Flex';
import { ChatButton } from './Buttons/ChatButton/index';
import { useRouter } from 'next/router';
import { useBreakpointValue } from '@chakra-ui/media-query';

export const PageTransition: React.FC<{ slug: string }> = ({ children }) => {
  const router = useRouter();
  const IS_IN_QUESTIONNAIRE =
    router.pathname.startsWith('/questionnaires') ||
    router.pathname.startsWith('/fragenkatalog');
  const isMobile = useBreakpointValue({ base: true, lg: false });
  return (
    <>
      {children}
      {IS_IN_QUESTIONNAIRE ? (
        !isMobile && (
          <FlexCol
            align="flex-end"
            position="fixed"
            right={{ base: 3, lg: 6 }}
            bottom={3}
          >
            <ChatButton />
          </FlexCol>
        )
      ) : (
        <FlexCol
          align="flex-end"
          position="fixed"
          zIndex={999}
          right={3}
          bottom={3}
        >
          <ChatButton />
        </FlexCol>
      )}
    </>
  );
};
