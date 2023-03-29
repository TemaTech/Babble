import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { useAtom } from 'jotai'
import { useState } from "react";
import { requestPasswordResetFormData } from '../../../store'

export const RequestPasswordReset = () => {
  const [passwordResetForm, setPasswordResetForm] = useAtom(requestPasswordResetFormData);
  const [isEmailError, setIsEmailError] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordResetForm((prev) => ({ ...prev, email: event.target.value }));
    setIsEmailError(event.target.value === '');
  }

  const handleButtonClick = () => {
    setIsEmailError(passwordResetForm.email === '');
  }

  return (
    <Flex gap='3' direction='column'>
      <FormControl isRequired isInvalid={isEmailError}>
        <FormLabel color='blue.800' aria-required>Your email address:</FormLabel>
        <Input type='email' color='blue.800' value={passwordResetForm.email} onChange={handleEmailChange} />
        {
          isEmailError && <FormErrorMessage>This field is required.</FormErrorMessage>
        }
        <FormHelperText color='blue.800'>
          Enter your email address and we'll send you a link to reset your password.
        </FormHelperText>
      </FormControl>
      <Button colorScheme='blue' onClick={handleButtonClick}>Send a reset link</Button>
    </Flex>
  );
}