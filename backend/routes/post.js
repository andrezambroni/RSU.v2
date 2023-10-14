const express = require("express");
const {
  createPost,
  getAllPosts,
  comment,
  savePost,
  deletePost,
} = require("../controllers/post");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", authUser, getAllPosts);
router.put("/comment", authUser, comment);
router.put("/savePost/:id", authUser, savePost);
router.delete("/deletePost/:id", authUser, deletePost);

router.post("/createGroupPost", authUser, createPost);
router.get("/getAllGroupPosts", authUser, getAllPosts);
router.put("/groupComment", authUser, comment);
router.put("/saveGroupPost/:id", authUser, savePost);
router.delete("/deleteGroupPost/:id", authUser, deletePost);

module.exports = router;
