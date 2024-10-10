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

export default function CustomerReport({ chartData, chartConfig }: ReportChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Report</CardTitle>
        <CardDescription>
          Showing customer report
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
              dataKey="customer"
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
              fill="var(--color-report)"
              fillOpacity={0.4}
              stroke="var(--color-report)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}