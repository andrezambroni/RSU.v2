const Event = require("../models/Event");
// const User = require("../models/Users");

exports.createEvent = async (req, res) => {
  try {
    const event = await new Event(req.body).save();
    res.json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  console.log('passando por aqui')
  try {
    const events = await Event.find();
    console.log('retornando', events)
    res.json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.joinEvent = async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, {
      $push: {
        members: {
          user: req.user.id,
        },
      },
    });
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
   const events = await Event.find({
    members: {
      $elemMatch: {
        user: req.user.id,
      },
    },
  });
    res.json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
