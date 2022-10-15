const { tokenVerifier } = require("../helpers/jsonwebtoken");
const { Post } = require("../models");

const authentication = (req, res, next) => {
  // const token = req.headers.token;
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    try {
      let verifyToken = tokenVerifier(token);
      req.userData = verifyToken;
      // console.log(req.userData)
      next();
    } catch (err) {
      res.status(401).json({
        message: "Token not authenticated!",
      });
    }
  } else {
    res.status(404).json({
      message: "Access token not found!",
    });
  }
};

const authorization = async (req, res, next) => {
  console.log("Authorization checked!")
  try {
    const postId = +req.params.id;
    const userId = req.userData.id;

    const foundPost = await Post.findOne({
      where: { id: postId },
    });

    if (!foundPost) {
      res.status(404).json({
        message: "post not found!",
      });
    } else if (foundPost.UserId !== userId) {
      res.status(404).json({
        message: "not authorized!",
      })
    } else {
      next()
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// const authorizationUser = async (req, res, next) => {
//   console.log("Authorization checked!")
//   try {
//     const paramsId = +req.params.id;
//     const userId = +req.userData.id;

//     const foundUser = await User.findOne({
//       where: { id: paramsId },
//     });

//     if (!foundUser) {
//       res.status(404).json({
//         message: "User not found!",
//       });
//     } else if (foundUser.id !== userId) {
//       res.status(404).json({
//         message: "not authorized!",
//       })
//     } else {
//       next()
//     }
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

module.exports = {
  authentication,authorization
};
