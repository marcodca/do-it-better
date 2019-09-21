import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import * as serviceWorker from './serviceWorker';

//Set the corresponding uri for production and development
const uri =
  process.env.NODE_ENV === "production"
    ? "/graphql"
    : "//localhost:4000/graphql";


    const httpLink = new HttpLink({
      uri: `http:${uri}`,
    });
    
    const wsLink = new WebSocketLink({
      uri: `wss:${uri}`,
      options: {
        reconnect: true,
      },
    });
    
    const terminatingLink = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return (
          kind === 'OperationDefinition' && operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    );
    
    const link = ApolloLink.from([terminatingLink]);
    
    const cache = new InMemoryCache();
    
    const client = new ApolloClient({
      link,
      cache,
    });
    
    ReactDOM.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
      document.getElementById('root'),
    );


serviceWorker.unregister();
