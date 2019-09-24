import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { getMainDefinition } from "apollo-utilities";
import { ApolloLink, split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import * as serviceWorker from "./serviceWorker";


//A reference to check if we are in production
const isProduction = process.env.NODE_ENV === "production";

//Http link
const httpLink = new HttpLink({
  uri: isProduction ? "/graphql" : `http://localhost:4000/graphql`
});

//Transport link, NOTE: wws when production.
const wsLink = new WebSocketLink({
  uri: isProduction
    ? `wss://${window.location.host}/graphql`
    : `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

//We set the link depending on the kind of operation that is sent.
const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const link = ApolloLink.from([terminatingLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
