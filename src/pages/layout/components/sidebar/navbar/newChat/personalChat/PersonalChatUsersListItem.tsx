import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

interface User {
  name: string;
  email: string;
  avatar: string;
  uid: string;
  isOnline: boolean;
}

interface Props {
  user: User;
}

export const PersonalChatUsersListItem = ({ user }: Props) => {
  return (
    <Flex
      direction='row'
      gap='2'
      p='2'
      bg='gray.100'
      borderRadius='5'
      cursor='pointer'
      _hover={{ background: 'gray.200' }}
    >
      <Avatar name={user.name} boxShadow='md' src={user.avatar}>
        <AvatarBadge boxSize='1em' bg={user.isOnline ? 'green.400' : 'gray.300'} />
      </Avatar>
      <Flex direction='column'>
        <Text>{ user.name }</Text>
        <Text color='gray.500'>{ user.email }</Text>
      </Flex>
    </Flex>
  );
}