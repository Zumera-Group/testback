import React from 'react';
import * as EmailValidator from 'email-validator';
import Link from 'next/link';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  Checkbox,
} from '@chakra-ui/react';
import { Box, FlexRow } from 'components/Layout/Flex/Flex';
import { H } from 'components/Typography/H';
import { P } from 'components/Typography/P';
import { getTranslateByScope } from 'translation/i18n';
import { Input } from 'components/Inputs';
import { Btn } from 'components/Buttons/Button';
import { colors } from 'styles/foundations/colors';
import { MarketingParamsService } from 'lib/shared-domain/salesforce/application/marketingParamsService';
import { useValuationStore } from '../../store';
import { fontSizes } from 'styles/foundations/fontStyles';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';

const t = getTranslateByScope('header.quitModal');

const QuitModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [checkboxIsChecked, setCheckboxIsChecked] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [pressed] = React.useState(false);
  const { uniqueId } = useValuationStore();
  const sharedContent = useSharedContentContext();
  const linkWithCurrentLocale = useLinkWithCurrentLocale();

  const emailIsValid = email.trim() && EmailValidator.validate(email);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor="white" maxWidth={700} borderRadius={0}>
        <ModalCloseButton color="black" top={1} right={1} />
        <ModalBody>
          <H mt={6} mb={5} variant="h1" textAlign="center">
            {t('title')}
          </H>
          <P color={colors.text.light} textAlign="center">
            {t('description')}
          </P>
          <Box mb={4} maxWidth="550px" mx="auto">
            <form
              action={process.env.NEXT_PUBLIC_SAVE_FOR_LATER_API_URL}
              method="POST"
            >
              <input type="hidden" name="unique_id" value={uniqueId} />
              {MarketingParamsService.renderHiddenInputElements()}
              <FlexRow mt={4} mb={3} alignItems="center">
                <Input
                  name="email"
                  isInvalid={!emailIsValid && pressed}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('input.placeholder')}
                />
                <Btn
                  aria-label="Send email to save for later button"
                  type="submit"
                  disabled={!emailIsValid || !checkboxIsChecked}
                  ml={2}
                  variant="primary"
                >
                  {t('input.button')}
                </Btn>
              </FlexRow>
              <Checkbox
                isInvalid={pressed && !checkboxIsChecked}
                borderColor="inputBorderColor"
                size="lg"
                onChange={(e) => setCheckboxIsChecked(e.target.checked)}
                isChecked={checkboxIsChecked}
                colorScheme="primary"
                alignItems="flex-start"
              >
                <Box textAlign="left" mt={-0.5}>
                  <P
                    fontSize={fontSizes.small}
                    color={colors.text.light}
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
                      <a
                        style={{
                          borderBottom: '1px solid #0C4E40',
                          color: '#0C4E40',
                          fontWeight: 'bold',
                        }}
                      >
                        {' ' + sharedContent?.checkboxPrivacyText2}
                      </a>
                    </Link>
                    {' ' + sharedContent?.checkboxPrivacyText3}
                  </P>
                </Box>
              </Checkbox>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const Modals = { Quit: QuitModal };
