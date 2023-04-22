import React, { useState } from 'react'
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
import { DeleteIcon } from "@chakra-ui/icons"
import { useNavigate, useParams } from 'react-router';
import { deleteDoc, doc } from '@firebase/firestore';
import { db } from '../../../firebase/config';

export const DeleteChatModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chatId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (chatId) {
      setIsLoading(true);
      const chatDocRef = doc(db, "chats", chatId);
      try {
        await deleteDoc(chatDocRef);
        onClose();
        navigate("/")
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
  }

  return (
    <>
      <MenuItem display='flex' gap='2' onClick={onOpen}>
        <Icon as={DeleteIcon} color='red.400' />
        <Text color='red.400'>Delete the chat</Text>
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete the chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure that you want to delete this chat?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr='3' onClick={onClose}>Cancel</Button>
            {
              isLoading ?
              <Button variant='ghost' colorScheme='red' isDisabled><ButtonSpinner /></Button>
              :
              <Button variant='ghost' colorScheme='red' onClick={handleDelete}>Delete this chat</Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
