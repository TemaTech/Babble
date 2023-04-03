import { DropdownMenu } from './DropdownMenu'
import { Flex } from "@chakra-ui/layout";
import { SearchBar } from './SearchBar';

export const Navbar = () => {
  return (
    <Flex p='4' gap='4' position='fixed'>
      <DropdownMenu />
      <SearchBar />
    </Flex>
  );
}