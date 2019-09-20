import express from "express";
import { createServer } from "http";
import { PubSub } from "apollo-server";
import server from "./schema";

const port = process.env.PORT || 4000;
const app = express();


server.applyMiddleware({ app, path: "/graphql" });

const httpServer = createServer(app);

app.get("/test", (req, res) => {
    res.send("working");
  });

httpServer.listen(port, () => {
  console.log(`Apollo server on port ${port}`);
});
