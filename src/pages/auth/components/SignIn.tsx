import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";

export const SignIn = () => {
  return (
    <Flex gap='3' direction='column'>
      <FormControl>
        <FormLabel color='blue.800' aria-required>Email address: *</FormLabel>
        <Input color='blue.800' type='email' placeholder="Email address" required />
      </FormControl>
      <FormControl>
        <FormLabel color='blue.800' aria-required>Password: *</FormLabel>
        <Input color='blue.800' type='password' placeholder="Password" required />
      </FormControl>
      <Button colorScheme='blue'>Sign In</Button>
    </Flex>
  );
}