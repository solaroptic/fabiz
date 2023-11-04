import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 2,
      max: 12,
    },
    email: {
      type: String,
      required: true,
      min: 5,
      max: 30,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 2,
      max: 1000,
      unique: true,
    },
    picturePath: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    location: String,
    about: String,
    news: String,
    notifications: {
      type: Array,
      of: {
        type: String,
      },
      // of: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
      // },
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
