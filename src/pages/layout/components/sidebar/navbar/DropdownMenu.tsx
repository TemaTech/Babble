import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Button, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { MdOutlineExitToApp } from 'react-icons/md'
import { ProfileModal } from '../../profile/ProfileModal'
import { signOut } from "@firebase/auth";
import { auth } from "../../../../../firebase/config";
import { InfoModal } from '../../info/InfoModal'

export const DropdownMenu = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error while signing out: ", err);
    }
  }

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
        <InfoModal />
        <MenuItem icon={<MdOutlineExitToApp />} onClick={handleSignOut}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
}