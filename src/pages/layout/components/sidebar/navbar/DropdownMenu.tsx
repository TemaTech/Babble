import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Button, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { InfoOutlineIcon } from "@chakra-ui/icons"
import { MdOutlineExitToApp } from 'react-icons/md'
import { ProfileModal } from '../../profile/ProfileModal'

export const DropdownMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Menu'
        icon={<HamburgerIcon />}
        variant='outline'
      />
      <MenuList>
        <ProfileModal />
        <MenuItem icon={<InfoOutlineIcon />}>Info</MenuItem>
        <MenuItem icon={<MdOutlineExitToApp />}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
}