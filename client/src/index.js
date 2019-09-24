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
import { BrowserRouter as Router } from "react-router-dom";

//Set the corresponding uri 

const isProduction = process.env.NODE_ENV === "production";

const httpLink = new HttpLink({
  uri: isProduction ? "/graphql" : `http://localhost:4000/graphql`
});

const wsLink = new WebSocketLink({
  uri: isProduction
    ? `wss://${window.location.host}/graphql`
    : `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

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
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
