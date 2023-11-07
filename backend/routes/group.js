const express = require("express");
const {
  createGroup,
  getAllGroups,
  joinGroup,
  getMyGroups,
} = require("../controllers/group");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.post("/createGroup", authUser, createGroup);
router.get("/getAllGroups", authUser, getAllGroups);
router.post("/joinGroup/:id", authUser, joinGroup);
router.get("/myGroups", authUser, getMyGroups);


module.exports = router;


