'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@nextui-org/react";
import { Pencil, AlertCircle } from "lucide-react"
import { NG } from "@/types/NG"
import Cookies from "js-cookie";

interface UpdateNgDataProps {
  data: NG;
}

export default function UpdateProd({ data }: any) {
  const [selectedReport, setSelectedReport] = useState<NG | null>(null); // State untuk menyimpan data yang ingin diedit
  const [editMode, setEditMode] = useState(false); // State untuk mengontrol dialog edit
  const [resErr, setResErr] = useState(''); // State untuk menampilkan error
  const [, setError] = useState('')

  const [month, setMonth] = useState<string>('');      // Tambahkan month
  const [year, setYear] = useState<string>('');        // Tambah


  const handleEdit = (data: NG) => {
    setSelectedReport(data); // Simpan data yang ingin diedit ke state
    setEditMode(true); // Tampilkan dialog edit
  };

  const handleUpdateData = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id, newProd } = selectedReport!;
    console.log(selectedReport)
    try {
      const token = Cookies.get('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/ngData?type=totalNg`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { authorization: token })
        },
        body: JSON.stringify({ id, newProd, month, year }),
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
      <Dialog open={editMode} onOpenChange={setEditMode}>
        <DialogContent className="min-w-fit overflow-y-scroll h-fit">
          <DialogHeader>
            <DialogTitle>{selectedReport?.part_name || ''} - {selectedReport?.customer || ''}</DialogTitle>
            <DialogDescription>Edit data produksi, dan tekan simpan jika sudah selesai</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateData}>
            {resErr && <div className="flex items-center gap-4 p-3 rounded-lg text-white bg-red-500 border border-red-500 mb-4">
              <AlertCircle />
              <p>{resErr}</p>
            </div>}
            <div className="flex flex-col gap-4">
              <Input
                label="Produksi"
                labelPlacement="outside"
                placeholder="Masukkan jumlah produksi"
                onChange={(e) => setSelectedReport({ ...selectedReport!, newProd: +e.target.value })}
              />
              <div className="flex gap-4">
                <Input
                  isRequired
                  label="Month"
                  labelPlacement="outside"
                  type="number"
                  
                  placeholder="Masukkan data month"
                  onChange={(e) => setMonth(e.target.value)}
                />
                <Input
                  isRequired
                  label="Year"
                  labelPlacement="outside"
                  placeholder="Masukkan data year"
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Button onClick={() => handleEdit(data)} className="bg-green-500 text-white rounded-md w-fit p-2">
        <Pencil className="" size={18} />
      </Button>
    </div>
  )
}
