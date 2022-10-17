const bcrypt = require("bcrypt");
const saltRound = +process.env.SALT_ROUND || 5;

const encryptPass = (data) => {
  return bcrypt.hashSync(String(data), saltRound);
};

const decryptPass = (data, hashPass) => {
  return bcrypt.compareSync(String(data), hashPass);
};

module.exports = {
  encryptPass,
  decryptPass,
};