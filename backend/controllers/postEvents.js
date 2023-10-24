const postEvents = require("../models/postEvents");
const User = require("../models/User");

exports.createPostEvents = async (req, res) => {
  try {
    const postEvents = await new postEvents(req.body).save();
    await postEvents.populate("user", "first_name last_name cover picture username");
    res.json(postEvents);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllPostEvents = async (req, res) => {
  try {
    const followingTemp = await User.findById(req.user.id).select("following");
    const following = followingTemp.following;
    const promises = following.map((user) => {
      return postEvents.find({ user: user })
        .populate("user", "first_name last_name picture username cover")
        .populate("comments.commentBy", "first_name last_name picture username")
        .sort({ createdAt: -1 })
        .limit(10);
    });
    const followingPostEvents = await (await Promise.all(promises)).flat();
    const userPostEvents = await postEvents.find({ user: req.user.id })
      .populate("user", "first_name last_name picture username cover")
      .populate("comments.commentBy", "first_name last_name picture username")
      .sort({ createdAt: -1 })
      .limit(10);
    followingPostEvents.push(...[...userPostEvents]);
    followingPostEvents.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    res.json(followingPostEvents);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
};

exports.comment = async (req, res) => {
  try {
    const { comment, image, postEventsId } = req.body;
    let newComments = await postEvents.findByIdAndUpdate(
      postEventsId,
      {
        $push: {
          comments: {
            comment: comment,
            image: image,
            commentBy: req.user.id,
            commentAt: new Date(),
          },
        },
      },
      {
        new: true,
      }
    ).populate("comments.commentBy", "picture first_name last_name username");
    res.json(newComments.comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.savepostEvents = async (req, res) => {
  try {
    const postEventsId = req.params.id;
    const user = await User.findById(req.user.id);
    const check = user?.savedPostEvents.find(
      (postEvents) => postEvents.postEvents.toString() == postEventsId
    );
    if (check) {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: {
          savedPostEvents: {
            _id: check._id,
          },
        },
      });
    } else {
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          savedPostEvents: {
            postEvents: postEventsId,
            savedAt: new Date(),
          },
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deletePostEvents = async (req, res) => {
  try {
    await postEvents.findByIdAndRemove(req.params.id);
    res.json({ status: "ok" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
