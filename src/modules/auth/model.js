import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["ADMIN", "MANAGER", "STAFF"],
      default: "STAFF",
    },
    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);
export default mongoose.model("Auth", schema);
