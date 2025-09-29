const express = require("express");
const { genToken } = require("../utils/utils");
const router = express.Router();

const books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
];
const users = [{ username: "sara", password: "p1" }];
const activeTokens = [];
router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.get("/books", (req, res) => {
  res.json(books);
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = genToken(user);
    activeTokens.push(token);
    res.json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
