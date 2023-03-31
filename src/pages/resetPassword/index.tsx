import { Button } from "@chakra-ui/button";
import { Flex, Grid, Heading } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Link } from "react-router-dom";
import { FullLogoIcon } from "../../icons/FullLogoIcon";
import { ResetPasswordForm } from './components/ResetPasswordForm'

export const ResetPassword = () => {
  const [lgBreakpoint] = useMediaQuery("(min-width: 62em)");

  return (
    <Grid h='100vh' w='100vw' gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr' }} placeItems='center'>
      <Flex direction='column' gap='5' w='70%'>
        {
          !lgBreakpoint && <Heading color='blue.900' fontFamily='logotype'>Babble</Heading>
        }
        <Heading fontWeight='bold' color='blue.900'>Reset your password</Heading>
        <ResetPasswordForm />
        <Flex gap='2' direction='column'>
          <Link to="/auth" style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='link' colorScheme='blue'>Already have an account?</Button>
          </Link>
        </Flex>
      </Flex>
      {
        lgBreakpoint && <FullLogoIcon boxSize='sm'/>
      }
    </Grid>
  );
}