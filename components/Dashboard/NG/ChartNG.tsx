"use client"

import { useEffect, useState } from "react"
import useFetchData from "@/hooks/useFetchData"
import { TrendingUp } from "lucide-react"
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import Loading from "@/components/Loading"
import Error from "@/components/Error"

export const description = "A multiple bar chart"


const chartConfig = {
  Jan: {
    label: "January",
    color: "hsl(205, 72%, 57%)", // Blue
  },
  Feb: {
    label: "February",
    color: "hsl(355, 85%, 65%)", // Red
  },
  Mar: {
    label: "March",
    color: "hsl(120, 65%, 45%)", // Green
  },
  Apr: {
    label: "April",
    color: "hsl(45, 85%, 60%)", // Yellow
  },
  May: {
    label: "May",
    color: "hsl(290, 60%, 70%)", // Purple
  },
  Jun: {
    label: "June",
    color: "hsl(25, 85%, 55%)", // Orange
  },
  Jul: {
    label: "July",
    color: "hsl(210, 75%, 50%)", // Cyan
  },
  Aug: {
    label: "August",
    color: "hsl(60, 70%, 50%)", // Lime
  },
  Sep: {
    label: "September",
    color: "hsl(330, 70%, 60%)", // Pink
  },
  Oct: {
    label: "October",
    color: "hsl(180, 60%, 50%)", // Teal
  },
  Nov: {
    label: "November",
    color: "hsl(25, 75%, 50%)", // Golden Orange
  },
  Dec: {
    label: "December",
    color: "hsl(0, 100%, 50%)", // Bright Red
  },
} satisfies ChartConfig;


export default function Component() {
  const [urls, setUrls] = useState<string[]>([]); // Inisialisasi urls sebagai state

  useEffect(() => {
    const newUrls = [
      `${process.env.NEXT_PUBLIC_API_URL}/report/ngData/chartData?type=pcs`,
      `${process.env.NEXT_PUBLIC_API_URL}/report/ngData/chartData?type=persen`
    ];

    setUrls(newUrls); // Update URLs berdasarkan date yang dipilih
  }, []);

  const { data, loading, error } = useFetchData(urls);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <div className="flex flex-col gap-5 w-full p-5 md:p-10 min-h-screen">
      <h1 className="text-3xl font-bold">Chart NG</h1>
      <div className="w-full h-fit">
        <Card>
          <CardHeader>
            <CardTitle>NG (pcs)</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
              <BarChart accessibilityLayer data={data[0]}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="customer"
                  tickLine={false}
                  tickMargin={2}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="Jan" fill="var(--color-Jan)" radius={4} />
                <Bar dataKey="Feb" fill="var(--color-Feb)" radius={4} />
                <Bar dataKey="Mar" fill="var(--color-Mar)" radius={4} />
                <Bar dataKey="Apr" fill="var(--color-Apr)" radius={4} />
                <Bar dataKey="May" fill="var(--color-May)" radius={4} />
                <Bar dataKey="Jun" fill="var(--color-Jun)" radius={4} />
                <Bar dataKey="Jul" fill="var(--color-Jul)" radius={4} />
                <Bar dataKey="Aug" fill="var(--color-Aug)" radius={4} />
                <Bar dataKey="Sep" fill="var(--color-Sep)" radius={4} />
                <Bar dataKey="Oct" fill="var(--color-Oct)" radius={4} />
                <Bar dataKey="Nov" fill="var(--color-Nov)" radius={4} />
                <Bar dataKey="Dec" fill="var(--color-Dec)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="w-full h-fit">
        <Card>
          <CardHeader>
            <CardTitle>NG (persen)</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
              <BarChart accessibilityLayer data={data[1]}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="customer"
                  tickLine={false}
                  tickMargin={2}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="Jan" fill="var(--color-Jan)" radius={4} />
                <Bar dataKey="Feb" fill="var(--color-Feb)" radius={4} />
                <Bar dataKey="Mar" fill="var(--color-Mar)" radius={4} />
                <Bar dataKey="Apr" fill="var(--color-Apr)" radius={4} />
                <Bar dataKey="May" fill="var(--color-May)" radius={4} />
                <Bar dataKey="Jun" fill="var(--color-Jun)" radius={4} />
                <Bar dataKey="Jul" fill="var(--color-Jul)" radius={4} />
                <Bar dataKey="Aug" fill="var(--color-Aug)" radius={4} />
                <Bar dataKey="Sep" fill="var(--color-Sep)" radius={4} />
                <Bar dataKey="Oct" fill="var(--color-Oct)" radius={4} />
                <Bar dataKey="Nov" fill="var(--color-Nov)" radius={4} />
                <Bar dataKey="Dec" fill="var(--color-Dec)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent> 
        </Card>
      </div>
    </div>
  )
}
