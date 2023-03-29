import { Button, ButtonSpinner } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useAtom } from "jotai";
import { useState } from "react";
import { auth } from "../../../firebase/config";
import { currentUser, signInFormData } from "../../../store";

export const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useAtom(currentUser);
  const toast = useToast();

  const [signInForm, setSignInForm] = useAtom(signInFormData);
  const [isEmailError, setIsEmailError] = useState({
    error: false,
    message: '',
  });
  const [isPasswordError, setIsPasswordError] = useState({
    error: false,
    message: '',
  });

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
        message: "This field is required.",
      });
    } else {
      setIsPasswordError({
        error: false,
        message: "",
      });
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInForm((prev) => ({ ...prev, email: event.target.value }));
    emailErrorCheck(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInForm((prev) => ({ ...prev, password: event.target.value }));
    passwordErrorCheck(event.target.value);
  }

  const validateAllFields = () => {
    emailErrorCheck(signInForm.email);
    passwordErrorCheck(signInForm.password);
  }

  const handleSignIn = async () => {
    setLoading(true);
    validateAllFields();
    if (!isEmailError.error && !isPasswordError.error) {
      try {
        await signInWithEmailAndPassword(auth, signInForm.email, signInForm.password);

        await setUser(auth.currentUser);

        toast({
          title: `Hello, ${user?.email}`,
          description: "You've successfully signed in to your account.",
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
        } else if (err.code === 'auth/wrong-password') {
          setIsPasswordError({
            error: true,
            message: "Wrong password."
          });
        } else if (err.code === 'auth/user-not-found') {
          setIsEmailError({
            error: true,
            message: "The user with this email address doesn't exist."
          });
        } else {
          toast({
            title: "Couldn't sign in.",
            description: "An unknown error occured in the process of signing in to your account.",
            variant: 'left-accent',
            isClosable: true,
            status: 'success',
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
        <FormLabel color='blue.800' aria-required>Email address:</FormLabel>
        <Input color='blue.800' type='email' value={signInForm.email} onChange={handleEmailChange} />
        {
          isEmailError.error && <FormErrorMessage>{ isEmailError.message }</FormErrorMessage>
        }
      </FormControl>
      <FormControl isRequired isInvalid={isPasswordError.error}>
        <FormLabel color='blue.800' aria-required>Password:</FormLabel>
        <Input color='blue.800' type='password' value={signInForm.password} onChange={handlePasswordChange} />
        {
          isPasswordError.error && <FormErrorMessage>{ isPasswordError.message }</FormErrorMessage>
        }
      </FormControl>
      {
        loading ?
        <Button colorScheme='blue' isDisabled><ButtonSpinner /></Button>
        :
        <Button colorScheme='blue' onClick={handleSignIn}>Sign In</Button>
      }
    </Flex>
  );
}