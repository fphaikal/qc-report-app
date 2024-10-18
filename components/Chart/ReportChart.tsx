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

export default function ReportChart({ chartData, chartConfig }: ReportChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Inspections Per Day</CardTitle>
        <CardDescription>Showing Total Inspection Per Day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
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
              content={<ChartTooltipContent hideLabel />}
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