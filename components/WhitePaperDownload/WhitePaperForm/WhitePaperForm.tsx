import { useState } from 'react';

import Link from 'next/link';

import { Button } from 'components/Button';
import { FormGroup, Input, Textarea, Checkbox, Message } from 'components/Form';
import { SanityBlockContent } from 'components/SanityBlockContent';

import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import { useContactFormSubmit } from 'lib/shared-domain/salesforce/application/useContactFormSubmit';

import styles from './WhitePaperForm.module.scss';

export const WhitePaperForm = ({
  buttonText,
  namePlaceholder,
  emailPlaceholder,
}) => {
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const sharedContent = useSharedContentContext();
  const linkWithCurrentLocale = useLinkWithCurrentLocale();
  const form = useContactFormSubmit();

  const {
    name: nameProps,
    email: emailProps,
    phone: phoneProps,
    message: messageProps,
    isSuccess,
    isError,
  } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.submit();
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <FormGroup>
        <Input
          id={'firstLastName'}
          type={'text'}
          required={true}
          placeholder={namePlaceholder}
          {...nameProps}
        />
      </FormGroup>
      <FormGroup>
        <Input
          id={'contactFormEmail'}
          type={'email'}
          required={true}
          placeholder={emailPlaceholder}
          {...emailProps}
        />
      </FormGroup>
      {/*<FormGroup>*/}
      {/*  <Input*/}
      {/*    id={'contactFormPhone'}*/}
      {/*    type={'tel'}*/}
      {/*    required={true}*/}
      {/*    placeholder={phoneNumberPlaceholder}*/}
      {/*    {...phoneProps}*/}
      {/*  />*/}
      {/*</FormGroup>*/}
      <FormGroup>
        <Checkbox
          id={'contactFormTerms'}
          onChange={(e) => setCheckboxIsChecked(e.target.checked)}
          isChecked={checkboxIsChecked}
          required={true}
        >
          {sharedContent?.checkboxPrivacyText1}{' '}
          <Link
            passHref
            href={linkWithCurrentLocale(
              sharedContent?.checkboxPrivacyPage?.slug?.current,
            )}
          >
            {sharedContent?.checkboxPrivacyText2}
          </Link>
          {' ' + sharedContent?.checkboxPrivacyText3}
        </Checkbox>
      </FormGroup>
      <FormGroup>
        <Button
          variant={'primary'}
          onDark={true}
          type={'submit'}
          title={'Send'}
          classes={styles.submitBtn}
          disabled={!checkboxIsChecked}
        >
          {buttonText}
        </Button>
      </FormGroup>
      {/*{isSuccess && (*/}
      {/*  <FormGroup>*/}
      {/*    <Message isSuccess>{successMessage}</Message>*/}
      {/*  </FormGroup>*/}
      {/*)}*/}
      {/*{isError && (*/}
      {/*  <FormGroup>*/}
      {/*    <Message isError>{errorMessage}</Message>*/}
      {/*  </FormGroup>*/}
      {/*)}*/}
    </form>
  );
};

export default WhitePaperForm;
