import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: String, required: true },
        message: { type: String, required: true },
        product: { type: String }, // Optional: product of interest
    },
    { timestamps: true }
);

export default mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);
