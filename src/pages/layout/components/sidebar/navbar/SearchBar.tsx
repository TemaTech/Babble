import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Search2Icon } from "@chakra-ui/icons";
import { useAtom } from "jotai";
import { chatListSearchQuery } from "../../../../../store";

export const SearchBar = () => {
  const [input, setInput] = useAtom(chatListSearchQuery);

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents='none'
        children={<Search2Icon color='gray.300' />}
      />
      <Input placeholder="Search chats" value={input ? input : undefined} onChange={(e) => setInput(e.target.value)}  />
    </InputGroup>
  );
}