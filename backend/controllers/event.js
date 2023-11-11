const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const { title, date, description, location, category } = req.body;

    const event = await Event.create({
      title,
      date,
      description,
      location,
      category,
    });

    res.json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.joinEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Assuming req.user.id is available after authentication middleware
    const userId = req.user.id;

    // Adding a check to see if the user is already a member of the event
    const isMember = await Event.exists({
      _id: eventId,
      "members.user": userId,
    });

    if (!isMember) {
      await Event.findByIdAndUpdate(eventId, {
        $push: {
          members: {
            user: userId,
          },
        },
      });

      const event = await Event.findById(eventId);
      res.json(event);
    } else {
      res.status(400).json({ message: "User is already a member of the event." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const userId = req.user.id;

    const events = await Event.find({
      members: {
        $elemMatch: {
          user: userId,
        },
      },
    });

    res.json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
