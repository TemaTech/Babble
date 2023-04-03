import { Flex, VStack } from "@chakra-ui/layout";
import { ChatItem } from './chatItem/ChatItem'

export const ChatList = () => {
  return (
    <Flex p='4' gap='4' direction='column' overflowY='auto' sx={{ '&::-webkit-scrollbar': { width: '4px', borderRadius: '10px', backgroundColor: 'gray.200' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'gray.300' } }}>
      
    </Flex>
  );
}