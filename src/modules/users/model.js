import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "staff"],
      default: "staff",
    },
    isActive: { type: Boolean, default: true },
    avatar: String,
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
