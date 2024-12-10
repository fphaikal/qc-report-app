'use client'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { format } from "date-fns"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ReportChart({ chartData, chartConfig }: ReportChartProps) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

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
            <CardTitle>Total Inspections Per Day</CardTitle>
            <CardDescription>Showing Total Inspection Per Day</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm">Page {startIndex / itemsPerPage + 1}</p>
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
          <BarChart
            accessibilityLayer
            data={paginatedData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => format(new Date(value), "d/MM")}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
        <p className="text-center">Date</p>
      </CardContent>
    </Card>
    // <Card>
    //   <CardHeader>
    //     <CardTitle>Inspection Overview</CardTitle>
    //     <CardDescription>
    //       Showing total inspection per day
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <ChartContainer config={chartConfig}>
    //       <BarChart 
    //         accessibilityLayer
    //         data={chartData}
    //         margin={{
    //           left: 12,
    //           right: 12,
    //         }}
    //       >
    //         <CartesianGrid vertical={false} />
    //         <XAxis
    //           dataKey="date"
    //           tickLine={false}
    //           axisLine={false}
    //           tickMargin={8}
    //           tickFormatter={(value) => format(new Date(value), "d/MM")}

    //         />
    //         <ChartTooltip
    //           cursor={false}
    //           content={<ChartTooltipContent indicator="dot" hideLabel />}
    //         />
    //         <Bar
    //           dataKey="total"
    //           type="linear"
    //           fill="var(--color-total)"
    //           fillOpacity={0.4}
    //           stroke="var(--color-total)"
    //         />
    //       </BarChart>
    //     </ChartContainer>
    //   </CardContent>
    // </Card>
  )
}