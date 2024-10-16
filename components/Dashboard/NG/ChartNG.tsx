"use client"

import { useEffect, useState } from "react"
import useFetchData from "@/hooks/useFetchData"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart } from "recharts"
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
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie";

const token = Cookies.get('token')

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

const handleDownload = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/ngData/exportExcel?type=pcs`, {
      method: "GET",
      headers: token ? {
        authorization: token, "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      } : {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    });

    if (!response.ok) {
      return ("Failed to download file");
    }

    const blob = await response.blob(); // Mengubah response menjadi Blob (binary data)
    const url = window.URL.createObjectURL(blob); // Membuat URL dari Blob

    // Membuat elemen <a> untuk mendownload file
    const a = document.createElement("a");
    a.href = url;
    a.download = "data-ng.xlsx"; // Nama file yang akan didownload
    document.body.appendChild(a);
    a.click(); // Memicu klik agar file terdownload
    a.remove(); // Menghapus elemen <a> setelah selesai

    // Membebaskan URL dari memory
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};

export default function Component() {
  const [urls, setUrls] = useState<string[]>([]); // Inisialisasi urls sebagai state

  useEffect(() => {
    const newUrls = [
      `${process.env.NEXT_PUBLIC_API_URL}/report/ngData/chartData?type=pcs`,
      `${process.env.NEXT_PUBLIC_API_URL}/report/ngData/chartData?type=persen`,
      `${process.env.NEXT_PUBLIC_API_URL}/report/ngData/chartData?type=monthly`
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>NG (pcs)</CardTitle>
            <Button onClick={handleDownload} className="bg-green-400 hover:bg-green-900 text-white rounded">
              Download Excel
            </Button>
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
      {/* <div className="w-full h-fit">
        <Card>
          <CardHeader>
            <CardTitle>NG (pcs)</CardTitle>
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
      </div> */}

      <div className="grid grid-cols-3 gap-3">
        {data[2].map(data => (
          <Card className="flex flex-col w-full" key={data.month}>
            <CardHeader className="items-center pb-0">
              <CardTitle>Persentase Internal Report NG {data.month}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0 w-full">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square pb-0 [&_.recharts-pie-label-text]:fill-foreground"
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie data={data.data} dataKey="percent" label nameKey="customer" />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
