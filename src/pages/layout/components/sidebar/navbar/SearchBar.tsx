import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Search2Icon } from "@chakra-ui/icons";

export const SearchBar = () => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents='none'
        children={<Search2Icon color='gray.300' />}
      />
      <Input placeholder="Search chats" />
    </InputGroup>
  );
}