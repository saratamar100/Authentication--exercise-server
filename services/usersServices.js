const bcrypt = require("bcrypt");
const users = [
  {
    username: "sara",
    password: "$2a$10$bcq8gLKqq0vOU42QZf4hNOZlMZCJKQ5TswD5U3b340RxMz/cEUAGC",
  },
];

const isUserExists = (username) => {
  return users.some((u) => u.username === username);
}
const addUser = (username, hashedPassword) => {
  users.push({ username, password: hashedPassword });
}
const validateUser = (username, password) => {
  return users.find(
    (u) => u.username === username && bcrypt.compareSync(password, u.password)
  );
}  
module.exports = { isUserExists, addUser, validateUser };