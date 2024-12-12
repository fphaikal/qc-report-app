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
import AddPartDialog from "@/components/Dialog/AddPart";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input"
import DeleteDialog from "@/components/Dialog/DeleteData";


interface Part {
  _id: number;
  part: string;
  customer: string;
}

export default function NGReport() {
  const [data, setData] = useState<Part[]>([]);
  const [searchPart, setSearchPart] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/parts`, {
        method: "GET",
        headers: token ? { authorization: token } : {},
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.message)
      }
      const result = await res.json();
      setData(result.data)
      setLoading(false)

      console.log(result)
    }
    fetchData()
  }, [])

  const handleDelete = async (_id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/parts/${_id}`, {
        method: "DELETE"
      })

      if (!res.ok) {
        return res;
      } else {
        window.location.reload()
      }
    } catch (error) {
      return error
    }
  }

  const filteredData = data.filter((part) => 
  
    part.part?.toLowerCase().includes(searchPart.toLowerCase())
  )

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="flex flex-col gap-5 w-full p-5 md:p-10 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">List Parts</h1>
        <div className="flex gap-4">
          <Input 
            type="name" 
            placeholder="Search Name"
            value={searchPart}
            onChange={(e) => setSearchPart(e.target.value)}
          />
          <AddPartDialog />
        </div>  
      </div>
      <div className="rounded-md border">
        <Table> {/* Setting min width untuk memastikan tabel tidak berdempetan */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Part Name</TableHead>
              <TableHead className="w-[200px]">Customer</TableHead>
              <TableHead className="w-[200px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((result) => (
              <TableRow key={result._id}>
                <TableCell className="font-medium">{result.part}</TableCell>
                <TableCell className="font-medium">{result.customer}</TableCell>
                <TableCell>
                  <DeleteDialog id={result._id} handleDelete={handleDelete} />
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </div>
    </div>
  );
}
