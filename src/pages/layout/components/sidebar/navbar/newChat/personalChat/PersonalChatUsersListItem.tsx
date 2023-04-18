import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Flex, Text } from "@chakra-ui/layout";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { newChat } from '../../../../../../../store'
import { auth } from '../../../../../../../firebase/config'

interface User {
  name: string;
  email: string;
  avatar: string;
  uid: string;
  isOnline: boolean;
}

interface Props {
  user: User;
  setIsFocusedOnInput: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSuggestionsListHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PersonalChatUsersListItem = ({ user, setIsFocusedOnInput, setIsSuggestionsListHovered }: Props) => {
  const [newChatData, setNewChatData] = useAtom(newChat);

  useEffect(() => {
    const newMembersList = newChatData.members || [];
    if (auth.currentUser) {
      newMembersList[0] = auth.currentUser.uid;
    }
    setNewChatData((prev) => ({ ...prev, members: newMembersList }));
  }, []);

  return (
    <Flex
      direction='row'
      gap='4'
      p='2'
      bg='gray.100'
      borderRadius='5'
      cursor='pointer'
      _hover={{ background: 'gray.200' }}
      onClick={() => {
        const newMembersList = newChatData.members || [];
        newMembersList[1] = user.uid;
        setNewChatData((prev) => ({ ...prev, members: newMembersList }));
        setIsFocusedOnInput(false);
        setIsSuggestionsListHovered(false);
      }}
    >
      <Avatar name={user.name} boxShadow='md' src={user.avatar}>
      <AvatarBadge bg={user.isOnline ? 'green.300' : 'gray.300'} boxSize='1em' />
      </Avatar>
      <Flex direction='column'>
        <Text fontWeight='bold' color='gray.700'>{ user.name }</Text>
        <Text color='gray.400'>{ user.email }</Text>
      </Flex>
    </Flex>
  );
}