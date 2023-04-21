import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  Flex,
  Text,
  MenuItem,
  MenuDivider,
  Icon,
} from '@chakra-ui/react'
import { HamburgerIcon, DeleteIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react';
import { doc, getDoc } from '@firebase/firestore';
import { auth, db } from '../../../firebase/config';
import { MdOutlineExitToApp } from 'react-icons/md'

export const ChatMenu = () => {
  const { chatId } = useParams();
  const [createdById, setCreatedById] = useState("");
  const [chatType, setChatType] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  useEffect(() => {
    const getChatData = async () => {
      if (chatId) {
        const chatDocRef = doc(db, "chats", chatId);
        const chatDocSnap = await getDoc(chatDocRef);
        if (chatDocSnap.exists()) {
          setCreatedById(chatDocSnap.data().createdBy);
          setChatType(chatDocSnap.data().type);
          const createdByDocRef = doc(db, "users", chatDocSnap.data().createdBy);
          const createdByDocSnap = await getDoc(createdByDocRef);
          if (createdByDocSnap.exists()) {
            setCreatedBy(createdByDocSnap.data().name);
          }
          setCreatedAt(new Date(chatDocSnap.data().createdAt).toLocaleDateString());
        }
      }
    }
    getChatData();
  }, [chatId]);

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<HamburgerIcon />} color='gray.700' aria-label="Chat menu" variant='ghost' borderRadius='xl' />
      <MenuList>
        {
          chatType === "personal" ?
          <MenuItem display='flex' gap='2'>
            <Icon as={MdOutlineExitToApp} color='red.400' />
            <Text color='red.400'>Leave the chat</Text>
          </MenuItem>
          : chatType === "group" &&
          <MenuItem display='flex' gap='2'>
            <Icon as={MdOutlineExitToApp} color='red.400' />
            <Text color='red.400'>Leave the group</Text>
          </MenuItem>
        }
        {
          chatType === "group" && createdById === auth.currentUser?.uid &&
          <MenuItem display='flex' gap='2'>
            <Icon as={DeleteIcon} color='red.400' />
            <Text color='red.400'>Delete the group</Text>
          </MenuItem>
        }
        <MenuDivider />
        <Flex direction='column' gap='2' p='2'>
          <Text color='gray.400'>Created by: { createdBy }</Text>
          <Text color='gray.400'>Created at: { createdAt }</Text>
        </Flex>
      </MenuList>
    </Menu>
  )
}
