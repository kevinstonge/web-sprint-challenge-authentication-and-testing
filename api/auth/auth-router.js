const dbConfig = require('../../data/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Users = require('./auth-model.js');

const checkIfUserExists = async (req, res, next) => {
  try {
    const username = req.body.username;
    if (username) {
      const user = await Users.getUser(username);
      if (user) { req.userExists = true; req.user = user }
      else { req.userExists = false; }
      next();
    }
    else {
      res.status(400).json({message: "error: you must provide a username"})
    }
  }
  catch (error) {
    throw error;
  }
}

router.post('/register', checkIfUserExists, async (req, res) => {
  if (req.userExists) {
    res.status(400).json({message: "username taken"})
  }
  else {
    const { username, password } = req.body;
    if (username && password) {
      const hash = bcrypt.hashSync(password);
      const newUserObject = { username, password: hash }
      const newUserId = await Users.createUser(newUserObject);
      const newUser = await Users.getUser(username);
      const token = jwt.sign({username}, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.status(201).json({newUser, token});
    }
    else {
      res.status(400).json({message: "username and password required"})
    }
  }
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post('/login', checkIfUserExists, (req, res) => {
  if (req.userExists) {
    if (req.body.username && req.body.password) {
      if (bcrypt.compareSync(req.body.password, req.user.password)) {
        const token = jwt.sign({username: req.user.username}, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ message: `welcome, ${req.user.username}`, token })
      }
      else {
        res.status(401).json({ message: "invalid credentials" })
      }
    }
    else {
      res.status(400).json({ message: "username and password required"})
    }
  }
  else {
    res.status(400).json({message: "failed to log in: user does not exist"})
  }
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
