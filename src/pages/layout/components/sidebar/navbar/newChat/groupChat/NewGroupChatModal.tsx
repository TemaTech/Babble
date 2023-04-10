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
  ButtonSpinner,
  useToast,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react-use-disclosure'
import { MenuItem } from "@chakra-ui/menu";
import { FiUsers } from 'react-icons/fi'
import React, { useEffect, useState } from 'react';
import { GroupChatInfoPopover } from './GroupChatInfoPopover';
import { useAtom } from 'jotai'
import { newChat, newGroupChatAvatars } from "../../../../../../../store";
import { ChatIcon } from '@chakra-ui/icons';
import { SearchUsers } from '../SearchUsers';
import { NewGroupChatMembersPreview } from './NewGroupChatMembersPreview';
import { auth, db } from '../../../../../../../firebase/config';
import { addDoc, collection, updateDoc } from '@firebase/firestore';
import { NewGroupChatForm } from './NewGroupChatForm';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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

  const [newGroupChatAvatarsData, setNewGroupsChatAvatarsData] = useAtom(newGroupChatAvatars);

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
    }));

    setNewGroupsChatAvatarsData(() => ({
      avatar: null,
      avatarPreview: null,
    }));
  }

  const [loading, setLoading] = useState(false);
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

        if (newGroupChatAvatarsData.avatar) {
          const storage = getStorage();
          const storageRef = ref(storage, `chats/${chatDocRef.id}`);
          await uploadBytes(storageRef, newGroupChatAvatarsData.avatar);
          const avatarDownloadUrl = await getDownloadURL(storageRef);

          await updateDoc(chatDocRef, { avatar: avatarDownloadUrl });
        }

        toast({
          title: "New chat has been created",
          description: `Your group chat has been successfully created.`,
          variant: 'left-accent',
          isClosable: true,
          status: 'success',
          duration: 5000,
          position: 'top',
        });
        closeModal();
      } catch(err) {
        console.error("Error in 'handleStartChatting', NewGroupChatModal.tsx: ", err);
      }
      setLoading(false);
    }
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
            <NewGroupChatForm />
            <SearchUsers />
            {
              newChatData.members && newChatData.members[1] &&
              <NewGroupChatMembersPreview />
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