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
  ButtonSpinner,
  useToast,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react-use-disclosure'
import { MenuItem } from "@chakra-ui/menu";
import { FiUser } from 'react-icons/fi'
import React, { useEffect, useState } from 'react';
import { ChatIcon } from '@chakra-ui/icons';
import { PersonalChatInfoPopover } from './PersonalChatInfoPopover';
import { useAtom } from 'jotai'
import { newChat } from '../../../../../../../store'
import { SearchUsers } from '../SearchUsers';
import { PersonalChatPreviewMembers } from './PersonalChatPreviewMembers';
import { addDoc, collection, doc, getDoc, updateDoc } from '@firebase/firestore';
import { auth, db } from '../../../../../../../firebase/config';

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
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    onClose();
    setNewChatData(() => ({
      type: "personal",
      members: [],
      createdBy: "",
      createdAt: "",
      title: "",
      lastMessage: {
        text: "",
        sentAt: "",
        sentBy: "",
      },
      avatar: "",
    }));
  }

  const toast = useToast();

  const handleStartChatting = async () => {
    if (newChatData.members && newChatData.members[1] && auth.currentUser) {
      setLoading(true);
      try {
        const chatDocRef = await addDoc(collection(db, "chats"), {
          ...newChatData,
          createdAt: new Date().toISOString(),
          createdBy: auth.currentUser.uid,
        });
        await updateDoc(chatDocRef, { id: chatDocRef.id });

        for (const member in newChatData.members) {
          const memberDocRef = doc(db, "users", member);
          const memberDocSnap = await getDoc(memberDocRef);
          if (memberDocSnap.exists()) {
            const newChatsArray = memberDocSnap.data().chats || [];
            newChatsArray.push(chatDocRef.id);

            await updateDoc(memberDocRef, {
              chats: newChatsArray,
            });
          }
        }

        const userDocRef = doc(db, "users", newChatData.members[1]);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          toast({
            title: "New chat has been created",
            description: `Your chat with ${userDocSnap.data().name} has been successfully created.`,
            variant: 'left-accent',
            isClosable: true,
            status: 'success',
            duration: 5000,
            position: 'top',
          });
        }
        closeModal();
      } catch(err) {
        console.error("Error in 'handleStartChatting', NewPersonalChatModal.tsx: ", err);
      }
      setLoading(false);
    }
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
            {
              newChatData.members && newChatData.members[0] && newChatData.members[1] &&
              <PersonalChatPreviewMembers />
            }
          </ModalBody>

          <ModalFooter>
            <Button mr='3' onClick={closeModal}>Close</Button>
            {
              loading ?
              <Button colorScheme='blue' isDisabled><ButtonSpinner /></Button>
              :
              <Button colorScheme='blue' leftIcon={<ChatIcon />} onClick={handleStartChatting}>Start chatting</Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}