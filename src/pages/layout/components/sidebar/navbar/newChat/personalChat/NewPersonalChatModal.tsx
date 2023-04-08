import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react-use-disclosure'
import { MenuItem } from "@chakra-ui/menu";
import { FiUser } from 'react-icons/fi'
import React, { useEffect } from 'react';
import { ChatIcon } from '@chakra-ui/icons';
import { PersonalChatInfoPopover } from './PersonalChatInfoPopover';
import { useAtom } from 'jotai'
import { newChat } from '../../../../../../../store'
import { SearchUsers } from '../SearchUsers';

export const NewPersonalChatModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newChatData, setNewChatData] = useAtom(newChat);
  useEffect(() => {
    if (isOpen) {
      setNewChatData((prev) => ({
        ...prev, type: "personal"
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
      <MenuItem icon={<FiUser />} onClick={onOpen}>New Personal Chat</MenuItem>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex direction='row' gap='2' align='center'>
              Create a new personal chat
              <PersonalChatInfoPopover />
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