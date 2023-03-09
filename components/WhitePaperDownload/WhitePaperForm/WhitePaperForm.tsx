import { useState } from 'react';
import Link from 'next/link';
import { Button } from 'components/Button';
import {
  FormGroup,
  Input,
  Textarea,
  Checkbox,
  Message,
  Label,
} from 'components/Form';
import styles from './WhitePaperForm.module.scss';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import { useContactFormSubmit } from 'lib/shared-domain/salesforce/application/useContactFormSubmit';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { SanityBlockContent } from 'components/SanityBlockContent';

const PhoneInput = dynamic(() => import('react-phone-number-input'));

export const WhitePaperForm = ({
  buttonText,
  namePlaceholder,
  emailPlaceholder,
  termsAndConditionsLabel,
}) => {
  const router = useRouter();
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);

  const [value, setValue] = useState();
  const PhoneInputComponent = PhoneInput as any;

  // const {
  //   name: nameProps,
  //   email: emailProps,
  //   phone: phoneProps,
  //   message: messageProps,
  //   isSuccess,
  //   isError,
  // } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <FormGroup>
        <Input
          id={'whitePaperFirstLastName'}
          type={'text'}
          required={true}
          placeholder={namePlaceholder}
        />
      </FormGroup>
      <FormGroup>
        <Input
          id={'whitePaperEmail'}
          type={'email'}
          required={true}
          placeholder={emailPlaceholder}
        />
      </FormGroup>
      <FormGroup classes={styles.phoneNum}>
        <Label text={'Phone number'} required={true} />
        <PhoneInputComponent
          defaultCountry={router.locale === 'en' ? 'GB' : 'DE'}
          international
          placeholder="Enter phone number"
          value={value}
          countryCallingCodeEditable={false}
          onChange={setValue}
        />
      </FormGroup>
      <FormGroup>
        <Checkbox
          id={'whitePaperCheckbox'}
          onChange={(e) => setCheckboxIsChecked(e.target.checked)}
          isChecked={checkboxIsChecked}
          required={true}
        >
          <SanityBlockContent text={termsAndConditionsLabel} />
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
