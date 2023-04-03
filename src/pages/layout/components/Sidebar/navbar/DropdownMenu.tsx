import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaRegUser } from 'react-icons/fa'
import { InfoOutlineIcon } from "@chakra-ui/icons"
import { MdOutlineExitToApp } from 'react-icons/md'

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
        <MenuItem icon={<FaRegUser />}>Profile</MenuItem>
        <MenuItem icon={<InfoOutlineIcon />}>Info</MenuItem>
        <MenuItem icon={<MdOutlineExitToApp />}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
}