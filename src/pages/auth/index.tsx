import { Flex, Grid, Heading, Spacer } from "@chakra-ui/layout";
import { useState } from "react";
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { Image } from "@chakra-ui/image";
import { SmallLogoIcon } from "../../icons/SmallLogoIcon";
import { FullLogoIcon } from "../../icons/FullLogoIcon";
import { Button } from "@chakra-ui/button";
import { useMediaQuery } from "@chakra-ui/media-query";

export const Auth = () => {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [lgBreakpoint] = useMediaQuery("(min-width: 62em)")

  return (
    <Grid h='100vh' w='100vw' gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr' }} placeItems='center'>
      <Flex direction='column' gap='5' w='70%'>
        {
          !lgBreakpoint && <Heading color='blue.900' fontFamily='logotype'>Babble</Heading>
        }
        {
          mode === 'signIn' ?
          <Heading fontWeight='bold' color='blue.900'>Sign In</Heading>
          :
          <Heading fontWeight='bold' color='blue.900'>Sign Up</Heading>
        }
        {
          mode === 'signIn' ?
          <SignIn />
          :
          <SignUp />
        }
        {
          mode === 'signIn' ?
          <Flex gap='2' direction='column'>
            <Button variant='link' colorScheme='blue' onClick={() => setMode("signUp")}>Don't have an account yet?</Button>
            <Button variant='link' colorScheme='blue'>Forgot password?</Button>
          </Flex>
          :
          <Flex gap='2' direction='column'>
            <Button variant='link' colorScheme='blue' onClick={() => setMode("signIn")}>Already have an account?</Button>
          </Flex>
        }
      </Flex>
      {
        lgBreakpoint && <FullLogoIcon boxSize='sm'/>
      }
    </Grid>
  );
}