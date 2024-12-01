import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  tcNumber: { type: Number, required: true },
  userType: { type: String, default: "user" },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("User", UserSchema);
