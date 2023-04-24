import { Flex, Spacer } from "@chakra-ui/layout"
import { useMediaQuery } from "@chakra-ui/media-query";
import { ChatMenu } from './ChatMenu'
import { ChatGeneralData } from './ChatGeneralData'
import { IconButton } from "@chakra-ui/button";
import { ChevronLeftIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router";

export const Navbar = () => {
  const [lgBreakpoint] = useMediaQuery("(min-width: 62em)");
  const navigate = useNavigate();

  return (
    <Flex zIndex='1' align='center' position='absolute' top='4' right='4' left='4' p='2' gap='2' bg='gray.50' h='fit-content' borderRadius='2xl' boxShadow='sm'>
      {
        !lgBreakpoint &&
        <IconButton onClick={() => navigate("/")} icon={<ChevronLeftIcon />} aria-label="Return" fontSize='2xl' borderRadius='xl' colorScheme='blue' variant='ghost' />
      }
      <ChatGeneralData />
      <Spacer />
      <ChatMenu />
    </Flex>
  )
}
