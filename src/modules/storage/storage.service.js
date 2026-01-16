import File from "./file.model.js";
import Folder from "./folder.model.js";
import cloudinary from "../../config/cloudinary.js";
import AppError from "../../utils/AppError.js";

export const uploadFile = async (fileData, user, folderId = null) => {
  if (user.storageUsed + fileData.size > user.storageLimit) {
    throw new AppError("Storage limit exceeded!", 400);
  }

  let result;
  try {
    result = await cloudinary.uploader.upload(fileData.path, {
      folder: `storage-app/${user.id}`,
      resource_type: "auto",
      use_filename: true,
    });
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    throw new AppError(`Error uploading to Cloudinary: ${err.message}`, 500);
  }

  const newFile = await File.create({
    name: fileData.originalname,
    fileUrl: result.secure_url,
    publicId: result.public_id,
    fileType:
      result.resource_type === "image"
        ? "image"
        : result.format === "pdf"
        ? "pdf"
        : result.resource_type === "video"
        ? "video"
        : "doc",
    size: result.bytes,
    folder: folderId,
    user: user.id,
  });

  user.storageUsed += result.bytes;
  await user.save({ validateBeforeSave: false });

  return newFile;
};

export const getFiles = async (userId, folderId = null, filters = {}) => {
  const query = { user: userId, folder: folderId };

  if (filters.isFavorite) {
    query.isFavorite = true;
    delete query.folder;
  }
  if (filters.fileType) {
    query.fileType = filters.fileType;
  }

  if (filters.startDate && filters.endDate) {
    query.createdAt = {
      $gte: new Date(filters.startDate),
      $lte: new Date(filters.endDate),
    };
    delete query.folder;
  }

  const files = await File.find(query).sort({ createdAt: -1 });
  return files;
};

export const toggleFavorite = async (fileId, userId) => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) {
    throw new AppError("File not found", 404);
  }
  file.isFavorite = !file.isFavorite;
  await file.save();
  return file;
};

export const createFolder = async (name, userId, parentFolderId = null) => {
  let path = [];
  if (parentFolderId) {
    const parent = await Folder.findOne({ _id: parentFolderId, user: userId });
    if (!parent) {
      throw new AppError("Parent folder not found", 404);
    }
    path = [...parent.path, { _id: parent._id, name: parent.name }];
  }
  const newFolder = await Folder.create({
    name,
    user: userId,
    parentFolder: parentFolderId,
    path,
  });
  return newFolder;
};

export const getFolders = async (userId, parentFolderId = null) => {
  const folders = await Folder.find({
    user: userId,
    parentFolder: parentFolderId,
  });
  return folders;
};
