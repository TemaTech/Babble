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
  text: string | null;
  sentBy: string | null;
  sentAt: string | null;
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
  type: "personal" | "group" | null;
  members: string[] | null;
  createdBy: string | null;
  createdAt: string | null;
  title: string | null;
  lastMessage: ChatLastMessage;
  avatar: string | null;
  id: string;
  isPartnerOnline: boolean | null;
}

export const ChatItem = ({ id, title, avatar, lastMessage, type, isOnline }: Props) => {
  const { chatId } = useParams();
  const [chats, setChats] = useAtom(userChats);
  const [newChatsList, setNewChatsList] = useState<Chat[] | null>(null);
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

  const convertChatLastMessageSentAtTime = (chatObj: Chat) => {
    if (chatObj.lastMessage.sentAt) {
      return formatDistanceToNow(new Date(chatObj.lastMessage.sentAt), { addSuffix: true });
    }
  }

  useEffect(() => {
    if (chats) {
      let unsubscribe2: () => void;

      const docRef = doc(db, "chats", id);
      const unsubscribe = onSnapshot(docRef, snapshot => {
        if (snapshot.exists()) {
          const index = chats.findIndex(obj => obj.id === id);
          const updatedChatsList = chats;
          const updatedObj = snapshot.data() as Chat;

          const time = convertChatLastMessageSentAtTime(updatedObj);
          updatedChatsList[index] = {
            ...updatedChatsList[index],
            lastMessage: {
              ...updatedChatsList[index].lastMessage,
              sentAt: time ? time : null,
            }
          }

          if (updatedObj.type === 'personal' && updatedObj.members && auth.currentUser) {
            const partnerUid = updatedObj.members.filter((member) => member !== auth.currentUser!.uid)[0];
            const docRef = doc(db, "users", partnerUid);
            
            unsubscribe2 = onSnapshot(docRef, snapshot => {
              if (snapshot.exists()) {
                updatedChatsList[index] = {
                  ...updatedChatsList[index],
                  avatar: snapshot.data().avatar,
                  title: snapshot.data().name,
                  isPartnerOnline: snapshot.data().isOnline,
                };
                setNewChatsList(updatedChatsList);
              }
            });
          } else if (updatedObj.type === 'group' && updatedObj.lastMessage.sentBy) {
            const userDocRef = doc(db, "users", updatedObj.lastMessage.sentBy);

            unsubscribe2 = onSnapshot(userDocRef, snapshot => {
              if (snapshot.exists()) {
                updatedChatsList[index] = {
                  ...updatedChatsList[index],
                  lastMessage: {
                    ...updatedChatsList[index].lastMessage,
                    sentBy: snapshot.data().name,
                  },
                };
                setNewChatsList(updatedChatsList);
              }
            });
          }
        }
      });

      return () => {
        unsubscribe();
        if (unsubscribe2) unsubscribe2();
      }
    }
  }, [db, chats]);

  useEffect(() => {
    if (newChatsList) {
      setChats([ ...newChatsList ]);
    }
  }, [newChatsList]);

  return (
    <Flex direction='column' w='100%'>
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
        <Avatar src={avatar ? avatar : undefined} size='md' boxShadow='md'>
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
