import { IconButton } from "@chakra-ui/button";
import { Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/popover";
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Text } from "@chakra-ui/layout";
import React from 'react'

export const GroupChatInfoPopover = () => {
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
          <Text color='gray.600' fontSize='md'>Group chat is a conversation with multiple people.</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}