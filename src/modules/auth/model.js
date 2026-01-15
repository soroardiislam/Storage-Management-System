import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "staff"],
      default: "staff",
      required: true,
    },
    resetOtp: {
      type: String,
    },
    resetOtpExpiry: Date,
  },
  { timestamps: true }
);
export default mongoose.model("Auth", schema);
