import { Flex, Grid } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Navbar } from './components/sidebar/navbar/Navbar'
import { ChatList } from './components/sidebar/chats/ChatList'
import { Outlet, useNavigate } from "react-router";
import { auth } from "../../firebase/config";
import { onAuthStateChanged } from "@firebase/auth";

export const Layout = () => {
  const [lgBreakpoint] = useMediaQuery("(min-width: 62em)");
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/auth");
    }
  });

  return (
    <Grid templateColumns={{ base: '1fr', lg: 'auto 1fr' }} templateRows={{ base: 'auto 1fr', lg: '1fr' }}>
      <Flex direction='column' h='100vh' zIndex='2' borderRight='1px solid' borderRightColor='gray.300' w={{ base: '100vw', lg: '40vw', xl: '30vw' }}>
        <Navbar />
        <ChatList />
      </Flex>
      {
        lgBreakpoint && <Outlet />
      }
    </Grid>
  );
}