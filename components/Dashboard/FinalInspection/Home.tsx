"use client"

import useFetchData from "@/hooks/useFetchData"
import * as React from "react"
import { format } from "date-fns"
import { CircleAlert } from "lucide-react"
import { ChartConfig } from "@/components/ui/chart"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ReportTable from "@/components/Table/FI"
import ReportChart from "@/components/Chart/ReportChart"
import DatePicker from "@/components/Popover/DatePicker"
import AverageChart from "@/components/Chart/AverageChart"
import NamePartChart from "@/components/Chart/NamePartChart"

export default function FinalInspectionDashboard() {
  const [date, setDate] = React.useState<Date>(); // Pastikan initial state sesuai
  const [urls, setUrls] = React.useState<string[]>([]); // Inisialisasi urls sebagai state

  // Update URLs hanya ketika `date` berubah
  React.useEffect(() => {
    const formatDate = date ? format(date, "y-MM-dd") : "all";
    const newUrls = [
      `${process.env.NEXT_PUBLIC_API_URL}/report/final-inspection?date=${formatDate}`,
      `${process.env.NEXT_PUBLIC_API_URL}/report/final-inspection/chartData?type=daily`,
      `${process.env.NEXT_PUBLIC_API_URL}/report/final-inspection/chartData?type=operator`,
      `${process.env.NEXT_PUBLIC_API_URL}/report/final-inspection/chartData?type=namePart`,
    ];
    setUrls(newUrls); // Update URLs berdasarkan date yang dipilih
  }, [date]);

  const { data, loading, error } = useFetchData(urls);

  const handleReset = () => {
    setDate(undefined)
  }

  const reportChart = data[1] && data[1].map((report) => ({
    date: report.inspection_date,
    total: report.total,
  }))

  const reportChartConfig = {
    total: {
      label: "Total",
      color: "hsl(133.78, 52.86%, 72.55%)",
    },
    target: {
      label: "Target",
      color: "hsl(211.78, 52.86%, 72.55%)",
    },
  } satisfies ChartConfig;

  const averageChart = data[2] && data[2].map((report) => ({
    name: report.operator,
    value: report.value,
  }))

  const averageChartConfig = {
    value: {
      label: "Value",
      color: "hsl(133.78, 52.86%, 72.55%)",
    },
  } satisfies ChartConfig;

  const namePartChart = data[3] && data[3].map((report) => ({
    name: report.name_part,
    target: report.target,
    actual: report.actual,
  }))

  const namePartChartConfig = {
    target: {
      label: "Target",
      color: "hsl(0, 100%, 50%)",
    },
    actual: {
      label: "Actual",
      color: "hsl(133.78, 52.86%, 72.55%)",
    },
  } satisfies ChartConfig;


  if (loading) return (
    <div className="p-10">Loading...</div>
  )
  0.
  if (error) return (
    <div className="p-10">Error: {error}</div>
  )
  return (
    <div className="flex flex-col gap-5 w-full p-5 md:p-10">
      <Alert className="bg-red-500 text-white">
        <CircleAlert className="w-4 h-4" color="white" />
        <AlertTitle>PENGUMUMAN</AlertTitle>
        <AlertDescription>
          Permintaan terbaru dari PT. TTEC
        </AlertDescription>
      </Alert>
      <div className="flex flex-col gap-4">
        {/* Chart */}
        <div className="w-full">
          <NamePartChart chartData={namePartChart} chartConfig={namePartChartConfig} />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <ReportChart chartData={reportChart} chartConfig={reportChartConfig} />
          </div>
          <div className="w-full md:w-1/2">
            <AverageChart chartData={averageChart} chartConfig={averageChartConfig} />
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <DatePicker date={date} setDate={(date) => setDate(date)} handleReset={handleReset} />
      </div>
      <div className="rounded-md border">
        <ReportTable data={data[0]} handleEdit={function (id: number): void {
          throw new Error("Function not implemented.")
        }} handleDelete={function (id: number): void {
          throw new Error("Function not implemented.")
        }} />
      </div>
    </div >
  )
}