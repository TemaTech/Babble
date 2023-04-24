import { Flex } from "@chakra-ui/layout";
import { Navbar } from "./navbar/Navbar";
import { MessageInput } from "./messageInput/MessageInput";
import { MessagesList } from './messages/MessagesList'

export const Chat = () => {
  return (
    <Flex w='100%' h='100vh' bg='gray.100' position='relative' direction='column'>
      <Navbar />
      <MessagesList />
      <MessageInput />
    </Flex>
  )
}
