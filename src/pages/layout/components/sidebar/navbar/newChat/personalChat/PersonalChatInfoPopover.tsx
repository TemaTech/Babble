import { IconButton } from "@chakra-ui/button";
import { Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/popover";
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Text } from "@chakra-ui/layout";
import React from 'react'

export const PersonalChatInfoPopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton variant='ghost' aria-label="Info" icon={<InfoOutlineIcon />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Info</PopoverHeader>
        <PopoverBody>
          <Text color='gray.600' fontSize='md'>Personal chat is a one-on-one conversation. The chat is visible only to you and your partner.</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}