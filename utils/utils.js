function genToken(username) {
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${username}-${randomPart}`;
}
module.exports = { genToken };