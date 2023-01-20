import React from 'react';
import styles from './../Form/Input/Input.module.scss';

import {
  Input as BaseInput,
  Textarea as BaseTextarea,
  InputProps,
  NumberInputProps,
  TextareaProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput as ChakraNumberInput,
  NumberInputField,
} from '@chakra-ui/react';

export const Input: React.FC<InputProps> = (props) => {
  return <BaseInput {...props} />;
};

export const InputNumber: React.FC<NumberInputProps> = (props) => {
  return (
    <ChakraNumberInput {...props}>
      <NumberInputField
        color="black"
        backgroundColor="inputBgColor"
        // @ts-ignore
        focusBorderColor="primary.darkGreen"
        borderRadius={0}
        borderStyle="solid"
        borderWidth={1}
        borderColor="inputBorderColor"
        px={2}
        height={10}
      />
    </ChakraNumberInput>
  );
};

export const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <BaseTextarea
      color="black"
      backgroundColor="inputBgColor"
      background="inputBgColor"
      focusBorderColor="primary.darkGreen"
      borderRadius={0}
      borderStyle="solid"
      borderWidth={1}
      borderColor="inputBorderColor"
      px={2}
      height={12}
      {...props}
    />
  );
};

export const InputWithLabelAndError: React.FC<{
  label: string;
  placeholder: string;
  value: string;
  classes?: string;
  onChange: (arg: string) => void;
  error?: string;
  isRequired: boolean;
}> = ({ label, placeholder, value, onChange, error, classes, isRequired }) => {
  return (
    <FormControl isInvalid={!!error} mb={30}>
      <FormLabel color="white" mb={'1rem'}>
        {label} {isRequired && <span style={{ color: '#f0005c' }}>*</span>}
      </FormLabel>
      <Input
        color="white"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        className={[styles.input, classes ? classes : ''].join(' ')}
      />
      {error && (
        <FormErrorMessage mt={20} color={'white'}>
          {error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
