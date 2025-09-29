function genToken(user) {
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${user.username}-${randomPart}`;
}
module.exports = { genToken };