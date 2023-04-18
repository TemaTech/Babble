import { Flex } from "@chakra-ui/layout";
import { Navbar } from "./navbar/Navbar";

export const Chat = () => {
  return (
    <Flex w='100%' h='100%' bg='gray.100' p='4' backdropFilter='auto' backdropBlur='15px' position='relative'>
      <Navbar />
    </Flex>
  )
}
