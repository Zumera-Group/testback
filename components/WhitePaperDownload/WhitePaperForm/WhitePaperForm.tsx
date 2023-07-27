import React, { useState } from 'react';
import { Button } from 'components/Button';
import { FormGroup, Input, Checkbox, Label } from 'components/Form';
import styles from './WhitePaperForm.module.scss';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Icon } from 'components/Icon';
import Link from 'next/link';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import { useGetURL } from 'lib/hooks/useGetURL';

const PhoneInput = dynamic(() => import('react-phone-number-input'));

export const WhitePaperForm = ({
  buttonText,
  namePlaceholder,
  emailPlaceholder,
  termsAndConditionsLabel,
  successMessage,
  errorMessage,
  downloadAgain,
  phoneNumber,
  file,
  variant,
  sectorName,
}) => {
  const router = useRouter();
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const linkWithCurrentLocale = useLinkWithCurrentLocale();
  const {
    checkboxPrivacyText1,
    checkboxPrivacyText2,
    checkboxPrivacyText3,
    checkboxPrivacyPage,
  } = termsAndConditionsLabel;

  const [phoneValue, setPhoneValue] = useState();
  const [countryValue, setCountryValue] = useState(
    router.locale === 'en' ? 'United Kingdom' : 'Germany',
  );
  const [isSuccess, setIsSuccess] = useState(null);
  const DOMAIN = process.env.NEXT_PUBLIC_EXTERNAL_PDF_HOST;
  const PhoneInputComponent = PhoneInput as any;

  const handleCountryChange = () => {
    const country = document?.getElementsByClassName('PhoneInputCountrySelect');
    const countrySelect = country[0] as HTMLSelectElement | undefined;
    const countryContent = countrySelect?.selectedOptions[0]?.textContent;
    setCountryValue(countryContent);
  };

  const downloadFile = async () => {
    const pdfPath = file.substring(DOMAIN.length);
    const externalUrl = file.includes(DOMAIN) ? `/whitepaper/${pdfPath}` : file;
    const timer = setTimeout(() => {
      window.open(externalUrl, '_blank');
    }, 2000);
    return () => clearTimeout(timer);
  };

  const fullURL = useGetURL();
  console.log(fullURL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // @ts-ignore
    const inputs = document.getElementById('white-paper-form').elements;

    const formData = {
      firstName: inputs['whitePaperFirstLastName'].value.split(' ')[0],
      lastName: inputs['whitePaperFirstLastName'].value.split(' ')[1],
      company: `${inputs['whitePaperFirstLastName'].value.split(' ')[0]} ${
        inputs['whitePaperFirstLastName'].value.split(' ')[1]
      }`,
      country: countryValue,
      email: inputs['whitePaperEmail'].value,
      phone: phoneValue,
      variant: variant,
      sectorName: sectorName,
      leadSourceURL: fullURL,
    };

    try {
      const response = await fetch('/api/whitepaperForms/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('success');
        downloadFile();
        setIsFormSubmitted(true);
        setIsSuccess(true);
      } else {
        console.error('failed');
        setIsFormSubmitted(true);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <>
      {!isFormSubmitted && (
        <form
          className={styles.form}
          id={'white-paper-form'}
          onSubmit={(e) => handleSubmit(e)}
        >
          <FormGroup>
            <Input
              id={'whitePaperFirstLastName'}
              name={'whitePaperFirstLastName'}
              type={'text'}
              required={true}
              placeholder={namePlaceholder}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id={'whitePaperEmail'}
              name={'whitePaperEmail'}
              type={'email'}
              required={true}
              placeholder={emailPlaceholder}
            />
          </FormGroup>
          <FormGroup classes={styles.phoneNum}>
            <Label text={phoneNumber} required={true} />
            <PhoneInputComponent
              defaultCountry={router.locale === 'en' ? 'GB' : 'DE'}
              international
              placeholder="Enter phone number"
              value={phoneValue}
              countryCallingCodeEditable={false}
              onChange={setPhoneValue}
              onCountryChange={handleCountryChange}
            />
          </FormGroup>
          <FormGroup>
            <Checkbox
              id={'whitePaperCheckbox'}
              onChange={(e) => setCheckboxIsChecked(e.target.checked)}
              isChecked={checkboxIsChecked}
              required={true}
            >
              {checkboxPrivacyText1}{' '}
              <Link
                passHref
                href={linkWithCurrentLocale(checkboxPrivacyPage?.slug?.current)}
                target="_blank"
              >
                {checkboxPrivacyText2}
              </Link>
              {' ' + checkboxPrivacyText3}
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
        </form>
      )}

      {isFormSubmitted && isSuccess && (
        <div className={styles.successMessage}>
          <Icon
            iconName={'tick'}
            fill={'#fff'}
            stroke={'#fff'}
            width={32}
            height={32}
          />
          <p>{successMessage}</p>
          <Button
            variant={'primary'}
            onDark={true}
            type={'button'}
            title={'Send'}
            classes={styles.submitBtn}
            callBack={() => {
              setIsFormSubmitted(false);
            }}
          >
            {downloadAgain}
          </Button>
        </div>
      )}

      {isFormSubmitted && !isSuccess && (
        <div className={styles.successMessage}>
          <p>{errorMessage}</p>
          <Button
            variant={'primary'}
            onDark={true}
            type={'button'}
            title={'Send'}
            classes={styles.submitBtn}
            callBack={() => {
              setIsFormSubmitted(false);
            }}
          >
            {downloadAgain}
          </Button>
        </div>
      )}
    </>
  );
};

export default WhitePaperForm;
