"use client"

import useFetchData from "@/hooks/useFetchData"
import * as React from "react"
import { format } from "date-fns"
import DatePicker from "@/components/Popover/DatePicker"
import IPRTable from "@/components/Table/IPR"

export default function IPRDashboard() {
  const [date, setDate] = React.useState<Date>(); // Pastikan initial state sesuai
  const [urls, setUrls] = React.useState<string[]>([]); // Inisialisasi urls sebagai state

  // Update URLs hanya ketika `date` berubah
  React.useEffect(() => {
    const formatDate = date ? format(date, "y-MM-dd") : "all";
    const newUrls = [
      `${process.env.NEXT_PUBLIC_API_URL}/report/ipr?date=${formatDate}`,
    ];
    setUrls(newUrls); // Update URLs berdasarkan date yang dipilih
  }, [date]);

  const { data, loading, error } = useFetchData(urls);

  const handleReset = () => {
    setDate(undefined)
  }

  // const chartData = data[1] && data[1].map((report) => ({
  //   date: report.created_at,
  //   total: report.total,
  // }))

  // const chartConfig = {
  //   total: {
  //     label: "Total",
  //     color: "hsl(133.78, 52.86%, 72.55%)",
  //   },
  //   target: {
  //     label: "Target",
  //     color: "hsl(211.78, 52.86%, 72.55%)",
  //   },
  // } satisfies ChartConfig;


  if (loading) return (
    <div className="p-10">Loading...</div>
  )

  if (error) return (
    <div className="p-10">Error: {error}</div>
  )
  return (
    <div className="flex flex-col gap-5 w-full p-5 md:p-10">
      {/* Chart */}
      {/* <div className="w-full md:w-2/6">
        <ReportChart chartData={chartData} chartConfig={chartConfig} />
      </div> */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Internal Problem Report</h1>
        <DatePicker date={date} setDate={(date) => setDate(date)} handleReset={handleReset} />
      </div>
      <div className="rounded-md border">
        <IPRTable data={data[0]} handleDelete={function (id: number): void {
          throw new Error("Function not implemented.")
        }} />
      </div>
    </div >
  )
}