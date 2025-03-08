import mongoose, { Schema, model, models } from "mongoose";


const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true},
});

export const User = models.User || model("User", UserSchema);
