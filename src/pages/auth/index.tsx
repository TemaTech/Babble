import { Flex, Grid, Heading } from "@chakra-ui/layout";
import { useState } from "react";
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { FullLogoIcon } from "../../icons/FullLogoIcon";
import { Button } from "@chakra-ui/button";
import { useMediaQuery } from "@chakra-ui/media-query";
import { RequestPasswordReset } from './components/RequestPasswordReset'
import { useAtom } from "jotai";
import { requestPasswordResetFormData, signInFormData, signUpFormData } from "../../store";

export const Auth = () => {
  const [mode, setMode] = useState<"signIn" | "signUp" | "requestPasswordReset">("signIn");
  const [lgBreakpoint] = useMediaQuery("(min-width: 62em)");

  const [signInForm, setSignInForm] = useAtom(signInFormData);
  const [signUpForm, setSignUpForm] = useAtom(signUpFormData);
  const [passwordResetForm, setPasswordResetForm] = useAtom(requestPasswordResetFormData);

  const resetSignInForm = () => {
    setSignInForm({
      email: '',
      password: '',
    });
  }

  const resetSignUpForm = () => {
    setSignUpForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  }

  const resetPasswordResetForm = () => {
    setPasswordResetForm({
      email: '',
    });
  }

  return (
    <Grid h='100vh' w='100vw' gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr' }} placeItems='center'>
      <Flex direction='column' gap='5' w='70%'>
        {
          !lgBreakpoint && <Heading color='blue.900' fontFamily='logotype'>Babble</Heading>
        }
        {
          mode === 'signIn' ?
          <Heading fontWeight='bold' color='blue.900'>Sign In</Heading>
          : mode === 'signUp' ?
          <Heading fontWeight='bold' color='blue.900'>Sign Up</Heading>
          :
          <Heading fontWeight='bold' color='blue.900'>Password reset</Heading>
        }
        {
          mode === 'signIn' ?
          <SignIn />
          : mode === 'signUp' ?
          <SignUp />
          :
          <RequestPasswordReset />
        }
        {
          mode === 'signIn' ?
          <Flex gap='2' direction='column'>
            <Button variant='link' colorScheme='blue' onClick={() => {
              setMode("signUp");
              resetSignInForm();
            }}>Don't have an account yet?</Button>
            <Button variant='link' colorScheme='blue' onClick={() => {
              setMode("requestPasswordReset");
              resetSignInForm();
            }}>Forgot your password?</Button>
          </Flex>
          : mode === 'signUp' ?
          <Flex gap='2' direction='column'>
            <Button variant='link' colorScheme='blue' onClick={() => {
              setMode("signIn");
              resetSignUpForm();
            }}>Already have an account?</Button>
          </Flex>
          :
          <Flex gap='2' direction='column'>
            <Button variant='link' colorScheme='blue' onClick={() => {
              setMode("signUp");
              resetPasswordResetForm();
            }}>Don't have an account yet?</Button>
          </Flex>
        }
      </Flex>
      {
        lgBreakpoint && <FullLogoIcon boxSize='sm'/>
      }
    </Grid>
  );
}