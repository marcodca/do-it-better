import express from 'express';
import { createServer } from 'http';
import { PubSub } from 'apollo-server';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

const port = process.env.PORT || 4000;

app.get('/test', (req, res) => {
    res.send('working')
})

app.listen(port, () => {
  console.log(`Apollo server on port ${port}`);
});
