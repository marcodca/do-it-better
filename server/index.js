import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import server from "./schema";
import path from "path";
import cors from "cors";

const port = process.env.PORT || 4000;

//db
const url =
  process.env.NODE_ENV === "production"
    ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-nvtf4.mongodb.net/test?retryWrites=true`
    : "mongodb://127.0.0.1:27017/do-it-better-db";

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

const app = express();

//cross origin requests
app.use(cors());

//graphql
server.applyMiddleware({ app, path: "/graphql" });
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

httpServer.listen(port, () => {
  console.log(`Apollo server on port ${port}`);
});
