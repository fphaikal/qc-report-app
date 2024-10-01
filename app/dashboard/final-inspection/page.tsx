"use client"

import useFetchData from "@/hooks/useFetchData"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const TableHeadName = [
  {
    accessorKey: "operator",
    header: "Operator"
  },
  {
    accessorKey: "name-part",
    header: "Name Part"
  },
  {
    accessorKey: "process",
    header: "Process"
  },
  {
    accessorKey: "target",
    header: "Target"
  },
  {
    accessorKey: "start",
    header: "Start"
  },
  {
    accessorKey: "end",
    header: "End"
  },
  {
    accessorKey: "total",
    header: "Total"
  },
  {
    accessorKey: "persen",
    header: "Persen"
  },
  {
    accessorKey: "ng",
    header: "NG"
  },
  {
    accessorKey: "jenis-ng",
    header: "Jenis NG"
  },
]



export default function FinalInspectionDashboard() {
  const [date, setDate] = React.useState<Date>()
  const formatDate = date ? format(date, "y-MM-dd") : "all"

  const urls = [
    `http://localhost:2025/api/report/final-inspection?date=${formatDate}`,
    `http://localhost:2025/api/report/final-inspection/chartData`,
  ];
  const { data, loading, error } = useFetchData(urls);

  const handleReset = () => {
    setDate(undefined)
  }

  const chartData = data[1] && data[1].map((report) => ({
    date: report.inspection_date,
    total: report.total,
  }))

  const chartConfig = {
    total: {
      label: "Total",
      color: "hsl(133.78, 52.86%, 72.55%)",
    },
    target: {
      label: "Target",
      color: "hsl(211.78, 52.86%, 72.55%)",
    },
  } satisfies ChartConfig;

  if (loading) return (
    <div className="p-10">Loading...</div>
  )

  if (error) return (
    <div className="p-10">Error: {error}</div>
  )
  return (
    <div className="flex flex-col gap-5 w-full p-10">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
          <div className="rounded-md border">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
          {date && <Button onClick={handleReset}>Reset</Button>}
        </PopoverContent>
      </Popover>
      <div className="w-2/6">
      {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Inspection Overview</CardTitle>
            <CardDescription>
              Showing total inspection per day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => format(new Date(value), "d")}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" hideLabel />}
                />
                <Area
                  dataKey="total"
                  type="linear"
                  fill="var(--color-total)"
                  fillOpacity={0.4}
                  stroke="var(--color-total)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      {
        data && data.length >> 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {TableHeadName.map((name) => (
                    <TableHead key={name.accessorKey}>
                      {name.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data[0].map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.operator}</TableCell>
                    <TableCell>{report.name_part}</TableCell>
                    <TableCell>{report.process}</TableCell>
                    <TableCell>{report.target}</TableCell>
                    <TableCell>{format(report.start, "y-MM-dd k:mm")}</TableCell>
                    <TableCell>{format(report.end, "y-MM-dd kk:mm")}</TableCell>
                    <TableCell>{report.total}</TableCell>
                    <TableCell>{report.persen}%</TableCell>
                    <TableCell>{report.ng}</TableCell>
                    <TableCell>{report.type_ng}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {TableHeadName.map((name) => (
                    <TableHead key={name.accessorKey}>{name.header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableCell colSpan={TableHeadName.length} className="h-24 text-center">
                  No Data available for this date.
                </TableCell>
              </TableBody>
            </Table>
          </div>
        )
      }
    </div >
  )
}