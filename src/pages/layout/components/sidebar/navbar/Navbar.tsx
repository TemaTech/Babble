import { DropdownMenu } from './DropdownMenu'
import { Flex } from "@chakra-ui/layout";
import { SearchBar } from './SearchBar';
import { NewChatMenu } from './NewChatMenu'

export const Navbar = () => {
  return (
    <Flex bg='gray.50' p='4' gap='4' position='sticky' top='0' zIndex='1' boxShadow='sm'>
      <DropdownMenu />
      <SearchBar />
      <NewChatMenu />
    </Flex>
  );
}