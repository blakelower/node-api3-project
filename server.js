const express = require("express");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");
const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use(express.json());
server.use(logger);
server.use("/posts", postRouter);
server.use("/users", userRouter);

function logger(req, res, next) {
  console.log([`${req.method} Request to ${req.originalUrl} ${new Date().toISOString()}`]);

  next();
}

module.exports = server;
