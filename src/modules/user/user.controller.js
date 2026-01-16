import * as userService from "./user.service.js";
import catchAsync from "../../utils/catchAsync.js";

export const getMe = (req, res) => {
  res.status(200).json({
    message: "User fetched successfully",
    status: "success",
    data: { user: req.user },
  });
};

export const updateMe = catchAsync(async (req, res) => {
  const updatedUser = await userService.updateMe(
    req.user.id,
    req.body,
    req.file
  );
  res.status(200).json({
    message: "User updated successfully",
    status: "success",
    data: { user: updatedUser },
  });
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  await userService.updatePassword(req.user.id, currentPassword, newPassword);
  res.status(200).json({
    status: "success",
    message: "Password updated successfully",
  });
});
