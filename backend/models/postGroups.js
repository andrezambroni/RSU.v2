const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postGroupsSchema = new mongoose.Schema(
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
    group: {
      type: ObjectId,
      ref: "Groups",
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
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PostGroups", postGroupsSchema);
