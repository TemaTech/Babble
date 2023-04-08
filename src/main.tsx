import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './pages/layout/Layout';
import { Auth } from './pages/auth/Auth';
import { ResetPassword } from './pages/resetPassword/ResetPassword'
import '@fontsource/pacifico'
import '@fontsource/poppins'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>

          </Route>
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
