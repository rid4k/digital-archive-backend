import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const CategoriesModel = mongoose.model("Categories", CategoriesSchema);
