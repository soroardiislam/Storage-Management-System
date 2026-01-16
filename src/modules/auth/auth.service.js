import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import AppError from "../../utils/AppError.js";
import sendEmail from "../../utils/EmailSender.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  });
};

export const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const registerUser = async (userData) => {
  const newUser = await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    avatar: userData.avatar,
    role: userData.role || "user",
  });

  return newUser;
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new AppError("Please provide email and password!", 400);
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError("Incorrect email or password", 401);
  }
  return user;
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("There is no user with email address.", 404);
  }

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  const message = `Your password reset OTP is ${otp}. It is valid for 10 minutes.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password Reset OTP ",
      message,
    });
    return { message: "OTP sent to email" };
  } catch (err) {
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw new AppError("There was an error sending the email", 500);
  }
};

export const verifyOTP = async (email, otp) => {
  const user = await User.findOne({
    email,
    otp,
    otpExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError("OTP is invalid or has expired", 400);
  }

  return { status: "success", message: "OTP Verified" };
};

export const resetPassword = async (email, otp, newPassword) => {
  const user = await User.findOne({
    email,
    otp,
    otpExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError("OTP is invalid or has expired", 400);
  }

  user.password = newPassword;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  return user;
};
