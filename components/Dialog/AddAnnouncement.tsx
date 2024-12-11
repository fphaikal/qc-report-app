'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@nextui-org/react";
import { Pencil, AlertCircle } from "lucide-react"
import Cookies from "js-cookie";

export default function AddAnnouncementDialog() {
  const [resErr, setResErr] = useState(''); // State untuk menampilkan error
  const [, setError] = useState('')

  const [title, setTitle] = useState<string>('');  
  const [content, setContent] = useState<string>('');  
  const [date, setDate] = useState<string>('');

  const handleAddData = async (e: React.FormEvent) => {
    e.preventDefault();
    const author = localStorage.getItem('username')

    try {
      const token = Cookies.get('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/announcement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { authorization: token })
        },
        body: JSON.stringify({ title, content, author }),
      });

      if (res.ok) {
        window.location.reload(); // Refresh halaman setelah sukses
      } else {
        const data = await res.json();
        setResErr(data.message); // Set error jika ada
      }
      if (res.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        Cookies.remove("token");
        window.location.reload()
      }

    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-fit">+ Tambah Data</Button>
        </DialogTrigger>
        <DialogContent className="h-fit">
          <DialogHeader>
            <DialogTitle>Tambah Announcement</DialogTitle>
            <DialogDescription>Tambah Announcement, dan tekan simpan jika sudah selesai</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddData}>
            {resErr && <div className="flex items-center gap-4 p-3 rounded-lg text-white bg-red-500 border border-red-500 mb-4">
              <AlertCircle />
              <p>{resErr}</p>
            </div>}
            <div className="flex flex-col gap-4">
              <Input
                label="Judul"
                labelPlacement="outside"
                placeholder="Masukkan judul"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                label="Content"
                labelPlacement="outside"
                placeholder="Masukkan content"
                onChange={(e) => setContent(e.target.value)}
              />

              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
