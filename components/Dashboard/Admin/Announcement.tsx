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
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input"
import AddAnnouncementDialog from "@/components/Dialog/AddAnnouncement";


interface Part {
  _id: number;
  part: string;
  customer: string;
}

export default function Announcement() {
  const [data, setData] = useState<[]>([]);
  const [searchPart, setSearchPart] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/announcement`, {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/announcement/${_id}`, {
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

  // const filteredData = data.filter((part) =>
  //   part.part?.toLowerCase().includes(searchPart.toLowerCase())
  // )

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="flex flex-col gap-5 w-full p-5 md:p-10 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Announcement</h1>
        <div className="flex gap-4">
          <Input
            type="name"
            placeholder="Search Name"
            value={searchPart}
            onChange={(e) => setSearchPart(e.target.value)}
          />
          <AddAnnouncementDialog />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {data.map((info) => (
          <div className="flex justify-between">
            test
          </div>
        ))  }
      </div>
    </div>
  );
}
