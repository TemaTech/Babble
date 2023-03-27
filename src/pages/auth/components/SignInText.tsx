import { Flex, Text } from "@chakra-ui/layout";
import { BiLockOpen } from 'react-icons/bi'
import { Icon } from "@chakra-ui/icon";

export const SignInText = () => {
  return (
    <Flex gap='1' align='center' justify='center'>
      <Icon as={BiLockOpen} fontSize='2xl' />
      <Text textAlign='center' fontSize='2xl' fontWeight='bold' color='blue.900'>Sign In</Text>
    </Flex>
  );
}