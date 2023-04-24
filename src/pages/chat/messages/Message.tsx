import { Avatar } from "@chakra-ui/avatar";
import { Flex, Text } from "@chakra-ui/layout";
import { doc, onSnapshot } from "@firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { auth, db } from "../../../firebase/config";

interface Props {
  id: string;
}

interface MessageData {
  name: string;
  avatar: string;
  text: string;
  sentAt: string;
  sentBy: string;
}

export const Message = ({ id }: Props) => {
  const [messageData, setMessageData] = useState<MessageData>();
  const { chatId } = useParams();

  useEffect(() => {
    if (auth.currentUser && chatId) {
      const messageDocRef = doc(db, "messages", chatId, "chat-messages", id);
      const unsubscribeMessage = onSnapshot(messageDocRef, messageSnapshot => {
        if (messageSnapshot.exists()) {
          const userDocRef = doc(db, "users", messageSnapshot.data().sentBy);
          const unsubscribeUser = onSnapshot(userDocRef, userSnapshot => {
            if (userSnapshot.exists()) {
              const formattedTime = formatDistanceToNow(new Date(messageSnapshot.data().sentAt), { addSuffix: true });
              setMessageData(() => ({
                name: userSnapshot.data().name,
                avatar: userSnapshot.data().avatar,
                text: messageSnapshot.data().text,
                sentAt: formattedTime,
                sentBy: messageSnapshot.data().sentBy,
              }));
            }
          });

          return () => unsubscribeUser();
        }
      });

      return () => unsubscribeMessage();
    }
  }, [chatId]);

  return (
    <Flex gap='4' direction={messageData?.sentBy !== auth.currentUser?.uid ? 'row' : 'row-reverse'} p='4' align="flex-start">
      <Avatar boxShadow='md' src={messageData?.avatar} />
      <Flex direction='column' gap='2'>
        <Flex direction='column' gap='1' bgGradient={messageData?.sentBy === auth.currentUser?.uid ? "linear(to-bl, #6f00ff, blue.300)" : undefined} bg={messageData?.sentBy !== auth.currentUser?.uid ? "gray.300" : undefined} p='2' borderRadius='xl'>
          <Text fontWeight='bold' color={messageData?.sentBy === auth.currentUser?.uid ? "white" : 'gray.700'}>{ messageData?.name }</Text>
          <Text fontSize='sm' color={messageData?.sentBy === auth.currentUser?.uid ? "white" : 'gray.600'}>{ messageData?.text }</Text>
        </Flex>
        <Text fontSize='xs' color='gray.400'>{ messageData?.sentAt }</Text>
      </Flex>
    </Flex>
  )
}
