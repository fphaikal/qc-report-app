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
import Cookies from "js-cookie";

const token = Cookies.get('token')

interface TypeNG {
  part_name: string;
  type_ng: string;
  month: { month: string; value: number }[];
}

export default function NGReport() {
  const [data, setData] = useState<TypeNG[]>([]); // Add the missing type annotation for the useState hook.
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/ngData/tableData?type=ng`, {
          headers: token ? { authorization: token } : {}
        });
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
      <h1 className="text-3xl font-bold">Data Jenis NG</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead rowSpan={2} className="w-[200px]">Part Name</TableHead>
              <TableHead rowSpan={2} className="w-[200px]">Jenis NG</TableHead>
              <TableHead colSpan={12} className="text-center">DATA NG BERDASARKAN JENIS</TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="text-center w-fit">1</TableHead>
              <TableHead className="text-center w-fit">2</TableHead>
              <TableHead className="text-center w-fit">3</TableHead>
              <TableHead className="text-center w-fit">4</TableHead>
              <TableHead className="text-center w-fit">5</TableHead>
              <TableHead className="text-center w-fit">6</TableHead>
              <TableHead className="text-center w-fit">7</TableHead>
              <TableHead className="text-center w-fit">8</TableHead>
              <TableHead className="text-center w-fit">9</TableHead>
              <TableHead className="text-center w-fit">10</TableHead>
              <TableHead className="text-center w-fit">11</TableHead>
              <TableHead className="text-center w-fit">12</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((result) => (
              <TableRow key={result.part_name}>
                <TableCell className="font-medium">{result.part_name}</TableCell>
                <TableCell>{result.type_ng}</TableCell>
                {result.month?.map((month) => (
                  <TableCell key={month.month} className="text-center">{month.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
