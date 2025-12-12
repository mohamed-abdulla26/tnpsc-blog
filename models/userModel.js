import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema, model, models } = mongoose;



const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" }, 
});


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = models.User || model("User", userSchema);
export default User;
