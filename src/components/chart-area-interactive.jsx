"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "An interactive area chart";

export function ChartAreaInteractive({ daily, weekly, monthly, yearly }) {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = React.useState("daily");

    // Choose the data based on the selected time range
    let chartData = daily;
    if (timeRange === "weekly") chartData = weekly;
    if (timeRange === "monthly") chartData = monthly;
    if (timeRange === "yearly") chartData = yearly;

    // Format data for recharts
    const formattedData = chartData.map((item) => {
        if (timeRange === "daily") return { name: item.date, Visitors: item.count };
        if (timeRange === "weekly") return { name: item.week, Visitors: item.count };
        if (timeRange === "monthly") return { name: item.month, Visitors: item.count };
        if (timeRange === "yearly") return { name: item.year.toString(), Visitors: item.count };
        return item;
    });

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Total Visitors</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} data
                    </span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
                    >
                        <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
                        <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
                        <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
                        <ToggleGroupItem value="yearly">Yearly</ToggleGroupItem>
                    </ToggleGroup>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                            size="sm"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Daily" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="daily" className="rounded-lg">
                                Daily
                            </SelectItem>
                            <SelectItem value="weekly" className="rounded-lg">
                                Weekly
                            </SelectItem>
                            <SelectItem value="monthly" className="rounded-lg">
                                Monthly
                            </SelectItem>
                            <SelectItem value="yearly" className="rounded-lg">
                                Yearly
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent>
                <ChartContainer height={320}>
                    <AreaChart
                        data={formattedData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Area
                            type="monotone"
                            dataKey="Visitors"
                            stroke="#f97316"
                            fillOpacity={1}
                            fill="url(#colorVisitors)"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
