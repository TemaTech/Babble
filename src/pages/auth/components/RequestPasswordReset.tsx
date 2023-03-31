import { Button, ButtonSpinner } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { sendPasswordResetEmail } from "@firebase/auth";
import { useAtom } from 'jotai'
import { useState } from "react";
import { auth } from "../../../firebase/config";
import { requestPasswordResetFormData } from '../../../store'

export const RequestPasswordReset = () => {
  const [passwordResetForm, setPasswordResetForm] = useAtom(requestPasswordResetFormData);
  const [isEmailError, setIsEmailError] = useState({
    error: false,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const emailErrorCheck = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
      setIsEmailError({
        error: true,
        message: 'This field is required.',
      });
    } else if (!emailRegex.test(email)) {
      setIsEmailError({
        error: true,
        message: "This isn't an email address."
      });
    } else {
      setIsEmailError({
        error: false,
        message: '',
      });
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordResetForm((prev) => ({ ...prev, email: event.target.value }));
    emailErrorCheck(event.target.value);
  }

  const handleSendPasswordResetRequest = async () => {
    emailErrorCheck(passwordResetForm.email)
    if (!isEmailError.error) {
      setLoading(true);
      try {
        await sendPasswordResetEmail(auth, passwordResetForm.email, {
          url: 'http://localhost:5173/auth',
        });

        toast({
          title: "Password reset request",
          description: "We've send you a password reset link on your email address.",
          variant: 'left-accent',
          isClosable: true,
          status: 'success',
          duration: 5000,
          position: 'top',
        });
      } catch (err: any) {
        if (err.code === 'auth/invalid-email') {
          setIsEmailError({
            error: true,
            message: "Invalid email address."
          });
        }  else if (err.code === 'auth/user-not-found') {
          setIsEmailError({
            error: true,
            message: "The user with this email address doesn't exist."
          });
        } else {
          toast({
            title: "Couldn't send a password reset link",
            description: "An unknown error occured in the process of sending you a reset link.",
            variant: 'left-accent',
            isClosable: true,
            status: 'error',
            duration: 5000,
            position: 'top',
          });
        }
      }
    }
    setLoading(false);
  }

  return (
    <Flex gap='3' direction='column'>
      <FormControl isRequired isInvalid={isEmailError.error}>
        <FormLabel color='blue.800' aria-required>Your email address:</FormLabel>
        <Input type='email' color='blue.800' value={passwordResetForm.email} onChange={handleEmailChange} />
        {
          isEmailError.error && <FormErrorMessage>{ isEmailError.message }</FormErrorMessage>
        }
        <FormHelperText color='blue.800'>
          Enter your email address and we'll send you a link to reset your password.
        </FormHelperText>
      </FormControl>
      {
        loading ?
        <Button colorScheme='blue' isDisabled><ButtonSpinner /></Button>
        :
        <Button colorScheme='blue' onClick={handleSendPasswordResetRequest}>Send a password reset email</Button>
      }
    </Flex>
  );
}