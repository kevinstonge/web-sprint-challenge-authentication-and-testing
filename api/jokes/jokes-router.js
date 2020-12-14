// do not change this file
const router = require('express').Router();
const jokes = require('./jokes-data');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] || "";
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.authorized = true; //this approach is not necessary for this project, but would be useful for code that involved roles
  }
  catch {
    req.authorized = false;
  }
  next();
}

router.get('/', verifyToken, (req, res) => {
  if (req.authorized) {
    res.status(200).json(jokes);
  }
  else {
    res.status(401).json({message: "unauthorized"})
  }
});

module.exports = router;
