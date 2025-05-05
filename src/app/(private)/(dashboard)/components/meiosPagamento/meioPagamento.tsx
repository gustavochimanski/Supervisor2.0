"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PieChart } from "@mui/x-charts/PieChart";
import { PieValueType } from "@mui/x-charts/models";

const chartData = [
  { id: 0, value: 275, label: "Chrome", color: "#6366F1" }, // Indigo-500
  { id: 1, value: 200, label: "Safari", color: "#FBBF24" }, // Amber-400
  { id: 2, value: 187, label: "Firefox", color: "#F87171" }, // Red-400
  { id: 3, value: 173, label: "Edge", color: "#38BDF8" },   // Sky-400
  { id: 4, value: 90, label: "Other", color: "#34D399" },   // Emerald-400
] satisfies PieValueType[];

export function ComponentMeioPagamento() {
  return (
    <Card className="flex flex-col flex-1 min-h-[300px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Legend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>

      <CardContent className="p-4 flex-1">
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
          {/* Gráfico */}
          <div className="flex justify-center w-full md:w-auto">
            <PieChart
              series={[
                {
                  data: chartData,
                  highlightScope: { fade: "global", highlight: "item" },
                  innerRadius: 0,
                },
              ]}
              height={200}
              sx={{ width: "100%", maxWidth: 240 }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
