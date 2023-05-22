import { useState } from 'react';
import { Button } from 'components/Button';
import { FormGroup, Input, Checkbox, Label } from 'components/Form';
import styles from './WhitePaperForm.module.scss';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { SanityBlockContent } from 'components/SanityBlockContent';
import axios from 'axios';
import { Icon } from 'components/Icon';

const PhoneInput = dynamic(() => import('react-phone-number-input'));

export const WhitePaperForm = ({
  buttonText,
  namePlaceholder,
  emailPlaceholder,
  termsAndConditionsLabel,
  successMessage,
  downloadAgain,
  phoneNumber,
  file,
}) => {
  const router = useRouter();
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [value, setValue] = useState();
  const PhoneInputComponent = PhoneInput as any;

  const downloadFile = () => {
    axios({
      // url: file.asset.url,
      url: 'https://cdn.sanity.io/files/8r7hp46l/development/5592b141c8ecedad006ecf087347b073a1758581.png',
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // @ts-ignore
    const inputs = document.getElementById('white-paper-form').elements;
    const formData = {
      whitePaperFirstLastName: inputs['whitePaperFirstLastName'].value,
      whitePaperEmail: inputs['whitePaperEmail'].value,
      whitePaperPhone: value,
    };
    const fakeRequest = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Success');
      }, 2000);
    });

    const result = await fakeRequest;
    if (result === 'Success') {
      downloadFile();
      setIsFormSubmitted(true);
    }
  };

  return !isFormSubmitted ? (
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

      {/*{isError && (*/}
      {/*  <FormGroup>*/}
      {/*    <Message isError>{errorMessage}</Message>*/}
      {/*  </FormGroup>*/}
      {/*)}*/}
    </form>
  ) : (
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
  );
};

export default WhitePaperForm;
