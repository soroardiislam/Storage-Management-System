import bcrypt from "bcrypt";
import User from "../users/model.js";
import { sendMail } from "../../utils/email.service.js";

export const register = async (data) => {
  data.password = await bcrypt.hash(data.password, 10);
  const user = await User.create(data);
  await sendMail(user.email, "Welcome!", "Your account has been created.");
  return user;
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user){
    console.log("User not found");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match){
    console.log("Incorrect password");
    
  };

};


