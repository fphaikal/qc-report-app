import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function AverageChart({ chartData, chartConfig }: ReportChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Inspection Today</CardTitle>
        <CardDescription>
          Showing average inspection today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Bar
              dataKey="value"
              type="linear"
              fill="var(--color-value)"
              fillOpacity={0.4}
              stroke="var(--color-value)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}