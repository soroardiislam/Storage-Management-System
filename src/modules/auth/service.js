import bcrypt from "bcrypt";
import User from "./model.js";
import { generateToken } from "../../utils/jwt.js";
import { generateOTP } from "../../utils/otp.js";
import { sendMail } from "../../utils/email.service.js";

export const register = async (data) => {
  const exists = await User.findOne({ email: data.email });
  if (exists) {
    throw new Error("Email already exists");
  }

  data.password = await bcrypt.hash(data.password, 10);
  const user = await User.create(data);
  await sendMail(user.email, "Welcome!", "Your account has been created.");
  return user;
};

export const login = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    console.log("User not found");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    console.log("Incorrect password");
  }
  return generateToken(user);
};

export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    console.log("User not found");
  }
  const otp = generateOTP();
  user.resetOtp = otp;
  user.resetOtpExpiry = Date.now() + 5 * 60 * 1000;
  await user.save();
  await sendMail(email, "Your OTP", `Your OTP is: ${otp}`);
};

export const resetPassword = async (otp, newPassword) => {
  const user = await User.findOne({
    resetOtp: otp.trim(),
    resetOtpExpiry: { $gt: Date.now() },
  });

  if (!user) {
    const error = new Error("Invalid or expired token");
    error.statusCode = 400;
    throw error;
  }

  if (!newPassword) {
    const error = new Error("New password is required");
    error.statusCode = 400;
    throw error;
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetOtp = null;
  user.resetOtpExpiry = null;
  await user.save();
};
