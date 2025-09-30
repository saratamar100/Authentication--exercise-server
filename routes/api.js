const express = require("express");
const { genToken } = require("../utils/utils");
const { isLoggedIn } = require("../middlewares");
const { addToken, removeToken } = require("../services/tokenService");
const bcrypt = require("bcrypt");
const { validateUser, isUserExists, addUser } = require("../services/usersServices");
const router = express.Router();

const books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
];
router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.get("/books", isLoggedIn, (req, res) => {
  res.json(books);
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (validateUser(username, password)) {
    const token = genToken(username);
    addToken(token);
    res.json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});
router.post("/logout", isLoggedIn, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const isRemoved = removeToken(token);
  if (isRemoved) {
    return res.json({ msg: "Logged out" });
  }
  return res.status(400).json({ msg: "Invalid token" });
});
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (isUserExists(username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  addUser(username, bcrypt.hashSync(password, 10) );
  res.json({ message: "Registration successful" });
});

module.exports = router;
