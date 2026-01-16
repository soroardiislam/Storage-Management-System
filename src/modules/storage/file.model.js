import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A file must have a name"],
      trim: true,
    },
    fileUrl: {
      type: String,
      required: [true, "A file must have a URL"],
    },
    publicId: {
      type: String,
      required: [true, "A file must have a Cloudinary Public ID"],
    },
    fileType: {
      type: String,
      enum: ["image", "pdf", "video", "doc", "other"],
      required: [true, "A file must have a type"],
    },
    size: {
      type: Number,
      required: [true, "A file must have a size"],
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "File must belong to a user"],
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

fileSchema.index({ user: 1, folder: 1 });
fileSchema.index({ user: 1, isFavorite: 1 });
fileSchema.index({ user: 1, createdAt: -1 });

const File = mongoose.model("File", fileSchema);
export default File;
