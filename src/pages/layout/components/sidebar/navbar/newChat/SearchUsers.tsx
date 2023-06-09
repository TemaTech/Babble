import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Search2Icon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { collection, getDocs } from 'firebase/firestore'
import { auth, db } from '../../../../../../firebase/config';
import Fuse from 'fuse.js'
import { Flex } from "@chakra-ui/layout";
import { UsersList } from "./UsersList";
import { useAtomValue } from "jotai";
import { newChat } from "../../../../../../store";

interface User {
  name: string;
  email: string;
  avatar: string;
  uid: string;
  isOnline: boolean;
}

export const SearchUsers = () => {
  const [input, setInput] = useState<string>("");
  const [inputError, setInputError] = useState({
    error: false,
    message: '',
  });
  const newChatDataValue = useAtomValue(newChat);
  
  const [usersList, setUsersList] = useState<User[] | null>(null);
  useEffect(() => {
    const getUsersCollection = async () => {
      const collectionSnapshot = await getDocs(collection(db, "users"));
      const list: User[] = [];
      collectionSnapshot.forEach((doc) => {
        if (auth.currentUser && doc.data().uid !== auth.currentUser.uid) {
          list.push({
            name: doc.data().name,
            email: doc.data().email,
            avatar: doc.data().avatar,
            uid: doc.data().uid,
            isOnline: doc.data().isOnline,
          });
        }
      });
      setUsersList(list);
    }
    getUsersCollection();
  }, []);

  const [filteredUsersList, setFilteredUsersList] = useState<User[] | null>(null);
  const [fuse, setFuse] = useState<Fuse<User> | null>(null);
  useEffect(() => {
    if (usersList) {
      setFuse(new Fuse(usersList, { keys: ["name", "email"] }));
    }
  }, [usersList]);

  useEffect(() => {
    if (input && fuse) {
      const searchResult = fuse.search(input);
      setFilteredUsersList(searchResult.map(({ item }) => item));
    }
  }, [input]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    if (event.target.value === '') {
      setInputError({
        error: true,
        message: "This field is required."
      });
    } else if (!newChatDataValue.members || !newChatDataValue.members[1]) {
      setInputError({
        error: true,
        message: "You didn't choose your chatting partner."
      });
    } else if (newChatDataValue.members && newChatDataValue.members[1] && event.target.value === '') {
      setInputError({
        error: false,
        message: '',
      });
    } else {
      setInputError({
        error: false,
        message: '',
      });
    }
  }

  useEffect(() => {
    if ((newChatDataValue.members && newChatDataValue.members[1]) || (newChatDataValue.members && newChatDataValue.members[1] && input === '')) {
      setInputError({
        error: false,
        message: '',
      });
    }
  }, [newChatDataValue, input]);

  const [isFocusedOnInput, setIsFocusedOnInput] = useState(false);
  const [isSuggestionsListHovered, setIsSuggestionsListHovered] = useState(false);

  const handleOnBlur = () => {
    if (!isSuggestionsListHovered) setIsFocusedOnInput(false);
    if (inputRef.current && isSuggestionsListHovered) inputRef.current.focus();
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isFocusedOnInput && !isSuggestionsListHovered && inputRef.current) inputRef.current.blur();
  }, [isFocusedOnInput, isSuggestionsListHovered]);

  return (
    <Flex direction='column' gap='2'>
      <FormControl isRequired isInvalid={inputError.error}>
        <FormLabel aria-required>Who do you want to start this chat with?</FormLabel>
        <InputGroup>
          <InputLeftElement 
            pointerEvents='none'
            children={<Search2Icon color='gray.300' />}
          />
          <Input ref={inputRef} onFocus={() => setIsFocusedOnInput(true)} onBlur={handleOnBlur} value={input} onChange={handleInputChange} placeholder='Search people' />
        </InputGroup>
        {
          inputError.error &&
          <FormErrorMessage>{ inputError.message }</FormErrorMessage>
        }
      </FormControl>
      <Flex position='relative'>
        {
          filteredUsersList && isFocusedOnInput && (input ? true : false) &&
          <UsersList setIsFocusedOnInput={setIsFocusedOnInput} setIsSuggestionsListHovered={setIsSuggestionsListHovered} usersList={filteredUsersList} />
        }
      </Flex>
    </Flex>
  );
}