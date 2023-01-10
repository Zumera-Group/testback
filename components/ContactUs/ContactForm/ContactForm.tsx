import { useState } from 'react';

import Link from 'next/link';

import { Button } from 'components/Button';
import { FormGroup, Input, Textarea, Checkbox, Message } from 'components/Form';
import { SanityBlockContent } from 'components/SanityBlockContent';

import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import { useContactFormSubmit } from 'lib/shared-domain/salesforce/application/useContactFormSubmit';

import styles from './ContactForm.module.scss';

export const ContactForm = ({ contactForm }) => {
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const sharedContent = useSharedContentContext();
  const linkWithCurrentLocale = useLinkWithCurrentLocale();
  const form = useContactFormSubmit();
  
  const {
    title,
    description,
    buttonText,
    namePlaceholder,
    emailPlaceholder,
    phoneNumberPlaceholder,
    messagePlaceholder,
    successMessage,
    errorMessage,
  } = contactForm;

  const {
    name: nameProps,
    email: emailProps,
    phone: phoneProps,
    message: messageProps,
    isSuccess,
    isError
  } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.submit();
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => handleSubmit(e)}
    >
      <fieldset className={styles.formHeader}>
        {title && <legend className={styles.title}>{title}</legend>}
        {description && (
          <>
            {Array.isArray(description) ? (
              <SanityBlockContent text={description} />
            ) : (
              <p>{description}</p>
            )}
          </>
        )}
      </fieldset>
      <FormGroup>
        <Input
          id={'contactFormName'}
          type={'text'}
          required={true}
          placeholder={namePlaceholder}
          {...nameProps} />
      </FormGroup>
      <FormGroup>
        <Input
          id={'contactFormEmail'}
          type={'email'}
          required={true}
          placeholder={emailPlaceholder}
          {...emailProps} />
      </FormGroup>
      <FormGroup>
        <Input
          id={'contactFormPhone'}
          type={'tel'}
          required={true}
          placeholder={phoneNumberPlaceholder}
          {...phoneProps} />
      </FormGroup>
      <FormGroup>
        <Textarea
          id={'contactFormMessage'}
          rows={8}
          required={false}
          placeholder={messagePlaceholder}
          {...messageProps} />
      </FormGroup>
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
              href={linkWithCurrentLocale(sharedContent?.checkboxPrivacyPage?.slug?.current)}
            >
              <a>{sharedContent?.checkboxPrivacyText2}</a>
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
      {isSuccess && (
        <FormGroup>
          <Message isSuccess>{successMessage}</Message>
        </FormGroup>
      )}
      {isError && (
        <FormGroup>
          <Message isError>{errorMessage}</Message>
        </FormGroup>
      )}
    </form>
  );
};

export default ContactForm;