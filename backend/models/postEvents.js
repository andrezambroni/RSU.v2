const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postEventsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["profilePicture", "coverPicture", null],
      default: null,
    },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    background: {
      type: String,
    },
    comments: [
      {
        comment: {
          type: String,
        },
        image: {
          type: String,
        },
        commentBy: {
          type: ObjectId,
          ref: "User",
        },
        commentAt: {
          type: Date,
          required: true,
        },
      },
    ],
    category: {
      type: String,
    },
    // Novos campos para os detalhes do evento
    eventDetails: {
      title: {
        type: String,
      },
      date: {
        type: String,
      },
      location: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PostEvents", postEventsSchema);
