import React, {useEffect, useMemo, useState} from 'react';
import { Button } from 'components/Button';
import { Checkbox, FormGroup, Input } from 'components/Form';
import styles from './WhitePaperForm.module.scss';
import { Icon } from 'components/Icon';
import Link from 'next/link';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import { MarketingParamsService } from 'lib/shared-domain/salesforce/application/marketingParamsService';
import { useGetURL } from 'lib/hooks/useGetURL';
import { NEWSLETTER_CHECKBOX } from '../../../lib/shared-domain/questionnaire/presentation/Result/constants';


export const WhitePaperForm = ({
  buttonText,
  namePlaceholder,
  emailPlaceholder,
  termsAndConditionsLabel,
  successMessage,
  errorMessage,
  downloadAgain,
  file,
  variant,
  sectorName,
  newsLetterCheckboxText,
  isNewsLetterCheckboxRequired,
  name = 'default'
}: {
  buttonText?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  termsAndConditionsLabel: any;
  successMessage?: string;
  errorMessage?: string;
  downloadAgain?: string;
  file?: string;
  variant?: string;
  sectorName?: string;
  newsLetterCheckboxText?: string;
  isNewsLetterCheckboxRequired?: boolean;
  name?: string;
}) => {
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const [newsLetterCheckboxIsChecked, setNewsLetterCheckboxIsChecked] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const linkWithCurrentLocale = useLinkWithCurrentLocale();
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const showNewsLetterCheckbox = !!newsLetterCheckboxText;
  const isAllowSubmit = useMemo(() => {
    if (!checkboxIsChecked) {
      return false;
    }

    if (showNewsLetterCheckbox && isNewsLetterCheckboxRequired && !newsLetterCheckboxIsChecked) {
      return false;
    }

    return true;
  }, [checkboxIsChecked, showNewsLetterCheckbox, isNewsLetterCheckboxRequired, newsLetterCheckboxIsChecked]);

  const {
    checkboxPrivacyText1,
    checkboxPrivacyText2,
    checkboxPrivacyText3,
    checkboxPrivacyPage,
  } = termsAndConditionsLabel;

  const [isSuccess, setIsSuccess] = useState(null);
  const [gclid, setGCLID] = useState(null);
  const DOMAIN = process.env.NEXT_PUBLIC_EXTERNAL_PDF_HOST || '';

  useEffect(() => {
    const marketingParams = MarketingParamsService.retrieve();
    const hasGclid = marketingParams.hasOwnProperty('gclid');
    const gclidValue = hasGclid ? marketingParams['gclid'] : '';
    setGCLID(gclidValue);
  }, []);

  const downloadFile = async () => {
    const pdfPath = file.substring(DOMAIN.length);
    const externalUrl = file.includes(DOMAIN) ? `/whitepaper/${pdfPath}` : file;

    window.location.assign(externalUrl);
    return () => undefined;
  };

  const fullURL = useGetURL();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const splitName = String(fullName).split(' ');
    const formData = {
      firstName: splitName[0],
      lastName: splitName[1],
      company: fullName,
      email: email,
      variant: variant,
      sectorName: sectorName,
      gclid: gclid,
      leadSourceURL: fullURL,
    };

    if (showNewsLetterCheckbox) {
      Object.assign(formData, {
        [NEWSLETTER_CHECKBOX]: newsLetterCheckboxIsChecked
      });
    }

    try {
      const response = await fetch('/api/whitepaperForms/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        downloadFile();
        setIsFormSubmitted(true);
        setIsSuccess(true);
      } else {
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
          id={`white-paper-form-${name}`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <FormGroup>
            <Input
              id={`whitePaperFirstLastName-${name}`}
              name={'whitePaperFirstLastName'}
              type={'text'}
              required={true}
              placeholder={namePlaceholder}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id={`whitePaperEmail-${name}`}
              name={'whitePaperEmail'}
              type={'email'}
              required={true}
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Checkbox
              id={`whitePaperCheckbox-${name}`}
              onChange={(e) => setCheckboxIsChecked(e.target.checked)}
              isChecked={checkboxIsChecked}
              required={true}
            >
              {checkboxPrivacyText1}{' '}
              <Link
                className={styles.link}
                passHref
                href={linkWithCurrentLocale(checkboxPrivacyPage?.slug?.current)}
                target="_blank"
              >
                {checkboxPrivacyText2}
              </Link>
              {' ' + checkboxPrivacyText3}
            </Checkbox>
          </FormGroup>
          {showNewsLetterCheckbox &&
          <FormGroup>
            <Checkbox
              id={`newsLetterCheckbox-${name}`}
              required={Boolean(isNewsLetterCheckboxRequired)}
              isChecked={newsLetterCheckboxIsChecked}
              onChange={(e) => setNewsLetterCheckboxIsChecked(e.target.checked)}
            >
              {newsLetterCheckboxText}
            </Checkbox>
          </FormGroup>}
          <FormGroup>
            <Button
              variant={'primary'}
              onDark={true}
              type={'submit'}
              title={'Send'}
              classes={styles.submitBtn}
              disabled={!isAllowSubmit}
            >
              {buttonText}
            </Button>
          </FormGroup>
        </form>
      )}

      {(isFormSubmitted && isSuccess) && (
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

      {(isFormSubmitted && !isSuccess) && (
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

