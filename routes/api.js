const express = require("express");
const router = express.Router();

const books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
];
router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.get("/books", (req, res) => {
  res.json(books);
});

module.exports = router;
