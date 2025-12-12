import 'dotenv/config';
import connectMongo from "../utils/connectMongo.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

async function createAdmin() {
  await connectMongo();

  const email = "admin@example.com";   
  const password = "admin123";         

  const existing = await User.findOne({ email });
  if (existing) return console.log("Admin already exists!");

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ email, password: hashedPassword, role: "admin" });
  console.log("Admin created successfully!");
}

createAdmin();
