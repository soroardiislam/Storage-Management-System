import User from "./user.model.js";
import AppError from "../../utils/AppError.js";
import cloudinary from "../../config/cloudinary.js";

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const updateMe = async (userId, body, file) => {
  if (body.password || body.passwordConfirm) {
    throw new AppError(
      "This route is not for password updates. Please use /updateMyPassword.",
      400
    );
  }

  const filteredBody = filterObj(body, "name", "email");

  if (file) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: `storage-app/avatars`,
        transformation: [{ width: 500, height: 500, crop: "limit" }],
      });
      filteredBody.avatar = result.secure_url;
    } catch (err) {
      throw new AppError("Error uploading avatar", 500);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(userId, filteredBody, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

export const updatePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");
  if (!(await user.correctPassword(currentPassword, user.password))) {
    throw new AppError("Your current password is wrong", 401);
  }
  user.password = newPassword;
  await user.save();
  return user;
};
