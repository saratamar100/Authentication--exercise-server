const activeTokens = [];
const addToken = (token) => {
  activeTokens.push(token);
};
const removeToken = (token) => {
  const index = activeTokens.indexOf(token);
  if (index > -1) {
    activeTokens.splice(index, 1);
    return true;
  }
  return false;
};
const isTokenActive = (token) => activeTokens.includes(token);
module.exports = { addToken, removeToken, isTokenActive };
