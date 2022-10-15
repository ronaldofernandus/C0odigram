const { Post, User } = require("../models");
const fs = require("fs");

class PostController {
  static async getAllPosts(req, res) {
    try {
      const users = await Post.findAll({
        order: [["updatedAt", "desc"]],
        include: [User],
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getPostByUserId(req, res) {
    try {
      const userId = +req.userData.id;
      // console.log(userId)
      
      const foundUser = await Post.findAll({
        include: [User],
        where: { 
          UserId: userId,
          },
      });
      res.status(200).json(foundUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getPostById(req, res) {
    try {
      const id = +req.params.id; 

      const foundPost = await Post.findOne({
        include: [User],
        where: { id },
      });
      res.status(200).json(foundPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createPost(req, res) {
    try {
      const { caption, image } = req.body;
      // const image = req.file.path;
      const UserId = +req.userData.id;
      console.log(UserId)

      const createdPost = await Post.create({
        image,
        caption,
        UserId,
      });
      res.status(200).json(createdPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updatePost(req, res) {
    try {
      const id = +req.params.id;
      const { caption, image } = req.body;
      // const image = req.file.path;

      const foundPost = await Post.findOne({
        where: { id },
      });

      const updatedPost = await Post.update(
        {
          image,
          caption,
        },
        {
          where: { id: id },
        }
      );

      // try {
      //   fs.unlinkSync(foundPost.image);
      //   console.log("File is deleted.");
      // } catch (error) {
      //   console.log(error);
      // }

      updatedPost[0] === 1
        ? res.status(200).json({ message: `Post has been updated` })
        : res.status(404).json({ message: `id is not right` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deletePost(req, res) {
    try {
      const id = +req.params.id;

      const foundPost = await Post.findOne({
        where: { id },
      });

      const deletedPost = await Post.destroy({
        where: { id },
      });

      // try {
      //   fs.unlinkSync(foundPost.image);
      //   console.log("File is deleted.");
      // } catch (error) {
      //   console.log(error);
      // }

      deletedPost === 1
        ? res.status(200).json({ message: `Post has been deleted` })
        : res.status(404).json({ message: `id is not found` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PostController;
