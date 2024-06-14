const { Schema, models, model } = require("mongoose");

const CartSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    ProductFirstImage: {
      type: String,
      required: true,
    },
    ProductSecondImage: {
      type: String,
      required: true,
    },
    Color: {
      type: String,
      required: true,
    },
    Size: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Cart = models?.Cart || model("Cart", CartSchema);
