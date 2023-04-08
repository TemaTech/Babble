import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  MenuItem,
  Text,
  Highlight,
  Link,
} from '@chakra-ui/react'
import { InfoOutlineIcon } from "@chakra-ui/icons"

export const InfoModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MenuItem icon={<InfoOutlineIcon />} onClick={onOpen}>Info</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Information about Babble</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text lineHeight='tall'>
                "Babble" is a chatting app, but also, it is intended to be a project that showcases the skills I've acquired during 
                the JavaScript Course of The Odin Project's curriculum. It was a quite interesting 
                experience building this kind of application where the user could register or log in, 
                set up his profile name and picture, create a private chat, create a group chat and 
                send a message. So, as this project is considered more as a portfolio project, here 
                are the technologies I've used in this app: React, TypeScript, ChakraUI, React-Router, Jotai and Firebase.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Link textDecoration='underline' color='blue.500' href="https://twitter.com/cherrartem" isExternal mr='3'>My Twitter</Link> 
            <Link textDecoration='underline' color='blue.500' href="https://github.com/TemaTech" isExternal>My GitHub</Link> 
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}