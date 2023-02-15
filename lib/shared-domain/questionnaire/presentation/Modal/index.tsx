import React from 'react';
import * as EmailValidator from 'email-validator';
import { getTranslateByScope } from 'translation/i18n';
import { MarketingParamsService } from 'lib/shared-domain/salesforce/application/marketingParamsService';
import { useValuationStore } from '../../store';
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

  return <div>Model</div>;
};

export const Modals = { Quit: QuitModal };
