'use client'

import { useEffect, useState } from "react"
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import React from "react";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input"
import AddAnnouncementDialog from "@/components/Dialog/AddAnnouncement";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { Calendar, Ellipsis, User } from "lucide-react";
import UpdateAnnouncement from "@/components/Dialog/UpdateAnnouncement";

interface Announcement {
  _id: string;
  title: string;
  content: string;
  created_at: string;
  author: string;
}

export default function Announcement() {
  const [data, setData] = useState<Announcement[]>([]);  // pastikan ini adalah array kosong pada awalnya
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
      } else {
        const result = await res.json();
        setData(result.data)  // pastikan result.data adalah array
      }
      setLoading(false)
    }
    fetchData()
  }, [])


  const handleDelete = async (_id: string) => {  // pastikan tipe _id adalah string, sesuai dengan tipe yang ada di API
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
      <div className="grid grid-cols-4 gap-4">
        
      </div>
    </div>
  );
}
