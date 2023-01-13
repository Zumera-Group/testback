import React from 'react';

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
  return (
    <BaseInput
      color="black"
      backgroundColor="inputBgColor"
      focusBorderColor="primary.darkGreen"
      borderRadius={0}
      borderStyle="solid"
      borderWidth={1}
      borderColor="inputBorderColor"
      px={2}
      height={10}
      {...props}
    />
  );
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
  onChange: (arg: string) => void;
  error?: string;
}> = ({ label, placeholder, value, onChange, error }) => {
  return (
    <FormControl isInvalid={!!error} mb={2}>
      <FormLabel color="black" mb={0.5}>
        {label}
      </FormLabel>
      <Input
        color="black"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
      {error && <FormErrorMessage mt={0.5}>{error}</FormErrorMessage>}
    </FormControl>
  );
};
