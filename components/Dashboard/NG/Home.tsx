"use client"

import useFetchData from "@/hooks/useFetchData"
import * as React from "react"
import { format } from "date-fns"
import DatePicker from "@/components/Popover/DatePicker"
import { ChartConfig } from "@/components/ui/chart"
import NGTable from "@/components/Table/NG"
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button"
import { NG } from "@/types/NG"
import Loading from "@/components/Loading"

const token = Cookies.get('token')

export default function NGDashboard() {
  const [date, setDate] = React.useState<Date>(); // Pastikan initial state sesuai
  const [urls, setUrls] = React.useState<string[]>([]); // Inisialisasi urls sebagai state

  // Update URLs hanya ketika `date` berubah
  React.useEffect(() => {
    const formatDate = date ? format(date, "y-MM-dd") : "all";
    const newUrls = [
      `${process.env.NEXT_PUBLIC_API_URL}/report/ngData?date=${formatDate}`,
    ];
    setUrls(newUrls); // Update URLs berdasarkan date yang dipilih
  }, [date]);

  const { data, loading, error } = useFetchData(urls);

  const handleReset = () => {
    setDate(undefined)
  }


  const handleDownload = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/ngData/exportExcel?type=all`, {
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
      a.download = "Resume Data NG.xlsx"; // Nama file yang akan didownload
      document.body.appendChild(a);
      a.click(); // Memicu klik agar file terdownload
      a.remove(); // Menghapus elemen <a> setelah selesai

      // Membebaskan URL dari memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };


  if (loading) return (
    <Loading />
  )

  if (error) return (
    <div className="p-10">Error: {error}</div>
  )
  return (
    <div className="flex flex-col gap-5 w-full p-5 md:p-10">
      <div className="flex justify-between items-center ">
        <h1 className="text-3xl font-bold">Resume Data NG</h1>
        <div className="flex items-center gap-2">
          <Button onClick={handleDownload} className=" bg-green-400 hover:bg-green-900 text-white rounded">
            Download Excel
          </Button>
          <DatePicker date={date} setDate={(date) => setDate(date)} handleReset={handleReset} />
        </div>
      </div>
      {/* Chart */}
      {/* <div className="w-full md:w-2/6">
        <CustomerReport chartData={chartData} chartConfig={chartConfig} />
      </div> */}
      <div className="rounded-md border">
        <NGTable data={data[0]} handleDelete={function (_id: number): void {
          throw new Error("Function not implemented.")
        }} />
      </div>
    </div >
  )
}