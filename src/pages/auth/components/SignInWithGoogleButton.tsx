import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { BsGoogle } from 'react-icons/bs'

export const SignInWithGoogleButton = () => {
  return (
    <Button leftIcon={<Icon as={BsGoogle} />} colorScheme='blue' boxShadow='md'>Sign In With Google</Button>
  );
}