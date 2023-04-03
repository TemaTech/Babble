import { Avatar } from "@chakra-ui/avatar";
import { Flex, Heading } from "@chakra-ui/layout";
import { doc, getDoc } from "@firebase/firestore";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { auth, db } from "../../../../firebase/config";
import { profileData } from "../../../../store";

export const ProfilePreview = () => {
  const [profile, setProfile] = useAtom(profileData);

  useEffect(() => {
    const getData = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile((prev) => ({ ...prev, name: docSnap.data().name, avatar: docSnap.data().avatar, avatarPreview: docSnap.data().avatar }));
        }
      }
    }
    getData();
  }, []);

  return (
    <Flex direction='column' gap='4' align='center' justify='center'>
      <Avatar src={profile.avatarPreview} size='lg' boxShadow='xl' />
      <Heading color='blue.900' fontSize='lg'>{ profile.name }</Heading>
    </Flex>
  );
}