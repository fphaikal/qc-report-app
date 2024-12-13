"use client"

import useFetchData from "@/hooks/useFetchData"
import * as React from "react"
import { format } from "date-fns"
import DatePicker from "@/components/Popover/DatePicker"
import NCRTable from "@/components/Table/NCR"
import CustomerReport from "@/components/Chart/CustomerReport"
import { ChartConfig } from "@/components/ui/chart"
import Loading from "@/components/Loading"

export default function NCRDashboard() {
  const [date, setDate] = React.useState<Date>(); // Pastikan initial state sesuai
  const [urls, setUrls] = React.useState<string[]>([]); // Inisialisasi urls sebagai state

  // Update URLs hanya ketika `date` berubah
  React.useEffect(() => {
    const formatDate = date ? format(date, "y-MM-dd") : "all";
    const newUrls = [
      `${process.env.NEXT_PUBLIC_API_URL}/report/ncr?date=${formatDate}`,
      `${process.env.NEXT_PUBLIC_API_URL}/report/ncr/chartData?type=customer`
    ];
    setUrls(newUrls); // Update URLs berdasarkan date yang dipilih
  }, [date]);

  const { data, loading, error } = useFetchData(urls);

  const handleReset = () => {
    setDate(undefined)
  }

  const chartData = data[1] && data[1].map((report) => ({
    customer: report.customer,
    value: report.value,
  }))

  const chartConfig = {
    customer: {
      label: "Customer",
      color: "hsl(133.78, 52.86%, 72.55%)",
    },
    value: {
      label: "Value",
      color: "hsl(145.96,79.46%,43.92%)",
    },  
  } satisfies ChartConfig;


  if (loading) return (
    <Loading />
  )

  if (error) return (
    <div className="p-10">Error: {error}</div>
  )
  return (
    <div className="flex flex-col gap-5 w-full p-5 md:p-10">
      <div className="flex justify-between items-center ">
        <h1 className="text-3xl font-bold">Non Conformity Report</h1>
        <DatePicker date={date} setDate={(date) => setDate(date)} handleReset={handleReset} />
      </div>
      {/* Chart */}
      <div className="w-full md:w-2/6">
        <CustomerReport chartData={chartData} chartConfig={chartConfig} />
      </div>
      <div className="rounded-md border">
        <NCRTable data={data[0]} handleDelete={function (_id: number): void {
          throw new Error("Function not implemented.")
        }} />
      </div>
    </div >
  )
}