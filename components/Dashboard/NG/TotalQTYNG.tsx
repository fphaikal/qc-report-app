'use client'

import { useEffect, useState } from "react"
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import UpdateProd from "@/components/Dialog/UpdateProd";

const token = Cookies.get('token')

interface TypeNG {
  _id: number;
  part_name: string;
  customer: string;
  months: {
    month: string; value: [
      { prod: number, ng: number, percent: number }
    ]
  }[];
  // Add other properties as needed
}

const months = Array.from({ length: 12 }, (_, i) => i + 1); // Array [1, 2, ..., 12]
const headers = ["Prod", "NG", "%"];

export default function NGReport() {
  const [data, setData] = useState<TypeNG[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/ngData/tableData?type=totalQtyNg`,
          { headers: token ? { authorization: token } : {} }
        );
        if (!res.ok) return 'Network response was not ok';
        if (res.status === 401) {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("username");
          localStorage.removeItem("role");
          Cookies.remove("token");
          window.location.reload()
        }
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        setError('Error: ' + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/ngData/exportExcel?type=totalQtyNg`, {
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
      a.download = "Total Qty NG.xlsx"; // Nama file yang akan didownload
      document.body.appendChild(a);
      a.click(); // Memicu klik agar file terdownload
      a.remove(); // Menghapus elemen <a> setelah selesai

      // Membebaskan URL dari memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="flex flex-col gap-5 w-full p-5 md:p-10 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Total QTY NG</h1>
        <Button onClick={handleDownload} className="bg-green-400 hover:bg-green-900 text-white rounded">
          Download Excel
        </Button>
      </div>
      <div className="rounded-md border overflow-x-visible ">
        <Table className="min-w-[2500px]"> {/* Setting min width untuk memastikan tabel tidak berdempetan */}
          <TableHeader>
            <TableRow>
              <TableHead rowSpan={2} className="w-fit"></TableHead>
              <TableHead rowSpan={2} className="w-[200px]">Part Name</TableHead>
              <TableHead rowSpan={2} className="w-[200px]">Customer</TableHead>
              {months.map((month) => (
                <TableHead key={month} colSpan={3} className="text-center">{month}</TableHead>
              ))}
            </TableRow>
            <TableRow>
              {months.map((month) =>
                headers.map((header) => (
                  <TableHead key={`${month}-${header}`} className="text-center w-fit">
                    {header}
                  </TableHead>
                ))
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((result) => (
              <TableRow key={result._id}>
                <TableCell className="font-medium">
                  <UpdateProd data={result} />
                </TableCell>
                <TableCell className="font-medium">{result.part_name}</TableCell>
                <TableCell>{result.customer}</TableCell>
                {result.months.map((month) => (
                  month.value.map((value) => (
                    <>
                      <TableCell className="text-center">{value.prod}</TableCell>
                      <TableCell className="text-center">{value.ng}</TableCell>
                      <TableCell className="text-center">{value.percent}</TableCell>
                    </>

                  ))
                ))}
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </div>
    </div>
  );
}
