import { Avatar } from "@chakra-ui/avatar";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Heading } from "@chakra-ui/layout";
import { useAtom } from "jotai";
import React, { useRef } from "react";
import { newChat, newGroupChatAvatars } from "../../../../../../../store";
import { BiImage } from 'react-icons/bi'
import { Button } from "@chakra-ui/button";

export const NewGroupChatForm = () => {
  const [newChatData, setNewChatData] = useAtom(newChat);
  const [newGroupChatAvatarsData, setNewGroupsChatAvatarsData] = useAtom(newGroupChatAvatars);
  const chatAvatarInputRef = useRef<HTMLInputElement>(null!);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setNewGroupsChatAvatarsData((prev) => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGroupsChatAvatarsData((prev) => ({ ...prev, avatarPreview: reader.result as string }));
      }
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  return (
    <Flex direction='column' gap='4' align='center' justify='center'>
      <Flex direction='column' gap='2' align='center' justify='center'>
        <Avatar src={newGroupChatAvatarsData.avatarPreview ? newGroupChatAvatarsData.avatarPreview : undefined} boxShadow='xl' size='lg' />
        <Heading color='gray.800' fontSize='lg'>{ newChatData.title }</Heading>
      </Flex>
      <FormControl isRequired isInvalid={newChatData.title === ""}>
        <FormLabel aria-required>Group title:</FormLabel>
        <Input maxLength={40} value={newChatData.title ? newChatData.title : undefined} onChange={(e) => setNewChatData((prev) => ({ ...prev, title: e.target.value }))} />
        <FormErrorMessage>This field is required.</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Group avatar:</FormLabel>
        <input style={{ display: 'none' }} ref={chatAvatarInputRef} type="file" accept="image/*" onChange={handleAvatarChange} />
        {
          chatAvatarInputRef && <Button onClick={() => chatAvatarInputRef.current.click()} colorScheme='blue' leftIcon={<BiImage />}>Upload an image</Button>
        }
      </FormControl>
    </Flex>
  );
}