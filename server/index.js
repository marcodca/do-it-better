import express from "express";
import { createServer } from "http";
import mongoose from 'mongoose';
import server from "./schema";

const port = process.env.PORT || 4000;

const url =
  process.env.NODE_ENV === "production"
    ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-nvtf4.mongodb.net/test?retryWrites=true`
    : "mongodb://127.0.0.1:27017/do-it-better-db";

mongoose.connect(url);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

const app = express();

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  console.log(`Apollo server on port ${port}`);
});
