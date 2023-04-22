import { Flex } from "@chakra-ui/layout";
import { collection, doc, getDoc, onSnapshot, query, QuerySnapshot, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../../../../firebase/config";
import { NoChats } from './NoChats'
import { formatDistanceToNow } from 'date-fns';
import { Spinner } from "@chakra-ui/spinner";
import { ChatItem } from './chatItem/ChatItem'
import Fuse from 'fuse.js'
import { useAtom, useAtomValue } from "jotai";
import { chatListSearchQuery, userChats } from '../../../../../store';

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

export const ChatList = () => {
  const [chats, setChats] = useAtom(userChats);
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;
  const [isLoading, setIsLoading] = useState(true);
  const searchQuery = useAtomValue(chatListSearchQuery);
  const [userChatIds, setUserChatIds] = useState<string[]>([]);

  const getPersonalChatPartnerData = async (chatObj: Chat) => {
    if (chatObj.type === 'personal' && chatObj.members) {
      const partnerUid = chatObj.members.filter((member) => member !== currentUserId)[0];
      const docRef = doc(db, "users", partnerUid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          name: docSnap.data().name,
          avatar: docSnap.data().avatar,
        }
      }
    }
  }

  const getChatLastMessagePersonName = async (chatObj: Chat): Promise<string | undefined> => {
    if (chatObj.lastMessage.sentBy) {
      const docRef = doc(db, "users", chatObj.lastMessage.sentBy);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().name;
      }
    }
  }

  const convertChatLastMessageSentAtTime = (chatObj: Chat) => {
    if (chatObj.lastMessage.sentAt) {
      return formatDistanceToNow(new Date(chatObj.lastMessage.sentAt), { addSuffix: true });
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "chats"), where("members", "array-contains", currentUserId)), (querySnapshot) => {
      const chatsData: Chat[] = [];
      const promises: Promise<void>[] = [];

      querySnapshot.forEach((document) => {
        const chatData = document.data() as Chat;
        const newChatData = chatData;

        if (chatData.type === "personal") {
          promises.push(
            getPersonalChatPartnerData(chatData).then((result) => {
              if (result) {
                newChatData.title = result.name;
                newChatData.avatar = result.avatar;
              }
            })
          );
        }

        if (chatData.lastMessage.sentBy) {
          promises.push(
            getChatLastMessagePersonName(chatData).then((result) => {
              if (result) {
                newChatData.lastMessage.sentBy = result;
              }
            })
          );
        }

        if (chatData.lastMessage.sentAt) {
          const convertedTime = convertChatLastMessageSentAtTime(chatData);
          if (convertedTime) {
            newChatData.lastMessage.sentAt = convertedTime;
          }
        }

        chatsData.push(newChatData);
      });

      Promise.all(promises).then(() => {
        setChats(chatsData);
        setIsLoading(false);
      });
    });

    return () => unsubscribe();
  }, [db, currentUserId, userChatIds]);

  const [filteredChatsList, setFilteredChatsList] = useState<Chat[]>();
  const [fuse, setFuse] = useState<Fuse<Chat>>();

  useEffect(() => {
    if (chats) {
      setFuse(new Fuse(chats, { keys: ["title"] }));
    }
  }, [chats]);
  
  useEffect(() => {
    if (searchQuery && fuse) {
      const searchResult = fuse.search(searchQuery);
      setFilteredChatsList(searchResult.map(({ item }) => item));
    }
  }, [searchQuery])

  return (
    <Flex p='2' gap='2' direction='column' overflowY='auto' sx={{ '&::-webkit-scrollbar': { width: '4px', borderRadius: '10px', backgroundColor: 'gray.200' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'gray.300' } }}>
      {
        isLoading ?
        <Flex align='center' justify='center' p='5'>
          <Spinner color='gray.400' />
        </Flex>
        : !chats && !isLoading ?
        <NoChats />
        :
        filteredChatsList && searchQuery ? filteredChatsList.map((chat) => (
          <ChatItem
            key={chat.id}
            type={chat.type}
            isPartnerOnline={chat.isPartnerOnline}
            id={chat.id}
            title={chat.title}
            avatar={chat.avatar}
            lastMessage={chat.lastMessage}
            members={chat.members}
            createdAt={chat.createdAt}
            createdBy={chat.createdBy}
          />
        ))
        :
        chats && chats.map((chat) => (
          <ChatItem
            key={chat.id}
            type={chat.type}
            isPartnerOnline={chat.isPartnerOnline}
            id={chat.id}
            title={chat.title}
            avatar={chat.avatar}
            lastMessage={chat.lastMessage}
            members={chat.members}
            createdAt={chat.createdAt}
            createdBy={chat.createdBy}
          />
        ))
      }
    </Flex>
  );
}