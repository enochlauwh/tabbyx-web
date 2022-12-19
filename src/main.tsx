import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import { ApolloProvider } from '@apollo/client';

import { ApolloClient } from '@services';

const { ToastContainer } = createStandaloneToast();

import Router from './navigation/Router';

import './setupApp';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <BrowserRouter>
      <ChakraProvider>
        <ApolloProvider client={ApolloClient}>
          <Router />
        </ApolloProvider>
      </ChakraProvider>
    </BrowserRouter>
    <ToastContainer />
  </>,
);
