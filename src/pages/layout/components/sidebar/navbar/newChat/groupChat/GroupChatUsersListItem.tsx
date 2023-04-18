import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Flex, Text } from "@chakra-ui/layout";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { auth } from "../../../../../../../firebase/config";
import { newChat } from '../../../../../../../store'

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

export const GroupChatUsersListItem = ({ user, setIsFocusedOnInput, setIsSuggestionsListHovered }: Props) => {
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
      _hover={{ background: 'gray.200' }}
      cursor='pointer'
      onClick={() => {
        const newMembersList = newChatData.members || [];
        if (!newMembersList.includes(user.uid)) {
          newMembersList.push(user.uid);
          setNewChatData((prev) => ({ ...prev, members: newMembersList }));
        }
        setIsFocusedOnInput(false);
        setIsSuggestionsListHovered(false);
      }}
    >
      <Avatar name={user.name} boxShadow='md' src={user.avatar}>
        <AvatarBadge boxSize='1em' bg={user.isOnline ? 'green.300' : 'gray.300'} />
      </Avatar>
      <Flex direction='column'>
        <Text fontWeight='bold' color='gray.700'>{ user.name }</Text>
        <Text color='gray.400'>{ user.email }</Text>
      </Flex>
    </Flex>
  );
}