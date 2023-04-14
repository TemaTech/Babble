import { Flex, Text, Icon } from '@chakra-ui/react'
import { BsChatDots } from 'react-icons/bs';

export const NoChats = () => {
  return (
    <Flex align='center' justify='center' gap='4' direction='column'>
      <Icon as={BsChatDots} fontSize='6xl' color='gray.300' />
      <Text color='gray.400'>There aren't any chats yet...</Text>
    </Flex>
  );
}