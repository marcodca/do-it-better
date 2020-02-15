const express = require("express");
const { createServer } = require("http");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const server = require("./schema");
const User = require("./models/user");
const Task = require("./models/task");
const {request} = require('graphql-request')
 

const port = process.env.PORT || 4000;
const isProduction = process.env.NODE_ENV === "production";

//db
const url = isProduction
  ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-dm0x6.mongodb.net/test?retryWrites=true&w=majority`
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

//Endpoint for fetching all data
//is just a tailor made object containing all users and their tasks.
app.get("/data", async (req, res) => {
  const tasks = await Task.find({});
  const users = [...User].map(user => {
    user.tasks = tasks.filter(task => task.userId === user.id);
    return user;
  });
  res.send(users);
});

//
if (isProduction) {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

const query = `mutation {
  createTask(
    title: "testing nowww again in loop!"
    userId: "5d8a2c05212dc717c83b8e71"
  ) {
    title
    userId
    created
  }
}`

setInterval(()=>{
  request('http://localhost:4000/graphql', query).then(data => console.log(data))
},3000)

httpServer.listen(port, () => {
  console.log(`Apollo server on port ${port}`);
});
