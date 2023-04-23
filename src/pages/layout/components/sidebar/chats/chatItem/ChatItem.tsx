import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Divider, Flex, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { doc, onSnapshot } from "@firebase/firestore";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { auth, db } from "../../../../../../firebase/config";
import { userChats } from "../../../../../../store";
import { formatDistanceToNow } from 'date-fns';

interface ChatLastMessage {
  text: string;
  sentBy: string;
  sentAt: string;
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

export const ChatItem = ({ id, title, avatar, lastMessage, type, isPartnerOnline, members, createdAt, createdBy }: Chat) => {
  const { chatId } = useParams();
  const [chats, setChats] = useAtom(userChats);
  const [chatItemIndex, setChatItemIndex] = useState<number>();
  const [chatObj, setChatObj] = useState<Chat>({
    title: title,
    lastMessage: lastMessage,
    avatar: avatar,
    id: id,
    type: type,
    isPartnerOnline: isPartnerOnline,
    members: members,
    createdAt: createdAt,
    createdBy: createdBy,
  });
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatId && chatId === id) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [chatId]);

  const [lgBreakpoint] = useMediaQuery("(min-width: 62em)");

  useEffect(() => {
    if (chats && chatObj) {
      const chatItemObj = chats.findIndex(chat => chat.id === chatObj.id);
      if (chatItemObj) setChatItemIndex(chatItemObj);
    }
  }, [chats, chatObj]);

  useEffect(() => {
    if (chatObj && chatObj.id) {

      const chatDocRef = doc(db, "chats", chatObj.id);
      const unsubscribeChat = onSnapshot(chatDocRef, chatSnapshot => {
        if (chatSnapshot.exists()) {
          const newChatData = chatSnapshot.data() as Chat;

          if (newChatData.lastMessage.sentBy) {
            const lastMessageSentByDocRef = doc(db, "users", newChatData.lastMessage.sentBy);
            const unsubscribeLastMessageSentBy = onSnapshot(lastMessageSentByDocRef, userSnapshot => {
              if (userSnapshot.exists()) {
                newChatData.lastMessage = { ...newChatData.lastMessage, sentBy: userSnapshot.data().name };
                setChatObj(() => ({ ...newChatData }));
              }
            });

            return () => unsubscribeLastMessageSentBy();
          }

          if (newChatData.lastMessage.sentAt) {
            const formattedTime = formatDistanceToNow(new Date(newChatData.lastMessage.sentAt), { addSuffix: true });
            if (formattedTime) newChatData.lastMessage = { ...newChatData.lastMessage, sentAt: formattedTime };
            setChatObj(() => ({ ...newChatData }));
          }

          if (newChatData.type === "personal" && auth.currentUser) {
            const partnerId = newChatData.members.filter(member => member !== auth.currentUser?.uid)[0];
            const partnerDocRef = doc(db, "users", partnerId);
            const unsubscribePartner = onSnapshot(partnerDocRef, partnerSnapshot => {
              if (partnerSnapshot.exists()) {
                newChatData.title = partnerSnapshot.data().name;
                newChatData.avatar = partnerSnapshot.data().avatar;
                setChatObj(() => ({ ...newChatData }));
              }
            });

            return () => unsubscribePartner();
          }
        }
      });

      return () => unsubscribeChat();
    }
  }, [chatObj, chatItemIndex]);

  useEffect(() => {
    if (chatObj && chatItemIndex) {
      const newChatsList = [...chats];
      newChatsList[chatItemIndex] = { ...chatObj };
      setChats(() => [...newChatsList]);
    }
  }, [chatObj]);

  return (
    <Flex direction='column' w='100%' key={chatObj.id}>
      <Flex
        onClick={() => navigate(`/chat/${chatObj.id}`)}
        gap='3'
        p='3'
        cursor='pointer'
        borderRadius='xl'
        align='center'
        _hover={!isSelected ? { background: 'gray.200' } : undefined}
        bgGradient={isSelected ? "linear(to-br, #6f00ff, blue.300)" : undefined}
        boxShadow={isSelected ? 'md' : undefined}
      >
        <Avatar src={chatObj.avatar ? chatObj.avatar : undefined} size='md' bgGradient="linear(to-b, blue.300, blue.400)" boxShadow='md' color='white' name={title ? title : undefined}>
        </Avatar>
        <Flex direction='column' gap='1' w='100%'>
          <Flex justify='space-between' gap='3'>
            <Text color={isSelected ? 'white' : 'gray.700'} fontWeight='bold'>{ chatObj.title }</Text>
            {
              chatObj.lastMessage.sentAt &&
              <Text fontSize='xs' color={isSelected ? 'white' : 'gray.400'}>{ chatObj.lastMessage.sentAt }</Text>
            }
          </Flex>
          {
            chatObj.lastMessage.sentBy &&
            <Flex direction='column'>
              {
                chatObj.type === 'group' &&
                <Text fontSize='sm' color={isSelected ? 'white' : 'gray.600'} fontWeight='bold'>{ chatObj.lastMessage.sentBy }</Text>
              }
              <Text fontSize='sm' noOfLines={[1, 2]} maxW='75%' color={isSelected ? 'white' : 'gray.500'}>{ chatObj.lastMessage.text }</Text>
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
