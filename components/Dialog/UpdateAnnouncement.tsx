'use client'

import { useState } from "react"
import { Button } from "@nextui-org/react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@nextui-org/react";
import { Pencil, AlertCircle } from "lucide-react"
import { NG } from "@/types/NG"
import Cookies from "js-cookie";
import { getToken } from "@/utils/auth";

interface Announcement {
  _id: string;
  title: string;
  content: string;
  created_at: string;
  author: string;
}


export default function UpdateAnnouncement({ data }: any) {
  const [selectedReport, setSelectedReport] = useState<Announcement | null>(null); // State untuk menyimpan data yang ingin diedit
  const [editMode, setEditMode] = useState(false); // State untuk mengontrol dialog edit
  const [resErr, setResErr] = useState(''); // State untuk menampilkan error
  const [, setError] = useState('')

  const [month, setMonth] = useState<string>('');      // Tambahkan month
  const [year, setYear] = useState<string>('');        // Tambah


  const handleEdit = (data: Announcement) => {
    setSelectedReport(data); // Simpan data yang ingin diedit ke state
    setEditMode(true); // Tampilkan dialog edit
  };

  const handleUpdateData = async (e: React.FormEvent) => {
    e.preventDefault();

    const { _id, title, content } = selectedReport!;
    console.log(selectedReport)
    try {
const token = getToken();      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/announcement/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { authorization: token })
        },
        body: JSON.stringify({ _id, title, content }),
      });

      if (res.status === 200) {
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
        <DialogContent className="overflow-y-auto h-fit">
          <DialogHeader>
            <DialogTitle>{selectedReport?.title || ''}</DialogTitle>
            <DialogDescription>Edit data announcement, dan tekan simpan jika sudah selesai</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateData}>
            {resErr && <div className="flex items-center gap-4 p-3 rounded-lg text-white bg-danger border border-red-500 mb-4">
              <AlertCircle />
              <p>{resErr}</p>
            </div>}
            <div className="flex flex-col gap-4">
              <Input
                label="Judul"
                labelPlacement="outside"
                placeholder="Masukkan judul"
                value={selectedReport?.title || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, title: e.target.value })}
              />
              <Input
                label="Content"
                labelPlacement="outside"
                placeholder="Masukkan content"
                value={selectedReport?.content || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, content: e.target.value })}
              />
              <Button className="bg-zinc-950 text-white" type="submit">Simpan</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <button onClick={() => handleEdit(data)} className="flex aspect-auto size-10 items-center justify-center rounded-xl bg-success text-white">
        <Pencil className="" size={18} />
      </button>
    </div>
  )
}
