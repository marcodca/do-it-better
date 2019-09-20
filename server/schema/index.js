const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./types");
const resolvers = require("./resolvers");


const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

module.exports = server