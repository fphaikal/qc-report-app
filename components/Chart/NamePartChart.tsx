"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function NamePartChart({ chartData, chartConfig }: ReportChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Target vs Actual Per Part (Yesterday)</CardTitle>
        <CardDescription>Showing target vs actual per part</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name_part"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={false}
              defaultIndex={1}
            />            
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
    // <Card>
    //   <CardHeader>
    //     <CardTitle>Target vs Actual Per Part</CardTitle>
    //     <CardDescription>Showing target vs actual per part</CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <ChartContainer config={chartConfig}>
    //       <BarChart accessibilityLayer data={chartData}>
    //         <CartesianGrid vertical={false} />
    //         <XAxis
    //           dataKey="name"
    //           tickLine={false}
    //           tickMargin={10}
    //           axisLine={false}
    //         />
    //         <ChartTooltip
    //           cursor={false}
    //           content={<ChartTooltipContent indicator="dashed" />}
    //         />
    //         <Bar dataKey="target" fill="var(--color-target)" radius={4} />
    //         <Bar dataKey="actual" fill="var(--color-actual)" radius={4} />
    //       </BarChart>
    //     </ChartContainer>
    //     <p className="text-center">Name Part</p>
    //   </CardContent>
    // </Card>
  )
}
