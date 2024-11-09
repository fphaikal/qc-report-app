'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@nextui-org/react";
import { DateInput } from "@nextui-org/react";
import { parseDateTime, ZonedDateTime, toZoned, now } from "@internationalized/date";
import { Pencil } from "lucide-react"
import {Textarea} from "@nextui-org/input";
import Cookies from "js-cookie";

interface UpdateFIProps {
  data: Report;
}

export default function UpdateFI({ data }: UpdateFIProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null); // State untuk menyimpan data yang ingin diedit
  const [editMode, setEditMode] = useState(false); // State untuk mengontrol dialog edit
  const [resErr, setResErr] = useState(''); // State untuk menampilkan error
  const [, setError] = useState('')

  const handleEdit = (data: Report) => {
    const parsedStart = data.start ? new Date(data.start) : null;
    const parsedEnd = data.end ? new Date(data.end) : null;

    // Simpan tanggal yang diparse sebagai string
    setSelectedReport({
      ...data,
      start: parsedStart ? parsedStart.toISOString() : '',
      end: parsedEnd ? parsedEnd.toISOString() : ''
    });
    setEditMode(true); // Tampilkan dialog edit
  };

  const handleUpdateData = async (e: React.FormEvent) => {
    e.preventDefault();

    const operator = localStorage.getItem('username');
    const { _id, name_part, process, target, start, end, total, ok, ng, type_ng, keterangan, created_at } = selectedReport!;

    try {
      const token = Cookies.get('token')
      const res = await fetch(`/api/updateData/final-inspection`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { authorization: token })
        },
        body: JSON.stringify({ _id, operator, name_part, process, target, start, end, total, ok, ng, type_ng, keterangan, created_at }),
      });

      if (res.ok) {
        // window.location.reload(); // Refresh halaman setelah sukses
        setEditMode(false); // Tutup dialog edit
      } else {
        const data = await res.json();
        setResErr(data.message); // Set error jika ada
      }
      if (res.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        Cookies.remove("token");
        window.location.reload();
      }
      
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <Dialog open={editMode} onOpenChange={setEditMode}>
        <DialogContent className="min-w-fit overflow-scroll h-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Data</DialogTitle>
            <DialogDescription>Edit data yang ingin diubah, dan tekan simpan jika sudah selesai</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateData}>
            {resErr && <div className="alert alert-danger">{resErr}</div>}
            <div className="grid gap-4 py-4">
              <Input
                label="Nama Part"
                labelPlacement="outside"
                placeholder="Masukkan nama part"
                value={selectedReport?.name_part || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, name_part: e.target.value })}
              />
              <Input
                label="Proses"
                labelPlacement="outside"
                placeholder="Masukkan proses yang dilakukan"
                value={selectedReport?.process || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, process: e.target.value })}
              />
              <Input
                label="Target"
                labelPlacement="outside"
                placeholder="Masukkan target yang telah ditentukan"
                value={selectedReport?.target?.toString() || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, target: Number(e.target.value) })}
              />
              <DateInput
                label={"Start"}
                labelPlacement="outside"
                hideTimeZone
                hourCycle={24}
                defaultValue={selectedReport?.start ? parseDateTime(selectedReport.start.split("T")[0]) : null} // Hanya tanggal
                onChange={(date) => setSelectedReport({ ...selectedReport!, start: date.toString() })} // Mengonversi tanggal ke format ISO
              />
              <DateInput
                label={"End"}
                labelPlacement="outside"
                hideTimeZone
                hourCycle={24}
                defaultValue={selectedReport?.end ? parseDateTime(selectedReport.end.split("T")[0]) : null} // Hanya tanggal
                onChange={(date) => setSelectedReport({ ...selectedReport!, end: date.toString() })} // Mengonversi tanggal ke format ISO
              />
              <Input
                label="Total"
                labelPlacement="outside"
                placeholder="Masukkan total"
                value={selectedReport?.total?.toString() || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, total: Number(e.target.value) })}
              />
              <Input
                label="NG"
                labelPlacement="outside"
                placeholder="Masukkan NG"
                value={selectedReport?.ng?.toString() || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, ng: Number(e.target.value) })}
              />
              <Input
                label="Jenis NG"
                labelPlacement="outside"
                placeholder="Masukkan jenis NG"
                value={selectedReport?.type_ng || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, type_ng: e.target.value })}
              />
              <Textarea
                maxRows={3}
                label="Keterangan"
                labelPlacement="outside"
                placeholder="Masukkan keterangan"
                value={selectedReport?.keterangan || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, keterangan: e.target.value })}
              />
            </div>
            <Button type="submit">Simpan</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Button onClick={() => handleEdit(data)} className="bg-green-500 text-white rounded-md w-fit p-2">
        <Pencil className="" size={18} />
      </Button>
    </div>
  )
}