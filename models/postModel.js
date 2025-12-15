

import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true },          // SEO title
    h1: { type: String , maxlength: 90},                              // Page H1
    metaDescription: { type: String, maxlength: 180 },// SEO meta description

    description: { type: String, required: true },
    image: { type: String, default: "default.jpg" },
    cta: { type: Schema.Types.ObjectId, ref: "Cta" },
    created_at: { type: Date, default: Date.now }
  },
  { toJSON: { virtuals: true } }
);

export default models.Post || model("Post", postSchema);
