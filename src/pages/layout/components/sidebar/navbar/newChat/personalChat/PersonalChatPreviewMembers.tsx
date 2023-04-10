import { Avatar, AvatarBadge } from '@chakra-ui/avatar';
import { Flex, Grid, Text } from '@chakra-ui/layout';
import { doc, getDoc } from '@firebase/firestore';
import { useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react';
import { db } from '../../../../../../../firebase/config';
import { newChat } from '../../../../../../../store'
import { BsChatDots } from 'react-icons/bs';
import { Icon, Spinner } from '@chakra-ui/react'

interface UserData {
  name: string;
  avatar: string | null;
  isOnline: boolean;
  uid: string;
}

export const PersonalChatPreviewMembers = () => {
  const newChatData = useAtomValue(newChat);

  const [user1Data, setUser1Data] = useState<UserData>();
  const [user2Data, setUser2Data] = useState<UserData>();

  useEffect(() => {
    const getUsersData = async () => {
      if (newChatData.members && newChatData.members[0] && newChatData.members[1]) {
        const docRefUser1 = doc(db, "users", newChatData.members[0]);
        const docRefUser2 = doc(db, "users", newChatData.members[1]);
    
        const docSnapUser1 = await getDoc(docRefUser1);
        const docSnapUser2 = await getDoc(docRefUser2);
      
        if (docSnapUser1.exists() && docSnapUser2.exists()) {
          setUser1Data({
            name: docSnapUser1.data().name,
            avatar: docSnapUser1.data().avatar,
            isOnline: docSnapUser1.data().isOnline,
            uid: docSnapUser1.data().uid,
          });

          setUser2Data({
            name: docSnapUser2.data().name,
            avatar: docSnapUser2.data().avatar,
            isOnline: docSnapUser2.data().isOnline,
            uid: docSnapUser2.data().uid,
          });
        }
      }
    }
    
    getUsersData();
  }, [newChatData]);

  return user1Data && user2Data ? (
    <Grid templateColumns='1fr auto 1fr' placeItems='center' gap='4'>
      <Flex direction='column' gap='2' align='center' justify='center'>
        <Avatar src={user1Data.avatar ? user1Data.avatar : undefined} boxShadow='xl' size='lg'>
          <AvatarBadge boxSize='1em' bg={user1Data.isOnline ? 'green.400' : 'gray.300'} />
        </Avatar>
        <Text textAlign='center' fontWeight='bold' color='gray.600'>{ user1Data.name }</Text>
        <Text textAlign='center' color='gray.400'>(You)</Text>
      </Flex>
      <Icon as={BsChatDots} fontSize='xl' color='gray.400' />
      <Flex direction='column' gap='2' align='center' justify='center'>
        <Avatar src={user2Data.avatar ? user2Data.avatar : undefined} boxShadow='xl' size='lg'>
          <AvatarBadge boxSize='1em' bg={user2Data.isOnline ? 'green.400' : 'gray.300'} />
        </Avatar>
        <Text textAlign='center' fontWeight='bold' color='gray.600'>{ user2Data.name }</Text>
        <Text textAlign='center' color='gray.400'>(Your partner)</Text>
      </Flex>
    </Grid>
  ) : (
    <Grid placeItems='center'>
      <Spinner color='gray.400' />
    </Grid>
  )
}