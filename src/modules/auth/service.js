import bcrypt from "bcrypt";
import User from "../users/model.js";
import { generateToken } from "../../utils/jwt.js";
import { generateResetToken } from "../../utils/token.js";
import { sendMail } from "../../utils/email.service.js";

export const register = async (data) => {
   const use = await User.findOne(data.email);
  if (use){
    console.log("User already exists");
  }
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
  return generateToken(user);
};

export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user){
    console.log("User not found");
    
  }
  const token = generateResetToken();
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000;
  await user.save();
  await sendMail(email, "Reset Password", `Token: ${token}`);
};

export const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });
  if (!user){
    console.log("Invalid or expired token");
  };
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = null;
  await user.save();
};
