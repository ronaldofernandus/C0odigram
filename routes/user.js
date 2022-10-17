const userRoute = require("express").Router();
const { UserController } = require("../controllers");
// const { upload } = require("../middlewares/multer");
const { authentication } = require("../middlewares/auth");

userRoute.get("/", UserController.getAllUsers);
userRoute.get("/profile", authentication, UserController.getUserById);
userRoute.post("/create", UserController.createUser);
userRoute.post("/login", UserController.login);
userRoute.put(
  "/edit",
  authentication,
  // upload.single("image"),
  UserController.updateUser
);
userRoute.delete("/:id", UserController.deleteUser);

module.exports = userRoute;
