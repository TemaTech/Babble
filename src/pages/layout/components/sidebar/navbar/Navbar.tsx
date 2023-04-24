import { Flex } from "@chakra-ui/layout";
import { DropdownMenu } from "./DropdownMenu";
import { NewChatMenu } from './NewChatMenu'
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  return (
    <Flex bg='gray.50' p='4' gap='4' position='sticky' top='0' zIndex='1' boxShadow='sm'>
      <DropdownMenu />
      <SearchBar />
      <NewChatMenu />
    </Flex>
  );
}