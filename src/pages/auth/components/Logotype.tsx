import { Flex, Heading } from "@chakra-ui/layout";
import { LogotypeIcon } from './LogotypeIcon'

export const Logotype = () => {
  return (
    <Flex gap='1' align='center' justify='center'>
      <LogotypeIcon />
      <Heading textShadow='xl' display={{ base: 'none', md: 'inline' }} color='blue.400' fontSize={{ md: '6xl', lg: '7xl' }} fontFamily='logotype'>Babble</Heading>
    </Flex>
  );
}