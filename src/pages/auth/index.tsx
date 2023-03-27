import { Container, Flex, Text } from "@chakra-ui/layout";
import { Logotype } from './components/Logotype'
import { SignInWithGoogleButton } from './components/SignInWithGoogleButton'
import { SignInText } from './components/SignInText'

export const Auth = () => {
  return (
    <Container maxW='4xl' h='90vh' p='5' display='flex' justifyContent='center' alignItems='center'>
      <Flex direction="column" gap='5' align='center' justify='center'>
        <Logotype />
        <Flex direction='column' gap='5' w={{ base: 'xs', md: 'md', lg: 'lg' }} p='5' bg='blue.100' borderRadius='10' boxShadow='xl' >
          <SignInText />
          <Text textAlign='center' fontSize='xl' fontWeight='bold' color='blue.800'>It seems like you're not signed in. Why not do it now and join the party? 🎉</Text>
          <SignInWithGoogleButton />
        </Flex>
      </Flex>
    </Container>
  );
}