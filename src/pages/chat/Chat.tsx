import { Flex } from "@chakra-ui/layout";
import { Navbar } from "./navbar/Navbar";
import { MessageInput } from "./messageInput/MessageInput";

export const Chat = () => {
  return (
    <Flex w='100%' h='100vh' p='4' bg='gray.100' position='relative' direction='column'>
      <Navbar />
      <MessageInput />
    </Flex>
  )
}
