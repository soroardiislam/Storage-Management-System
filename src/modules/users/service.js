import User from "./model.js";
import bcrypt from "bcrypt";
import { sendMail } from "../../utils/email.service.js";

export const createUser = async (data) => {
  const exists = await User.findOne({ email: data.email });
  if (exists) {
    throw new Error("Email already exists");
  }
  data.password = await bcrypt.hash(data.password, 10);
  const user = await User.create(data);
  await sendMail(user.email, "New Account", "Your account is created");
  return user;
};

