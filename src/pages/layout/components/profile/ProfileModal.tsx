import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  MenuItem,
  Button,
  useToast,
  ButtonSpinner,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react-use-disclosure';
import { FaRegUser } from 'react-icons/fa'
import { ProfilePreview } from './ProfilePreview'
import { ProfileDataForm } from './ProfileDataForm'
import { Link } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { authPageMode, profileData } from '../../../../store';
import { doc, updateDoc } from '@firebase/firestore';
import { auth, db } from '../../../../firebase/config';
import { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const ProfileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setAuthMode = useSetAtom(authPageMode);
  const profile = useAtomValue(profileData);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (profile.name && auth.currentUser) {
      setLoading(true);
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);

        if (profile.avatar) {
          const storage = getStorage();
          const storageRef = ref(storage, `users/${auth.currentUser.uid}`);
          await uploadBytes(storageRef, profile.avatar);

          const avatarDownloadUrl = await getDownloadURL(storageRef);

          await updateDoc(docRef, {
            name: profile.name,
            avatar: avatarDownloadUrl,
          });
        } else {
          await updateDoc(docRef, {
            name: profile.name,
          });
        }

        toast({
          title: "Changes have been saved",
          description: "Your changes have been successfully saved.",
          variant: 'left-accent',
          isClosable: true,
          status: 'success',
          duration: 5000,
          position: 'top',
        });
        onClose();
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(false);
  }

  return (
    <>
      <MenuItem icon={<FaRegUser />} onClick={onOpen}>Profile</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' flexDirection='column' gap='4' p='4'>
            <ProfilePreview />
            <ProfileDataForm />
            <Link to="/auth" onClick={() => setAuthMode("requestPasswordReset")}>
              <Button variant='link' colorScheme='blue'>Reset your password</Button>
            </Link>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>Close</Button>
            {
              loading ?
              <Button colorScheme='blue' isDisabled><ButtonSpinner /></Button>
              :
              <Button colorScheme='blue' onClick={handleSave}>Save changes</Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}