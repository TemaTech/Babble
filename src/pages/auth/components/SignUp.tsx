import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";

export const SignUp = () => {
  return (
    <Flex gap='3' direction='column'>
      <FormControl>
        <FormLabel color='blue.800' aria-required>Your name: *</FormLabel>
        <Input color='blue.800' type='text' placeholder="Name" required />
      </FormControl>
      <FormControl>
        <FormLabel color='blue.800' aria-required>Your email address: *</FormLabel>
        <Input color='blue.800' type='email' placeholder="Email address" required />
      </FormControl>
      <FormControl>
        <FormLabel color='blue.800' aria-required>New password: *</FormLabel>
        <Input color='blue.800' type='password' placeholder="Password" required />
      </FormControl>
      <Button colorScheme='blue'>Sign Up</Button>
    </Flex>
  );
}