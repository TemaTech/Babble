import { Flex } from "@chakra-ui/layout";
import { useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { newChat } from "../../../../../../store";
import { GroupChatUsersListItem } from "./groupChat/GroupChatUsersListItem";
import { PersonalChatUsersListItem } from "./personalChat/PersonalChatUsersListItem";

interface User {
  name: string;
  email: string;
  avatar: string;
  uid: string;
  isOnline: boolean;
}

interface Props {
  usersList: User[];
  setIsSuggestionsListHovered: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFocusedOnInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UsersList = ({ usersList, setIsSuggestionsListHovered, setIsFocusedOnInput }: Props) => {
  const newChatData = useAtomValue(newChat);

  return (
    <Flex
      direction='column'
      gap='2'
      p='2'
      position='absolute'
      zIndex='10'
      bg='white'
      w='100%'
      borderRadius='5'
      boxShadow='md'
      onMouseEnter={() => setIsSuggestionsListHovered(true)}
      onMouseLeave={() => setIsSuggestionsListHovered(false)}
    >
      {
        newChatData.type === "personal" ?
        usersList.map((user) => (
          <PersonalChatUsersListItem user={user} setIsSuggestionsListHovered={setIsSuggestionsListHovered} setIsFocusedOnInput={setIsFocusedOnInput} />
        ))
        : newChatData.type === 'group' &&
        usersList.map((user) => (
          <GroupChatUsersListItem user={user} setIsSuggestionsListHovered={setIsSuggestionsListHovered} setIsFocusedOnInput={setIsFocusedOnInput} />
        ))
      }
    </Flex>
  );
}