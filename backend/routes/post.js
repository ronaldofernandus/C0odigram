const postRoute = require("express").Router();
const { PostController } = require("../controllers");
const { authentication, authorization } = require("../middlewares/auth");
// const { upload } = require("../middlewares/multer");

postRoute.get("/", PostController.getAllPosts);
postRoute.get("/profile", authentication, PostController.getPostByUserId);
postRoute.get("/:id", PostController.getPostById);

postRoute.post(
  "/create",
  authentication,
  // upload.single("image"),
  PostController.createPost
);
postRoute.put(
  "/:id",
  authentication,
  // upload.single("image"),
  authorization,
  PostController.updatePost
);
postRoute.delete(
  "/:id",
  authentication,
  authorization,
  PostController.deletePost
);

module.exports = postRoute;
