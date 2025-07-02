import React from "react";

const SummaryCard = ({
    icon: Icon,
    value,
    label,
    iconBg = "bg-blue-100",
    iconColor = "text-blue-600",
}) => (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-center min-w-[200px]">
        <div className={`p-3 rounded-lg ${iconBg} flex items-center justify-center`}>
            <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
        <div className="ml-5">
            <div className="text-xs font-medium text-gray-500 mb-1">{label}</div>
            <div className="text-2xl font-bold text-gray-900 leading-tight">{value}</div>
        </div>
    </div>
);

export default SummaryCard;
