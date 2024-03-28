const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const app = express();

app.use(express.json());
let users = [];

app.post('/register', (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  users.push(user);
  res.send("save successfully")
})

function authenticateUser(email, password) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      return users[i];
    }
  }
  return null;
}
app.post('/login', (req, res) => {
  const authenticatedUser = authenticateUser(req.body.email, req.body.password);
  if (authenticatedUser) {
    const token = jwt.sign({ authenticateUser }, process.env.SECRETE_KEY);
    res.send({ token });
  }
  // console.log(token);
})


// middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }
  jwt.verify(token, process.env.SECRETE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }
    req.user = decoded;
    next();
  });
};

app.get('/profile', verifyToken, (req, res) => {

  res.status(200).send(users);
});


app.listen(8000, () => {
  console.log("server is running ");
})