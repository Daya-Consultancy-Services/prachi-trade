import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String }, // Cloudinary URL
        brand: { type: String },
        subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
