import { Flex } from "@chakra-ui/layout"
import { useMediaQuery } from "@chakra-ui/media-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { auth, db } from "../../../firebase/config";
import { ChatGeneralData } from './ChatGeneralData'

export const Navbar = () => {
  const [lgBreakpoint] = useMediaQuery("(min-width: 62em)");

  return (
    <Flex position='sticky' p='2' gap='2' bg='whiteAlpha.600' h='fit-content' borderRadius='2xl' w='100%' boxShadow='sm'>
      <ChatGeneralData />
    </Flex>
  )
}
