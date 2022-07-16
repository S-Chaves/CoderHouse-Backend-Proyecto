import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  userId: String,
  email: { type: String, require: true },
  password: String,
  username: { type: String, require: true },
  direccion: String,
  edad: Number,
  telefono: String,
  avatar: String
});

const userModel = mongoose.model('user', UsersSchema);

export default userModel;