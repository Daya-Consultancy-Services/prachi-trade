import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" }],
    },
    { timestamps: true }
);

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
