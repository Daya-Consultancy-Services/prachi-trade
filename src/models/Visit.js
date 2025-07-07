import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema(
    {
        timestamp: { type: Date, default: Date.now },
        userAgent: { type: String },
        ip: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.Visit || mongoose.model("Visit", VisitSchema);
