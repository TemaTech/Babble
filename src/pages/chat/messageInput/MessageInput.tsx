import { Button, ButtonSpinner, IconButton } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Flex } from '@chakra-ui/layout'
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { FaRegPaperPlane } from 'react-icons/fa'
import { useParams } from 'react-router'
import { auth, db } from '../../../firebase/config'
import { chatDivRef } from '../../../store'

export const MessageInput = () => {
  const [text, setText] = useState("");
  const { chatId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const divRef = useAtomValue(chatDivRef);

  const handleSendMessage = async () => {
    if (chatId && auth.currentUser && text !== "") {
      setIsLoading(true);
      const messageDocRef = collection(db, "messages", chatId, "chat-messages");
      const chatDocRef = doc(db, "chats", chatId);
      try {
        const date = new Date().toISOString();

        await addDoc(messageDocRef, {
          sentBy: auth.currentUser?.uid,
          sentAt: date,
          text: text,
        });

        await updateDoc(chatDocRef, {
          lastMessage: {
            sentBy: auth.currentUser?.uid,
            sentAt: date,
            text: text,
          }
        });

        setText("");
        setIsLoading(false);
        if (divRef !== null) {
          divRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      } catch(err) {
        console.log(err);
      }
    }
  }

  return (
    <Flex zIndex='999' position='absolute' p='2' gap='2' bg='gray.50' h='fit-content' borderRadius='2xl' bottom='4' right='4' left='4' boxShadow='sm'>
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder='Your message' borderRadius='xl' />
      {
        isLoading ?
        <Button borderRadius="xl" colorScheme="blue">
          <ButtonSpinner />
        </Button>
        :
        <IconButton onClick={() => handleSendMessage()} aria-label='Send a message' borderRadius="xl" colorScheme="blue" icon={<FaRegPaperPlane />} />
      }
    </Flex>
  )
}
