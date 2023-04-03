import { Button, ButtonSpinner } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { useAtom } from "jotai";
import { useState } from "react";
import { auth, db } from "../../../firebase/config";
import { signUpFormData } from "../../../store";

export const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const [signUpForm, setSignUpForm] = useAtom(signUpFormData);
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState({
    error: false,
    message: '',
  });
  const [isPasswordError, setIsPasswordError] = useState({
    error: false,
    message: '',
  });
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState({
    error: false,
    message: '',
  });

  const nameErrorCheck = (name: string) => {
    setIsNameError(name === '');
    return name === '';
  }

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

  const passwordErrorCheck = (password: string) => {
    if (password === '') {
      setIsPasswordError({
        error: true,
        message: 'This field is required.',
      });
    } else if (!isValidPassword(password)) {
      setIsPasswordError({
        error: true,
        message: 'Password must be at least 12 characters long and contain at least one uppercase letter, one lowercase letter, and one number.',
      });
    } else {
      setIsPasswordError({
        error: false,
        message: '',
      });
    }
  }

  const confirmPasswordErrorCheck = (confirmPassword: string) => {
    if (confirmPassword === '') {
      setIsConfirmPasswordError({
        error: true,
        message: 'This field is required.',
      });
    } else if (confirmPassword !== signUpForm.password) {
      setIsConfirmPasswordError({
        error: true,
        message: 'Passwords do not match.'
      });
    } else {
      setIsConfirmPasswordError({
        error: false,
        message: '',
      });
    }
  }

  const isValidPassword = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isTwelveCharactersLong = password.length >= 12;
    return hasUppercase && hasLowercase && hasNumber && isTwelveCharactersLong;
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({ ...prev, name: event.target.value }));
    nameErrorCheck(event.target.value);
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({ ...prev, email: event.target.value }));
    emailErrorCheck(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({ ...prev, password: event.target.value }));
    passwordErrorCheck(event.target.value);
  }
  
  const handleConfirmPassworddChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({ ...prev, confirmPassword: event.target.value }));
    confirmPasswordErrorCheck(event.target.value);
  }

  const validateAllFields = () => {
    nameErrorCheck(signUpForm.name);
    emailErrorCheck(signUpForm.email);
    passwordErrorCheck(signUpForm.password);
    confirmPasswordErrorCheck(signUpForm.confirmPassword);
  }
  
  const handleSignUp = async () => {
    validateAllFields();
    if (!isNameError && !isEmailError.error && !isPasswordError.error && !isConfirmPasswordError.error) {
      try {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, signUpForm.email, signUpForm.password);

        if (auth.currentUser) {
          await setDoc(doc(db, "users", auth.currentUser.uid), {
            name: signUpForm.name,
            email: signUpForm.email,
            chats: [],
            uid: auth.currentUser.uid,
            avatar: null,
            lastTimeSeen: null,
            isOnline: false,
          });
        }

        toast({
          title: 'Account created.',
          description: "We have successfully created a new account for you.",
          variant: 'left-accent',
          isClosable: true,
          status: 'success',
          duration: 5000,
          position: 'top',
        });
      } catch (err: any) {
        if (err.code === 'auth/email-already-in-use') {
          setIsEmailError({
            error: true,
            message: "An account with this email address already exists."
          });
        } else if (err.code === 'auth/invalid-email') {
          setIsEmailError({
            error: true,
            message: "This email is invalid.",
          });
        } else {
          console.error("Error while creating a new account: ", err);

          toast({
            title: "Account has not been created.",
            description: "An unknown error occured while we were creating an account for you.",
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
      <FormControl isRequired isInvalid={isNameError}>
        <FormLabel color='blue.800' aria-required>Your name:</FormLabel>
        <Input color='blue.800' type='text' value={signUpForm.name} onChange={handleNameChange} />
        {
          isNameError && <FormErrorMessage>This field is required.</FormErrorMessage>
        }
      </FormControl>
      <FormControl isRequired isInvalid={isEmailError.error}>
        <FormLabel color='blue.800' aria-required>Your email address:</FormLabel>
        <Input color='blue.800' type='email' value={signUpForm.email} onChange={handleEmailChange} />
        {
          isEmailError.error && <FormErrorMessage>{ isEmailError.message }</FormErrorMessage>
        }
      </FormControl>
      <FormControl isRequired isInvalid={isPasswordError.error}>
        <FormLabel color='blue.800' aria-required>Password:</FormLabel>
        <Input color='blue.800' type='password' value={signUpForm.password} onChange={handlePasswordChange} />
        {
          isPasswordError.error && <FormErrorMessage>{ isPasswordError.message }</FormErrorMessage>
        }
      </FormControl>
      <FormControl isRequired isInvalid={isConfirmPasswordError.error}>
        <FormLabel color='blue.800' aria-required>Confirm the password:</FormLabel>
        <Input color='blue.800' type='password' value={signUpForm.confirmPassword} onChange={handleConfirmPassworddChange} />
        {
          isConfirmPasswordError.error && <FormErrorMessage>{ isConfirmPasswordError.message }</FormErrorMessage>
        }
      </FormControl>
      {
        loading ?
        <Button colorScheme='blue' isDisabled><ButtonSpinner /></Button>
        :
        <Button colorScheme='blue' onClick={handleSignUp}>Sign Up</Button>
      }
    </Flex>
  );
}