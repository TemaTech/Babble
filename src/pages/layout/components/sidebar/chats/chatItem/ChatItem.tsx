import { Avatar } from "@chakra-ui/avatar";
import { Divider, Flex, Text } from "@chakra-ui/layout";


interface ChatLastMessage {
  text: string | null;
  sentBy: string | null;
  sentAt: string | null;
}

interface Props {
  title: string | null;
  lastMessage: ChatLastMessage;
  avatar: string | null;
  id: string;
  type: "personal" | "group" | null;
}

export const ChatItem = ({ id, title, avatar, lastMessage, type }: Props) => {
  return (
    <Flex gap='3' p='3' cursor='pointer' borderRadius='xl' align='center' _hover={{ background: 'gray.100' }} >
      <Avatar src={avatar ? avatar : undefined} size='md' boxShadow='xl' />
      <Flex direction='column' gap='1' w='100%'>
        <Flex justify='space-between' gap='3'>
          <Text color='gray.700' fontWeight='bold'>{ title }</Text>
          {
            lastMessage.sentAt &&
            <Text textAlign='center' color='gray.400'>{ lastMessage.sentAt }</Text>
          }
        </Flex>
        {
          lastMessage.sentBy &&
          <Flex direction='column'>
            {
              type === 'group' &&
              <Text fontSize='sm' color='gray.600' fontWeight='bold'>{ lastMessage.sentBy }</Text>
            }
            <Text fontSize='sm' noOfLines={[1, 2]} maxW='75%' color='gray.500'>{ lastMessage.text }</Text>
          </Flex>
        }
      </Flex>
    </Flex>
  )
}
