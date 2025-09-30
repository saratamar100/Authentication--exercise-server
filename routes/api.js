const express = require("express");
const { genToken } = require("../utils/utils");
const { isLoggedIn } = require("../middlewares");
const { addToken, removeToken } = require("../tokenService");
const bcrypt = require("bcrypt");
const router = express.Router();

const books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
];
const users = [
  {
    username: "sara",
    password: "$2a$10$bcq8gLKqq0vOU42QZf4hNOZlMZCJKQ5TswD5U3b340RxMz/cEUAGC",
  },
];
router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.get("/books", isLoggedIn, (req, res) => {
  res.json(books);
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && bcrypt.compareSync(password, u.password)
  );
  if (user) {
    const token = genToken(user);
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
  const userExists = users.some((u) => u.username === username);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ username, password: bcrypt.hashSync(password, 10) });
  res.json({ message: "Registration successful" });
});

module.exports = router;
