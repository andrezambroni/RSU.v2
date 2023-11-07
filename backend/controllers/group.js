const Group = require("../models/Group");
// const User = require("../models/Users");

exports.createGroup = async (req, res) => {
  try {
    const group = await new Group(req.body).save();
    res.json(group);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllGroups = async (req, res) => {
  console.log('passando por aqui')
  try {
    const groups = await Group.find();
    console.log('retornando', groups)
    res.json(groups);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.joinGroup = async (req, res) => {
  try {
    await Group.findByIdAndUpdate(req.params.id, {
      $push: {
        members: {
          user: req.user.id,
        },
      },
    });
    const group = await Group.findById(req.params.id);
    res.json(group);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMyGroups = async (req, res) => {
  try {
   const groups = await Group.find({
    members: {
      $elemMatch: {
        user: req.user.id,
      },
    },
  });
    res.json(groups);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
