import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A folder must have a name"],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Folder must belong to a user"],
    },
    parentFolder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
    path: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
        name: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

folderSchema.index({ user: 1, parentFolder: 1 });
const Folder = mongoose.model("Folder", folderSchema);
export default Folder;
