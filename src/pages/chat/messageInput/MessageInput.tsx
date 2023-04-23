import { IconButton } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Flex } from '@chakra-ui/layout'
import { useState } from 'react'
import { FaRegPaperPlane } from 'react-icons/fa'
import { BiImage } from 'react-icons/bi';

export const MessageInput = () => {
  const [text, setText] = useState("");

  return (
    <Flex position='absolute' p='2' gap='2' bg='whiteAlpha.600' h='fit-content' borderRadius='2xl' bottom='4' right='4' left='4' boxShadow='sm'>
      <IconButton aria-label='Add a photo or video' borderRadius="xl" colorScheme="blue" variant='ghost' icon={<BiImage />} fontSize='xl' />
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder='Your message' borderRadius='xl' />
      <IconButton aria-label='Send a message' borderRadius="xl" colorScheme="blue" icon={<FaRegPaperPlane />} />
    </Flex>
  )
}
