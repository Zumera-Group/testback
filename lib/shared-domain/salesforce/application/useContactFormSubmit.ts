import React, { useState } from 'react';
import * as EmailValidator from 'email-validator';

import { SalesforceFacade } from '../infrastructure/salesforce.facade';
import { useGetURL } from 'lib/hooks/useGetURL';

export const useContactFormSubmit = () => {
  const [nameTouched, setNameTouched] = React.useState(false);
  const [emailTouched, setEmailTouched] = React.useState(false);
  const [phoneTouched, setPhoneTouched] = React.useState(false);
  const [isNewsletterAccepted, setIsNewsletterAccepted] = React.useState(false);
  const [isPolicyCheckboxAccepted, setIsPolicyCheckboxAccepted] = useState(false);
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [message, setMessage] = React.useState('');

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const facade = new SalesforceFacade();

  const isNameValid = name.trim();
  const isEmailValid = email.trim() && EmailValidator.validate(email.trim());
  const isPhoneValid = phone.trim();

  const fullUrl = useGetURL();

  const resetForm = () => {
    setEmail('');
    setName('');
    setPhone('');
    setMessage('');
    setNameTouched(false);
    setEmailTouched(false);
    setPhoneTouched(false);
    setIsPolicyCheckboxAccepted(false)
    setIsNewsletterAccepted(false)
  };

  return {
    isSuccess,
    isError,
    email: {
      isInvalid: !isEmailValid && emailTouched,
      value: email,
      onChange: (e) => {
        setEmail(e.target.value);
        setEmailTouched(true);
      },
    },
    name: {
      isInvalid: !isNameValid && nameTouched,
      value: name,
      onChange: (e) => {
        setName(e.target.value);
        setNameTouched(true);
      },
    },
    phone: {
      isInvalid: !isPhoneValid && phoneTouched,
      value: phone,
      onChange: (e) => {
        setPhone(e.target.value);
        setPhoneTouched(true);
      },
    },
    message: {
      isInvalid: false,
      value: message,
      onChange: (e) => setMessage(e.target.value),
    },
    leadSourceURL: {},
    policyCheckbox: {
      isChecked: isPolicyCheckboxAccepted,
      onChange: (e) => setIsPolicyCheckboxAccepted(e.target.checked),
    },
    newsLetterCheckbox: {
      isChecked: isNewsletterAccepted,
      onChange: (e) => setIsNewsletterAccepted(e.target.checked),
    },
    submit: async () => {
      setEmailTouched(true);
      setNameTouched(true);
      setPhoneTouched(true);
      if (!isPhoneValid || !isEmailValid || !isNameValid) return;
      const [firstName, lastName] = name?.split(' ');
      try {
        await facade.submitContactForm({
          email: email,
          phone: phone,
          firstName: firstName || '',
          lastName: lastName || firstName,
          message: message,
          leadSourceURL: fullUrl,
          isNewsletterAccepted,
        });
        resetForm();
        setIsError(false);
        setIsSuccess(true);
      } catch {
        setIsSuccess(false);
        setIsError(true);
      }
    },
  };
};
