import { useAtom } from 'jotai'
import { useState } from 'react';
import { newPasswordFormData } from '../../../store'
import { useToast } from "@chakra-ui/toast"
import { Flex } from '@chakra-ui/layout';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button, ButtonSpinner } from '@chakra-ui/button';
import { confirmPasswordReset } from '@firebase/auth';
import { auth } from '../../../firebase/config';
import { useLocation, useNavigate } from 'react-router';

const useQuery = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

export const ResetPasswordForm = () => {
  const [newPasswordForm, setNewPasswordForm] = useAtom(newPasswordFormData);
  const [isNewPasswordError, setIsNewPasswordError] = useState({
    error: false,
    message: '',
  });
  const [isConfirmNewPasswordError, setIsConfirmNewPasswordError] = useState({
    error: false,
    message: '',
  });
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const navigate = useNavigate();

  const isValidPassword = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isTwelveCharactersLong = password.length >= 12;
    return hasUppercase && hasLowercase && hasNumber && isTwelveCharactersLong;
  }

  const passwordErrorCheck = (password: string) => {
    if (password === '') {
      setIsNewPasswordError({
        error: true,
        message: 'This field is required.',
      });
    } else if (!isValidPassword(password)) {
      setIsNewPasswordError({
        error: true,
        message: 'Password must be at least 12 characters long and contain at least one uppercase letter, one lowercase letter, and one number.',
      });
    } else {
      setIsNewPasswordError({
        error: false,
        message: '',
      });
    }
  }

  const confirmPasswordErrorCheck = (confirmPassword: string) => {
    if (confirmPassword === '') {
      setIsConfirmNewPasswordError({
        error: true,
        message: 'This field is required.',
      });
    } else if (confirmPassword !== newPasswordForm.password) {
      setIsConfirmNewPasswordError({
        error: true,
        message: 'Passwords do not match.'
      });
    } else {
      setIsConfirmNewPasswordError({
        error: false,
        message: '',
      });
    }
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPasswordForm((prev) => ({ ...prev, password: event.target.value }));
    passwordErrorCheck(event.target.value);
  }
  
  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPasswordForm((prev) => ({ ...prev, confirmPassword: event.target.value }));
    confirmPasswordErrorCheck(event.target.value);
  }

  const validateAllFields = () => {
    passwordErrorCheck(newPasswordForm.password);
    confirmPasswordErrorCheck(newPasswordForm.confirmPassword);
  }

  const handlePasswordReset = async () => {
    validateAllFields();
    if (!isNewPasswordError.error && !isConfirmNewPasswordError.error) {
      setLoading(true);
      try {
        const oobCode = query.get('oobCode');
        if (oobCode) {
          await confirmPasswordReset(auth, oobCode, newPasswordForm.password);

          toast({
            title: "Your password has been reset",
            description: "Your password has been successfully reset.",
            variant: 'left-accent',
            isClosable: true,
            status: 'success',
            duration: 5000,
            position: 'top',
          });
          
          navigate("/auth");
        }
      } catch (err: any) {
        toast({
          title: "Your password has not been reset",
          description: "An unknown error occured while we were resetting your password.",
          variant: 'left-accent',
          isClosable: true,
          status: 'error',
          duration: 5000,
          position: 'top',
        });
        console.error("Error while resetting the password: ", err);
      }
    }
    setLoading(false);
  }

  return (
    <Flex gap='3' direction='column'>
      <FormControl isRequired isInvalid={isNewPasswordError.error}>
        <FormLabel color='blue.800' aria-required>Your new password:</FormLabel>
        <Input color='blue.800' type='password' value={newPasswordForm.password} onChange={handlePasswordChange} />
        {
          isNewPasswordError.error && <FormErrorMessage>{ isNewPasswordError.message }</FormErrorMessage>
        }
      </FormControl>
      <FormControl isRequired isInvalid={isConfirmNewPasswordError.error}>
        <FormLabel color='blue.800' aria-required>Confirm your new password:</FormLabel>
        <Input color='blue.800' type='password' value={newPasswordForm.confirmPassword} onChange={handleConfirmPasswordChange} />
        {
          isNewPasswordError.error && <FormErrorMessage>{ isNewPasswordError.message }</FormErrorMessage>
        }
      </FormControl>
      {
        loading ?
        <Button colorScheme='blue' isDisabled><ButtonSpinner /></Button>
        :
        <Button colorScheme='blue' onClick={handlePasswordReset}>Reset</Button>
      }
    </Flex>
  );
}