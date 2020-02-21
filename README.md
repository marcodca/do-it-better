# do-it-better

A basic full-stack task managing application with real-time functionality powered by graphQL subscriptions.

[Link to the app.](https://do-it-better.herokuapp.com/)

<p align="center">
<img width="460" height="300" src="https://i.ibb.co/94QvcXj/screely-1581756343797.png">
</p>

## Getting Started

### NOTE: In order to run this project you are gonna need to have NodeJS installed in your computer. In addition, a mongoDB database needs to be set up.

1. **Clone this repository**

```sh
git clone https://github.com/marcodca/do-it-better.git project-name
```

2. **Installation**

```sh
cd project-name
npm install
cd client
npm install
```

3. **Start developing**

```sh
cd project-name
npm start
cd client
npm start
```

## Acknowledgments
Everybody was doing a to-do's app, I just wanted to be popular!!! This project is in deed my version of, apparently, a must-have in every developers curriculum. It was also a great chance to play around with graphQL with Apollo (server and client), and especially to work with such a neat feature like graphQL subscriptions. The back-end of the project is done with express, the already mentioned Apollo server, and mongoDB for the database, connected with mongoose. On the front-end I used React, routing with react-router, Apollo-client, styled-components and some animations with react-spring.