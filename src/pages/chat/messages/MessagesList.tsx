import { Flex } from '@chakra-ui/layout';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { Message } from './Message';
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router';
import { auth, db } from '../../../firebase/config';
import { Spinner } from '@chakra-ui/spinner';
import { useSetAtom } from 'jotai';
import { chatDivRef } from '../../../store';

export const MessagesList = () => {
  const [messagesIds, setMessagesIds] = useState<string[]>();
  const { chatId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const setHTMLDivRef = useSetAtom(chatDivRef);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (divRef !== null) {
      setHTMLDivRef(divRef);
    }
  }, [divRef]);

  useEffect(() => {
    if (auth.currentUser && chatId) {
      const messagesCollectionRef = collection(db, "messages", chatId, "chat-messages");
      const q = query(messagesCollectionRef, orderBy("sentAt", "asc"));
      const unsubscribeMessages = onSnapshot(q, messagesSnapshot => {
        const messagesList: string[] = [];
        messagesSnapshot.forEach(message => {
          if (message.exists()) {
            const messageId = message.id;
            messagesList.push(messageId);
          }
        });
        setMessagesIds([...messagesList]);
        setIsLoading(false);
      });

      return () => unsubscribeMessages();
    }
  }, [chatId]);

  return (
    <Flex w='100%' h='100%' direction='column' gap='5' overflowY='auto' justify='flex-start'>
      <Flex mt='20'></Flex>
      {
        !isLoading && messagesIds?.map((messageId, index) => (
          index === messagesIds.length - 1 ? 
          <Message id={messageId} />
          : index === 0 ?
          <Message id={messageId} />
          :
          <Message id={messageId} />
        ))
      }
      {
        isLoading && <Spinner alignSelf='center' mt='50vh' color='gray.400' />
      }
      <Flex ref={divRef} mb='20'></Flex>
    </Flex>
  )
}
