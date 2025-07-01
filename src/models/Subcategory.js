import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    },
    { timestamps: true }
);

export default mongoose.models.Subcategory || mongoose.model("Subcategory", SubcategorySchema);
