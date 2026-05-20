"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChartContainer } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", present: 110, absent: 120 },
  { month: "Feb", present: 130, absent: 130 },
  { month: "Mar", present: 140, absent: 140 },
  { month: "Apr", present: 160, absent: 160 },
  { month: "May", present: 160, absent: 160 },
  { month: "Jun", present: 160, absent: 160 },
  { month: "Jul", present: 160, absent: 160 },
];

export default function MonthlySummary() {
  return (
    <Card className="rounded-2xl border-muted shadow-sm">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-xl font-bold">
          Revenue Breakdown
        </CardTitle>
        <CardDescription className="text-sm">
          Stacked Bar View
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer>
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={46}>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#d1d5db"
                />

                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6b7280", fontSize: 14 }}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 14 }}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                />

                <Legend
                  verticalAlign="top"
                  iconType="circle"
                  height={40}
                  wrapperStyle={{ fontSize: 14 }}
                />

                {/* DARK GRAY BAR (top) */}
                <Bar
                  dataKey="absent"
                  stackId="a"
                  fill="#3f3f46" // zinc-800
                />

                {/* TEAL BAR (bottom) */}
                <Bar
                  dataKey="present"
                  stackId="a"
                  fill="#14b8a6" // teal-500
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
