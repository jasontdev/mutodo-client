import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND,
  cache: new InMemoryCache()
});

ReactDOM.render(
  React.createElement(App, { apolloClient: client }, null),
  document.getElementById('root')
);
