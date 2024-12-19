'use client'

import { useEffect, useState } from "react"
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { Card } from "@nextui-org/react";
import React from "react";
import Cookies from "js-cookie";
import { getToken } from "@/utils/auth";
import { Input } from "@/components/ui/input"
import AddAnnouncementDialog from "@/components/Dialog/AddAnnouncement";
import { Trash2 } from "lucide-react";
import UpdateAnnouncement from "@/components/Dialog/UpdateAnnouncement";
import { CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

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
      const token = getToken(); 
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/announcement?date=all`, {
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
            placeholder="Search..."
            value={searchPart}
            onChange={(e) => setSearchPart(e.target.value)}
          />
          <AddAnnouncementDialog />
        </div>
      </div>
      <div className="space-y-6">
        {data.map((announcement) => (
          <Card key={announcement._id} className="flex flex-row items-center w-full">
            <div className="w-24 flex-shrink-0 border-r border-gray-200 p-4 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold">{format(new Date(announcement.created_at), 'd')}</div>
              <div className="text-sm uppercase">{format(new Date(announcement.created_at), 'MMM yyyy')}</div>
            </div>
            <div className="flex flex-col gap-1 justify-center px-3 w-full">
              <CardTitle>{announcement.title}</CardTitle>
              <p className="text-sm text-gray-600 ">{announcement.content}</p>
              <p className="text-xs text-gray-400">Author: {announcement.author}</p>
            </div>
            <div className="flex justify-end gap-2 w-full px-5">
              <UpdateAnnouncement data={announcement} />
              <button onClick={() => handleDelete(announcement._id)} className="flex aspect-auto size-10 items-center justify-center rounded-xl bg-danger text-sidebar-primary-foreground">
                <Trash2 size={20} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
