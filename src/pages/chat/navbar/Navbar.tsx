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
    <Flex align='center' position='sticky' p='2' gap='2' bg='whiteAlpha.600' h='fit-content' borderRadius='2xl' w='100%' boxShadow='sm'>
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
