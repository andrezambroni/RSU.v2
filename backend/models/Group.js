const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const GroupsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    description: {
      type: String,
    },
    members: [
      {
        user: {
          type: ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    category: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Groups", GroupsSchema);
