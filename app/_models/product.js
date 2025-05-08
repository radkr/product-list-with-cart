import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  image: {
    thumbnail: { type: String, required: true },
    mobile: { type: String, required: true },
    tablet: { type: String, required: true },
    desktop: { type: String, required: true },
  },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
