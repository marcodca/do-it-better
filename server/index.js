import express from "express";
import { createServer } from "http";
import server from "./schema";

const port = process.env.PORT || 4000;
const app = express();

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  console.log(`Apollo server on port ${port}`);
});
