const jwt = require("jsonwebtoken");
const secretCode = process.env.SECRET_CODE || "secret";

const tokenGenerator = (data) => {
  const { id, name, email, image, bio } = data;
  return jwt.sign(
    {
      id,
      name,
      email,
      image, bio,
    },
    secretCode
  );
};

const tokenVerifier = (data) => {
  return jwt.verify(data, secretCode);
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};