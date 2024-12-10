"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NamePartChart({ chartData, chartConfig }: ReportChartProps) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 10;

  // Menentukan data yang ditampilkan berdasarkan index
  const paginatedData = chartData.slice(startIndex, startIndex + itemsPerPage);

  // Fungsi untuk pindah ke halaman berikutnya
  const handleNext = () => {
    if (startIndex + itemsPerPage < chartData.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  // Fungsi untuk pindah ke halaman sebelumnya
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <CardTitle>Name Part Chart</CardTitle>
            <CardDescription>Showing Name Part Chart</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm">Page {startIndex / itemsPerPage + 1}</p>
            |
            <p className="text-sm">Total Part: {chartData.length}</p>
            <button
              className="p-2 bg-gray-50/40 rounded-lg"
              onClick={handlePrev}
              disabled={startIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="p-2 bg-gray-50/40 rounded-lg"
              onClick={handleNext}
              disabled={startIndex + itemsPerPage >= chartData.length}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart accessibilityLayer data={paginatedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="target"
              stackId="a"
              fill="var(--color-target)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="actual"
              stackId="a"
              fill="var(--color-actual)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
