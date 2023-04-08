import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Button,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react-use-disclosure'
import { MenuItem } from "@chakra-ui/menu";
import { FiUsers } from 'react-icons/fi'
import React, { useEffect } from 'react';
import { GroupChatInfoPopover } from './GroupChatInfoPopover';
import { useAtom } from 'jotai'
import { newChat } from '../../../../../../../store'
import { ChatIcon } from '@chakra-ui/icons';
import { SearchUsers } from '../SearchUsers';

export const NewGroupChatModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newChatData, setNewChatData] = useAtom(newChat);
  useEffect(() => {
    if (isOpen) {
      setNewChatData((prev) => ({
        ...prev, type: "group"
      }));
    }
  }, [isOpen]);

  const closeModal = () => {
    onClose();
    setNewChatData(() => ({
      type: null,
      members: null,
      createdBy: null,
      createdAt: null,
      title: null,
      lastMessageText: null,
      lastMessageSentAt: null,
      avatar: null,
      avatarPreview: null,
    }));
  }
  
  return (
    <>
      <MenuItem icon={<FiUsers />} onClick={onOpen}>New Group Chat</MenuItem>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>
            <Flex direction='row' gap='2' align='center'>
              Create a new group chat
              <GroupChatInfoPopover />
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' flexDirection='column' gap='4'>
            <SearchUsers />
          </ModalBody>

          <ModalFooter>
            <Button mr='3' onClick={closeModal}>Close</Button>
            <Button colorScheme='blue' leftIcon={<ChatIcon />}>Start chatting</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}