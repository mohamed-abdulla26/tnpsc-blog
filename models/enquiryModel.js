

import { Schema, model, models } from "mongoose";

const enquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: String,
      required: true,
      match: /^[6-9]\d{9}$/,
    },
  },
  { timestamps: true }
);

export default models.Enquiry || model("Enquiry", enquirySchema);
