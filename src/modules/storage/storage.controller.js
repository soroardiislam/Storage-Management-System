import * as storageService from "./storage.service.js";
import catchAsync from "../../utils/catchAsync.js";

export const uploadFile = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new Error("No file uploaded");
  }
  const { folderId } = req.body;
  const file = await storageService.uploadFile(
    req.file,
    req.user,
    folderId || null
  );
  res.status(201).json({
    message: "file uploaded Successfully",
    status: "success",
    data: { file },
  });
});

export const createFolder = catchAsync(async (req, res) => {
  const { name, parentFolderId } = req.body;
  const folder = await storageService.createFolder(
    name,
    req.user.id,
    parentFolderId || null
  );
  res.status(201).json({
    message: "Create Folder Successfully",
    status: "success",
    data: { folder },
  });
});

export const getFiles = catchAsync(async (req, res) => {
  const { folderId, isFavorite, fileType, startDate, endDate } = req.query;
  const userId = req.user.id;

  const files = await storageService.getFiles(userId, folderId || null, {
    isFavorite,
    fileType,
    startDate,
    endDate,
  });
  const folders = await storageService.getFolders(userId, folderId || null);

  res.status(200).json({
    status: "success",
    results: files.length + folders.length,
    data: { folders, files },
  });
});

export const toggleFavorite = catchAsync(async (req, res) => {
  const { fileId } = req.params;
  const file = await storageService.toggleFavorite(fileId, req.user.id);
  res.status(200).json({
     message: "Add to favorite successfully",
     status: "success", 
     data: { file } 
    });
});

export const getStorageDetails = catchAsync(async (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: "success",
    data: {
      storageUsed: user.storageUsed,
      storageLimit: user.storageLimit,
      usagePercentage: (user.storageUsed / user.storageLimit) * 100,
    },
  });
});
