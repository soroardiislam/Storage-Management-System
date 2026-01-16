import * as authService from "./auth.service.js";
import catchAsync from "../../utils/catchAsync.js";

export const register = catchAsync(async (req, res) => {
  const newUser = await authService.registerUser(req.body);
  authService.createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);
  authService.createSendToken(user, 200, res);
});

export const forgotPassword = catchAsync(async (req, res) => {
  const result = await authService.forgotPassword(req.body.email);
  res.status(200).json({
    status: "success",
    message: result.message,
  });
});

export const verifyOTP = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  const result = await authService.verifyOTP(email, otp);
  res.status(200).json({
    message: "OTP verified successfully",
    status: "success",
    data: result,
  });
});

export const resetPassword = catchAsync(async (req, res) => {
  const { email, otp, password } = req.body;
  const user = await authService.resetPassword(email, otp, password);
  authService.createSendToken(user, 200, res);
});

export const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    message: "Logged out successfully",
    status: "success",
  });
};
