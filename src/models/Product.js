const { Schema, models, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = models?.Product || model("Product", ProductSchema);
