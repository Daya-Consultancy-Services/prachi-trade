import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Visit from "@/models/Visit";

function getStartOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function getStartOfWeek(date) {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay());
    return getStartOfDay(d);
}
function getStartOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}
function getStartOfYear(date) {
    return new Date(date.getFullYear(), 0, 1);
}

export async function GET() {
    await dbConnect();
    const now = new Date();

    // Daily (last 30 days)
    const daily = [];
    for (let i = 29; i >= 0; i--) {
        const day = new Date(now);
        day.setDate(now.getDate() - i);
        const start = getStartOfDay(day);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        const count = await Visit.countDocuments({ timestamp: { $gte: start, $lt: end } });
        daily.push({ date: start.toISOString().slice(0, 10), count });
    }

    // Weekly (last 12 weeks)
    const weekly = [];
    for (let i = 11; i >= 0; i--) {
        const week = new Date(now);
        week.setDate(now.getDate() - i * 7);
        const start = getStartOfWeek(week);
        const end = new Date(start);
        end.setDate(start.getDate() + 7);
        const count = await Visit.countDocuments({ timestamp: { $gte: start, $lt: end } });
        weekly.push({ week: start.toISOString().slice(0, 10), count });
    }

    // Monthly (last 12 months)
    const monthly = [];
    for (let i = 11; i >= 0; i--) {
        const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const start = getStartOfMonth(month);
        const end = new Date(start);
        end.setMonth(start.getMonth() + 1);
        const count = await Visit.countDocuments({ timestamp: { $gte: start, $lt: end } });
        monthly.push({
            month: `${start.getFullYear()}-${(start.getMonth() + 1).toString().padStart(2, "0")}`,
            count,
        });
    }

    // Yearly (last 5 years)
    const yearly = [];
    for (let i = 4; i >= 0; i--) {
        const year = new Date(now.getFullYear() - i, 0, 1);
        const start = getStartOfYear(year);
        const end = new Date(start);
        end.setFullYear(start.getFullYear() + 1);
        const count = await Visit.countDocuments({ timestamp: { $gte: start, $lt: end } });
        yearly.push({ year: start.getFullYear(), count });
    }

    return NextResponse.json({ daily, weekly, monthly, yearly });
}
