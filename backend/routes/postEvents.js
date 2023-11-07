const express = require("express");
const {
  createPostEvents,
  getAllPostEvents,
  comment,
  savepostEvents,
  deletePost,
} = require("../controllers/postEvents");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.post("/createPostEvents", authUser, createPostEvents);
router.get("/getAllPostEvents", authUser, getAllPostEvents);
router.put("/comment", authUser, comment);
router.put("/savePostEvents/:id", authUser, savepostEvents);
// router.delete("/deletePostEvents/:id", authUser, deletePost);

module.exports = router;
