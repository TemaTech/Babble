import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { FaUserFriends, FaUsers } from 'react-icons/fa'

export const NewChatMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant='outline'
        aria-label="New Chat"
        icon={<AddIcon />}
      />
      <MenuList>
        <MenuItem icon={<FaUserFriends />}>New Private Chat</MenuItem>
        <MenuItem icon={<FaUsers />}>New Group Chat</MenuItem>
      </MenuList>
    </Menu>
  );
}