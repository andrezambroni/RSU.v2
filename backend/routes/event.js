const express = require("express");
const {
  createEvent,
  getAllEvents,
  joinEvent,
  getMyEvents,
} = require("../controllers/event");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.post("/createEvent", authUser, createEvent);
router.get("/getAllEvents", authUser, getAllEvents);
router.post("/joinEvent/:id", authUser, joinEvent);
router.get("/myEvents", authUser, getMyEvents);


module.exports = router;


