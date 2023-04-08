import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import React from 'react'
import { NewPersonalChatModal } from './newChat/personalChat/NewPersonalChatModal'
import { NewGroupChatModal } from "./newChat/groupChat/NewGroupChatModal";

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
        <NewPersonalChatModal />
        <NewGroupChatModal />
      </MenuList>
    </Menu>
  );
}