const { User, Post } = require("../models");
const { decryptPass } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jsonwebtoken");
const fs = require("fs");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        order: [["updatedAt", "desc"]],
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const id = +req.userData.id;
      // console.log(id)

      const foundUser = await User.findOne({
        where: { id },
      });
      res.status(200).json(foundUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createUser(req, res) {
    try {
      const { name, email, password, bio } = req.body;
      const createdUser = await User.create({
        name,
        email,
        password,
        bio,
      });
      res.status(200).json(createdUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    const { name, email, password } = req.body;

    try {
      const emailFound = await User.findOne({
        where: { email },
      });

      if (emailFound) {
        if (decryptPass(password, emailFound.password)) {
          let token = tokenGenerator(emailFound);
          // let verifyToken = tokenVerifier(token);
          res.status(200).json({ token });
        } else {
          res.status(403).json({ message: `invalid password!` });
        }
      } else {
        res.status(404).json({ message: `user not found!` });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async updateUser(req, res) {
    try {
      const userId = +req.userData.id;
      const { name, email, password, bio, image } = req.body;
      // const image = req.file.path;
      const foundUser = await User.findOne({
        where: { id: userId },
      });

      const updatedUser = await User.update(
        {
          name,
          email,
          password,
          bio,
          image,
        },
        {
          where: { id: userId },
          individualHooks: true,
        }
      );

      updatedUser[0] === 1
        ? res.status(200).json({ message: `user has been updated` })
        : res.status(404).json({ message: `id is not right` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = +req.params.id;

      const foundUser = await User.findOne({
        where: { id },
      });

      const deletedUser = await User.destroy({
        where: { id },
      });

      const deletedPost = await Post.destroy({
        where: { UserId: id },
      });

      deletedUser === 1
        ? res.status(200).json({ message: `user has been deleted` })
        : res.status(404).json({ message: `id is not found` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
