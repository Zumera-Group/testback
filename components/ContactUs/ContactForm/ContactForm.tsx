import Link from 'next/link';

import { Button } from 'components/Button';
import { Checkbox, FormGroup, Input, Message, Textarea } from 'components/Form';
import { SanityBlockContent } from 'components/SanityBlockContent';

import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import { useContactFormSubmit } from 'lib/shared-domain/salesforce/application/useContactFormSubmit';

import styles from './ContactForm.module.scss';

export const ContactForm = ({ contactForm }) => {
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
    checkboxPrivacyText1,
    checkboxPrivacyText2,
    checkboxPrivacyText3,
    checkboxPrivacyPage,
    newsLetterCheckboxText,
    isNewsLetterCheckboxRequired,
  } = contactForm;

  const {
    name: nameProps,
    email: emailProps,
    phone: phoneProps,
    message: messageProps,
    policyCheckbox,
    newsLetterCheckbox,
    isSuccess,
    isError,
  } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.submit();
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
      <FormGroup>
        <Input
          id={'contactFormPhone'}
          type={'tel'}
          required={true}
          placeholder={phoneNumberPlaceholder}
          {...phoneProps}
        />
      </FormGroup>
      <FormGroup>
        <Textarea
          id={'contactFormMessage'}
          rows={8}
          required={false}
          placeholder={messagePlaceholder}
          {...messageProps}
        />
      </FormGroup>
      <FormGroup>
        <Checkbox
          id={'contactFormTerms'}
          required={true}
          {...policyCheckbox}
        >
          {checkboxPrivacyText1}
          <Link
            passHref
            href={linkWithCurrentLocale(checkboxPrivacyPage?.slug?.current)}
          >
            {checkboxPrivacyText2}
          </Link>
          {' ' + checkboxPrivacyText3}
        </Checkbox>
      </FormGroup>
      {
        !!newsLetterCheckboxText &&
        <FormGroup>
          <Checkbox
            id={'newsLetterCheckbox'}
            required={!!isNewsLetterCheckboxRequired}
            {...newsLetterCheckbox}
          >
            {newsLetterCheckboxText}
          </Checkbox>
        </FormGroup>
      }
      <FormGroup>
        <Button
          variant={'primary'}
          onDark={true}
          type={'submit'}
          title={'Send'}
          classes={styles.submitBtn}
          disabled={!policyCheckbox.isChecked}
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
