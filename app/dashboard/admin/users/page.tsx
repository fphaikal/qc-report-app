'use client'

import { useEffect, useState } from "react"
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input"
import { Car, Trash2 } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import AddUserDialog from "@/components/Dialog/AddUser";
import DeleteDialog from "@/components/Dialog/DeleteData";
import UpdateUser from "@/components/Dialog/UpdateUser";

interface Users {
  _id: number;
  username: string;
  fullname: string;
  role: string;
}

export default function Users() {
  const [data, setData] = useState<Users[]>([]);  // pastikan ini adalah array kosong pada awalnya
  const [searchPart, setSearchPart] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/users`, {
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


  const handleDelete = async (_id: number) => {  // pastikan tipe _id adalah string, sesuai dengan tipe yang ada di API
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/users/${_id}`, {
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
        <h1 className="text-3xl font-bold">Users Management</h1>
        <div className="flex gap-4">
          <Input
            type="name"
            placeholder="Search..."
            value={searchPart}
            onChange={(e) => setSearchPart(e.target.value)}
          />
          <AddUserDialog />
        </div>
      </div>
      <div className="space-y-2">
        {data.map((user) => (
          <Card key={user._id} className="flex flex-row justify-between w-full">
            <div className="py-4 px-4 flex flex-col items-start gap-2">
              <CardTitle>{user.username}</CardTitle>
              <div className="flex gap-2 items-center">
                <p className="text-sm text-gray-500">{user.fullname ?? 'No Name'}</p>
                <p className="text-sm text-gray-500">|</p>                
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>
            <div className="py-4 px-4 flex flex-row items-center gap-2">
              <UpdateUser data={user} />
              <DeleteDialog id={user._id} handleDelete={handleDelete} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
