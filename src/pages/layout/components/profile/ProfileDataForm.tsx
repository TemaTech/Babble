import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { useAtom } from "jotai";
import { useRef } from "react";
import { profileData } from "../../../../store";
import { BiImage } from 'react-icons/bi'

export const ProfileDataForm = () => {
  const [profile, setProfile] = useAtom(profileData);
  const inputRef = useRef<HTMLInputElement>(null!);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setProfile((prev) => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatarPreview: reader.result as string }));
      }
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  return (
    <Flex direction='column' gap='4'>
      <FormControl isRequired isInvalid={profile.name === ''}>
        <FormLabel aria-required>Your name:</FormLabel>
        <Input maxLength={40} value={profile.name ? profile.name : undefined} onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))} />
        <FormErrorMessage>This field is required.</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Your avatar:</FormLabel>
        <input style={{ display: 'none' }} ref={inputRef} type="file" accept="image/*" onChange={handleAvatarChange} />
        {
          inputRef.current && <Button onClick={() => inputRef.current.click()} colorScheme='blue' leftIcon={<BiImage />}>Upload an image</Button>
        }
      </FormControl>
    </Flex>
  );
}