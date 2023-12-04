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

    event: {
      type: ObjectId,
      ref: "Events",
      required: true,
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
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PostEvents", postEventsSchema);
