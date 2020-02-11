const express = require("express");

const server = express();
server.use(express.json());
// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name" : "Diego"}

const users = ["Diego", "Makens", "Victor"];

//middleware Global - sempre será chamado
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método : ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd("Request");
});

//middleware local
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User does not exist" });
  }

  req.user = user;

  return next();
}

//query params
server.get("/users", (req, res) => {
  return res.json(users);
});

//route params
server.get("/users/:index", checkUserInArray, (req, res) => {
  const index = req.params.index; //==> igual a const { index } = req.params
  return res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

//query params
// server.get("/teste", (req, res) => {
//   const nome = req.query.nome;
//   return res.json({ message: `Hello ${nome}` });
// });

server.listen(3000);
