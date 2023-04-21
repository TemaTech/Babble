import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Flex, Text } from "@chakra-ui/layout";
import { doc, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { auth, db } from "../../../firebase/config";
import { formatDistanceToNow } from 'date-fns';

interface CurrentChatData {
  type: "personal" | "group";
  title: string;
  avatar: string | null;
  isPartnerOnline: boolean | null;
  lastTimeSeen: string | null;
  members: string[];
}

export const ChatGeneralData = () => {
  const { chatId } = useParams();
  const [currentChatData, setCurrentChatData] = useState<CurrentChatData | null>(null);

  useEffect(() => {
    let unsubscribePartner: () => void;

    if (chatId) {
      const chatDocRef = doc(db, "chats", chatId);
      const unsubscribeChat = onSnapshot(chatDocRef, snapshot => {
        if (snapshot.exists()) {
          const chatData = snapshot.data() as CurrentChatData;
          if (chatData.type === "personal" && auth.currentUser) {
            const partnerUid = chatData.members.filter(member => member !== auth.currentUser!.uid)[0];
            if (partnerUid) {
              const partnerDocRef = doc(db, "users", partnerUid);
              unsubscribePartner = onSnapshot(partnerDocRef, snapshot => {
                if (snapshot.exists()) {
                  const time = formatDistanceToNow(new Date(snapshot.data().lastTimeSeen), { addSuffix: true });
                  setCurrentChatData(() => ({
                    ...chatData,
                    avatar: snapshot.data().avatar,
                    title: snapshot.data().name,
                    isPartnerOnline: snapshot.data().isOnline,
                    lastTimeSeen: time,
                  }));
                }
              });
            }
          } else if (chatData.type === "group") {
            setCurrentChatData(() => ({
              ...chatData,
            }));
          }
        }
      });

      return () => {
        unsubscribeChat();
        if (unsubscribePartner) unsubscribePartner();
      };
    }
  }, [chatId]);

  return (
    <Flex gap='2'>
      <Avatar bgGradient="linear(to-b, blue.300, blue.400)"  boxShadow='md' color='white' name={currentChatData?.title} src={currentChatData && currentChatData.avatar ? currentChatData.avatar : undefined}>
        {
          currentChatData && currentChatData.type === "personal" &&
          <AvatarBadge bg={currentChatData.isPartnerOnline ? "green.300" : "gray.300"} boxSize='1em' />
        }
      </Avatar>
      <Flex direction='column' justify='center'>
        <Text color='gray.700' fontWeight='bold'>{ currentChatData && currentChatData.title }</Text>
        {
          currentChatData?.type === "personal" &&
          currentChatData.isPartnerOnline ? 
          <Text color='blue.500' fontSize='sm'>Online</Text>
          :
          currentChatData?.lastTimeSeen &&
          <Text color='gray.500' fontSize='sm'>Last time seen: { currentChatData.lastTimeSeen }</Text>
        }
        {
          currentChatData?.type === "group" &&
          <Text color='gray.500' fontSize='sm'>{currentChatData?.members.length} members</Text>
        }
      </Flex>
    </Flex>
  );
}