import { MdOutlineExitToApp } from 'react-icons/md'
import {
  Text,
  MenuItem,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ButtonSpinner,
} from '@chakra-ui/react'
import { deleteDoc, doc, getDoc, updateDoc } from "@firebase/firestore";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { auth, db } from "../../../firebase/config";

export const LeaveGroupModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chatId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLeave = async () => {
    if (chatId && auth.currentUser) {
      setIsLoading(true);
      const chatDocRef = doc(db, "chats", chatId);
      try {
        const chatDocSnap = await getDoc(chatDocRef);
        if (chatDocSnap.exists()) {
          const chatMembers = chatDocSnap.data().members;
          const updatedChatMembers = chatMembers.filter((member: string) => member !== auth.currentUser?.uid);
          if (updatedChatMembers.length > 0) {
            await updateDoc(chatDocRef, {
              members: updatedChatMembers,
            });
          } else {
            await deleteDoc(chatDocRef);
          }
        }
        onClose();
        navigate("/");
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
  }

  return (
    <>
      <MenuItem display='flex' gap='2' onClick={onOpen}>
        <Icon as={MdOutlineExitToApp} color='red.400' />
        <Text color='red.400'>Leave the group</Text>
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leave the group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure that you want to leave this group?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr='3' onClick={onClose}>Cancel</Button>
            {
              isLoading ?
              <Button variant='ghost' colorScheme='red' isDisabled><ButtonSpinner /></Button>
              :
              <Button variant='ghost' colorScheme='red' onClick={handleLeave}>Leave this group</Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
