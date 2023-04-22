import { Flex } from "@chakra-ui/layout";
import { Navbar } from "./navbar/Navbar";

export const Chat = () => {
  return (
    <Flex w='100%' h='100vh' bg='gray.100' p='4' position='relative' direction='column'>
      <Navbar />
      
    </Flex>
  )
}
