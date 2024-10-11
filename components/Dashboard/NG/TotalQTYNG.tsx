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

interface TypeNG {
  part_name: string;
  type_ng: string;
  month: {
    month: string; value: [
      { prod: number, ng: number, percent: number }
    ]
  }[];
  customer: string;
}

const months = Array.from({ length: 12 }, (_, i) => i + 1); // Array [1, 2, ..., 12]
const headers = ["Prod", "NG", "%"];

const datas = [
  {
    part_name: "Part 1",
    customer: "Customer 1",
    months: [
      {
        month: "1", value: [
          { prod: 100, ng: 10, percent: 10 },
        ]
      },
      {
        month: "2", value: [
          { prod: 100, ng: 10, percent: 10 },
        ]
      },
      
    ],
  }
]

export default function NGReport() {
  const [data, setData] = useState<TypeNG[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/ngData/chartData?type=ng`);
        if (!res.ok) return 'Network response was not ok';
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

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="flex flex-col gap-5 w-full p-5 md:p-10 min-h-screen">
      <div className="rounded-md border overflow-auto">
        <Table className="min-w-[2500px]"> {/* Setting min width untuk memastikan tabel tidak berdempetan */}
          <TableHeader>
            <TableRow>
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
            {datas.map((result) => (
              <TableRow key={result.part_name}>
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
