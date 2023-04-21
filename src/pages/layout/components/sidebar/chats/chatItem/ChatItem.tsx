import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Divider, Flex, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { doc, onSnapshot } from "@firebase/firestore";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { auth, db } from "../../../../../../firebase/config";
import { newChat, userChats } from "../../../../../../store";
import { formatDistanceToNow } from 'date-fns';


interface ChatLastMessage {
  text: string;
  sentBy: string;
  sentAt: string;
}

interface Props {
  title: string | null;
  lastMessage: ChatLastMessage;
  avatar: string | null;
  id: string;
  type: "personal" | "group" | null;
  isOnline: boolean | null;
}

interface Chat {
  type: "personal" | "group";
  members: string[];
  createdBy: string;
  createdAt: string;
  title: string;
  lastMessage: ChatLastMessage;
  avatar: string;
  id: string;
  isPartnerOnline: boolean;
}

export const ChatItem = ({ id, title, avatar, lastMessage, type, isOnline }: Props) => {
  const { chatId } = useParams();
  const [chats, setChats] = useAtom(userChats);
  const [currentChatIndex, setCurrentChatIndex] = useState<number>();
  const [chatItemObj, setChatItemObj] = useState<Chat>();
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatId && chatId === id) {
      setIsSelected(true);
      setCurrentChatIndex(chats.findIndex(obj => obj.id === chatId));
    } else {
      setIsSelected(false);
    }
  }, [chatId]);
  const [lgBreakpoint] = useMediaQuery("(min-width: 62em)");

  useEffect(() => {
    if (currentChatIndex) {
      setChatItemObj(chats[currentChatIndex]);
    }
  }, [currentChatIndex]);

  useEffect(() => {
    if (currentChatIndex) {
      const chatDocRef = doc(db, "chats", chats[currentChatIndex].id);
      const unsubscribeChat = onSnapshot(chatDocRef, chatSnapshot => {
        if (chatSnapshot.exists()) {
          const newChatData = chatSnapshot.data() as Chat;

          if (newChatData.lastMessage.sentBy) {
            const lastMessageSentByDocRef = doc(db, "users", newChatData.lastMessage.sentBy);
            const unsubscribeLastMessageSentBy = onSnapshot(lastMessageSentByDocRef, userSnapshot => {
              if (userSnapshot.exists()) {
                newChatData.lastMessage = { ...newChatData.lastMessage, sentBy: userSnapshot.data().name };
                setChatItemObj(() => ({ ...newChatData }));
              }
            });

            return () => unsubscribeLastMessageSentBy();
          }

          if (newChatData.lastMessage.sentAt) {
            const formattedTime = formatDistanceToNow(new Date(newChatData.lastMessage.sentAt), { addSuffix: true });
            if (formattedTime) newChatData.lastMessage = { ...newChatData.lastMessage, sentAt: formattedTime };
            setChatItemObj(() => ({ ...newChatData }));
          }

          if (newChatData.type === "personal" && auth.currentUser) {
            const partnerId = newChatData.members.filter(member => member !== auth.currentUser?.uid)[0];
            const partnerDocRef = doc(db, "users", partnerId);
            const unsubscribePartner = onSnapshot(partnerDocRef, partnerSnapshot => {
              if (partnerSnapshot.exists()) {
                newChatData.title = partnerSnapshot.data().name;
                newChatData.avatar = partnerSnapshot.data().avatar;
                newChatData.isPartnerOnline = partnerSnapshot.data().isOnline;
                setChatItemObj(() => ({ ...newChatData }));
              }
            });

            return () => unsubscribePartner();
          }
        }
      });

      return () => unsubscribeChat();
    }
  }, [currentChatIndex]);

  useEffect(() => {
    if (chatItemObj && currentChatIndex) {
      const newChatsList = [...chats];
      newChatsList[currentChatIndex] = chatItemObj;
      setChats(newChatsList);
    }
  }, [chatItemObj]);

  return (
    <Flex direction='column' w='100%' key={id}>
      <Flex
        onClick={() => navigate(`/chat/${id}`)}
        gap='3'
        p='3'
        cursor='pointer'
        borderRadius='xl'
        align='center'
        _hover={!isSelected ? { background: 'gray.200' } : undefined}
        bgGradient={isSelected ? "linear(to-br, #6f00ff, blue.300)" : undefined}
        boxShadow={isSelected ? 'md' : undefined}
      >
        <Avatar src={avatar ? avatar : undefined} size='md' bgGradient="linear(to-b, blue.300, blue.400)" boxShadow='md' color='white' name={title ? title : undefined}>
          {
            type === "personal" &&
            <AvatarBadge bg={isOnline ? 'green.300' : 'gray.300'} boxSize='1em' />
          }
        </Avatar>
        <Flex direction='column' gap='1' w='100%'>
          <Flex justify='space-between' gap='3'>
            <Text color={isSelected ? 'white' : 'gray.700'} fontWeight='bold'>{ title }</Text>
            {
              lastMessage.sentAt &&
              <Text textAlign='center' color={isSelected ? 'white' : 'gray.400'}>{ lastMessage.sentAt }</Text>
            }
          </Flex>
          {
            lastMessage.sentBy &&
            <Flex direction='column'>
              {
                type === 'group' &&
                <Text fontSize='sm' color={isSelected ? 'white' : 'gray.600'} fontWeight='bold'>{ lastMessage.sentBy }</Text>
              }
              <Text fontSize='sm' noOfLines={[1, 2]} maxW='75%' color={isSelected ? 'white' : 'gray.500'}>{ lastMessage.text }</Text>
            </Flex>
          }
        </Flex>
      </Flex>
      {
        !lgBreakpoint && <Divider />
      }
    </Flex>
  )
}
