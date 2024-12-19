'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@nextui-org/react";
import { Pencil, AlertCircle } from "lucide-react"
import { NG } from "@/types/NG"
import Cookies from "js-cookie";
import { getToken } from "@/utils/auth";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface User {
  _id: string;
  username: string;
  role: string;
  fullname: string;
  password: string;
}

export default function UpdateUser({ data }: any) {
  const [selectedReport, setSelectedReport] = useState<User | null>(null); // State untuk menyimpan data yang ingin diedit
  const [editMode, setEditMode] = useState(false); // State untuk mengontrol dialog edit
  const [resErr, setResErr] = useState(''); // State untuk menampilkan error
  const [, setError] = useState('')

  const [month, setMonth] = useState<string>('');      // Tambahkan month
  const [year, setYear] = useState<string>('');        // Tambah


  const handleEdit = (data: User) => {
    setSelectedReport(data); // Simpan data yang ingin diedit ke state
    setEditMode(true); // Tampilkan dialog edit
  };

  const handleUpdateData = async (e: React.FormEvent) => {
    e.preventDefault();

    const { _id, username, role, fullname, password } = selectedReport!;
    console.log(selectedReport)
    try {
const token = getToken();      const res = await fetch(`/api/updateData/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { authorization: token })
        },
        body: JSON.stringify({ _id, username, role, fullname, password }),
      });

      if (res.ok) {
        window.location.reload(); // Refresh halaman setelah sukses
      } else {
        const data = await res.json();
        setResErr(data.message); // Set error jika ada
      }
      if (res.status === 401) {
        localStorage.removeItem("isAuthenticated");
        Cookies.remove("token");
        window.location.reload()
      }

    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <Dialog open={editMode} onOpenChange={setEditMode}>
        <DialogContent className="overflow-y-scroll h-fit">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Edit data user, dan tekan simpan jika sudah selesai</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateData}>
            {resErr && <div className="flex items-center gap-4 p-3 rounded-lg text-white bg-danger border border-red-500 mb-4">
              <AlertCircle />
              <p>{resErr}</p>
            </div>}
            <div className="flex flex-col gap-4">
              <Input
                label="Username"
                labelPlacement="outside"
                value={selectedReport?.username || ''}
                placeholder="Masukkan username"
                onChange={(e) => setSelectedReport({ ...selectedReport!, username: e.target.value })}
              />
              <Input
                label="Fullname"
                labelPlacement="outside"
                value={selectedReport?.fullname || ''}
                placeholder="Masukkan nama lengkap"
                onChange={(e) => setSelectedReport({ ...selectedReport!, fullname: e.target.value })}
              />
              <Input
                label="Password"
                labelPlacement="outside"
                placeholder="Masukkan jumlah password"
                onChange={(e) => setSelectedReport({ ...selectedReport!, password: e.target.value })}
              />
              <div className="flex flex-col gap-2">
                <Label>Role</Label>
                <Select value={selectedReport?.role} onValueChange={(value) => setSelectedReport({ ...selectedReport!, role: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Button onClick={() => handleEdit(data)} className="bg-success text-white rounded-md w-fit p-2">
        <Pencil className="" size={18} />
      </Button>
    </div>
  )
}
