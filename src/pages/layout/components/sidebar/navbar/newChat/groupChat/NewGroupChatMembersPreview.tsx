import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { doc, getDoc } from "@firebase/firestore";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../../../../../firebase/config";
import { newChat } from "../../../../../../../store";
import { CloseIcon } from '@chakra-ui/icons'

interface User {
  name: string;
  avatar: string;
  uid: string;
}

export const NewGroupChatMembersPreview = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [newChatData, setNewChatData] = useAtom(newChat);

  const getUserData = async (membersList: User[], uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      membersList.push({
        name: docSnap.data().name,
        avatar: docSnap.data().avatar,
        uid: docSnap.data().uid,
      });
    }
  }

  useEffect(() => {
    const setUsersData = async () => {
      if (newChatData.members) {
        const membersList: User[] = [];
        for (const uid of newChatData.members) {
          await getUserData(membersList, uid);
        }
        setUsersList(membersList);
      }
    }
    setUsersData();
  }, [newChatData]);

  const removeUserFromUsersList = (uid: string) => {
    if (newChatData.members) {
      const newMembersList = newChatData.members.filter((userId) => userId !== uid);
      setNewChatData((prev) => ({ ...prev, members: newMembersList }));
    }
  }

  return (
    <Wrap spacing='2'>
      {
        usersList.map((user) => (
          <WrapItem key={user.uid} alignItems='center' display='flex' flexDirection='row' p='2' gap='4' bg='gray.100' borderRadius='5'>
            <Avatar bgGradient="linear(to-b, blue.300, blue.400)"  boxShadow='md' color='white' name={user.name ? user.name : undefined} size='sm' src={user.avatar ? user.avatar : undefined}>
            </Avatar>
            <Text textAlign='center' fontWeight='bold' color='gray.700' fontSize='md'>{ user.name }</Text>
            {
              auth.currentUser && user.uid !== auth.currentUser.uid &&
              <IconButton
                boxShadow='md'
                aria-label="Remove the person"
                colorScheme='red'
                size='xs'
                icon={<CloseIcon />}
                onClick={() => removeUserFromUsersList(user.uid)}
              />
            }
          </WrapItem>
        ))
      }
    </Wrap>
  );
}