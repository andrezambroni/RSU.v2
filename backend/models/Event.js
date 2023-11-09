const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const EventsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    data: {
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
    location: {
      type: String,
    },
    category: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Events", EventsSchema);
