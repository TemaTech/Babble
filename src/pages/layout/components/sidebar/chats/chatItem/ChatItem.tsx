import { Avatar } from "@chakra-ui/avatar";
import { Flex, Heading, Spacer, Text } from "@chakra-ui/layout";

export const ChatItem = () => {
  return (
    <Flex w='100%' gap='4' bg='gray.100' p='4' align='center' borderRadius='5' boxShadow='sm' sx={{ '_hover': { backgroundColor: 'gray.200', cursor: 'pointer' }, 'transition': 'all 150ms ease-in-out' }}>
      <Avatar boxShadow='md' />
      <Flex direction='column' w='100%'>
        <Heading fontSize='sm'>Hello world</Heading>
        <Flex align='flex-start' w='100%' gap='2'>
          <Text color='gray.600' noOfLines={[1, 2]}>Hello world, this is me Elon Musk</Text>
          <Spacer />
          <Text color='gray.600'>Fri</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}