import React from 'react';
import PropTypes from 'prop-types';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Login from './routes/Login';
import Home from './routes/Home';

function App({ apolloClient }) {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <ChakraProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

App.propTypes = {
  apolloClient: PropTypes.instanceOf(ApolloClient).isRequired
};

export default App;
