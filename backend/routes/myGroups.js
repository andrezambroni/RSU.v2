const express = require("express");
const {
  createGroupsPost,
  getAllGroupsPosts,
  comment,
  savePost,
  deletePost,
} = require("../controllers/postGroups");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.get("/getAllGroupsPosts", authUser, getAllGroupsPosts);
router.post("/createPostsGroups", authUser, createGroupsPost);
router.put("/comment", authUser, comment);
router.put("/savePostEvents/:id", authUser, savePost);
// router.delete("/deletePostEvents/:id", authUser, deletePost);

module.exports = router;
