import { Schema, models, model } from "mongoose";

const ctaSchema = new Schema({
  text: { type: String, required: true },
  actionType: { type: String, enum: ["text", "url"], required: true },
  actionValue: { type: String, required: true }
}, { timestamps: true });

const CtaModel = models.Cta || model("Cta", ctaSchema);

export default CtaModel;
