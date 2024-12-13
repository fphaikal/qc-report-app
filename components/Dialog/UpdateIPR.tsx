'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@nextui-org/react";
import { DateInput } from "@nextui-org/react";
import { Pencil } from "lucide-react"
import { NCR } from "@/types/NCR";
import Cookies from "js-cookie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label";
import { deptConfig } from "@/config/dept";

interface UpdateFIProps {
  data: NCR;
}

export default function UpdateIPR({ data }: UpdateFIProps) {
  const [selectedReport, setSelectedReport] = useState<NCR | null>(null); // State untuk menyimpan data yang ingin diedit
  const [editMode, setEditMode] = useState(false); // State untuk mengontrol dialog edit
  const [resErr, setResErr] = useState(''); // State untuk menampilkan error
  const [, setError] = useState('')

  const handleEdit = (data: NCR) => {
    setSelectedReport(data); // Simpan data yang ingin diedit ke state
    setEditMode(true); // Tampilkan dialog edit
  };

  const handleUpdateData = async (e: React.FormEvent) => {
    e.preventDefault();

    const { _id, info_date, department_section, problem, source, item, customer, description, cause, countermeasure, form_type, pic, start_date, progress, target_due, actual_finish } = selectedReport!;

    try {
      const token = Cookies.get('token')
      const res = await fetch(`/api/updateData/ipr`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { authorization: token })
        },
        body: JSON.stringify({ _id, info_date, department_section, problem, source, item, customer, description, cause, countermeasure, form_type, pic, start_date, progress, target_due, actual_finish }),
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
        <DialogContent className="overflow-scroll h-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Data</DialogTitle>
            <DialogDescription>Edit datab IPR yang ingin diubah, dan tekan simpan jika sudah selesai</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateData}>
            {resErr && <div className="alert alert-danger">{resErr}</div>}
            <div className="grid gap-4 py-4">
              <DateInput
                label={"Info Date"}
                labelPlacement="outside"
                onChange={(date) => setSelectedReport({ ...selectedReport!, info_date: date.toString() })} // Mengonversi tanggal ke format ISO
              />
              <div className="flex flex-col gap-2">
                <Label>Department/Section</Label>
                <Select value={selectedReport?.department_section} onValueChange={(value) => setSelectedReport({ ...selectedReport!, department_section: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Department/Section" />
                  </SelectTrigger>
                  <SelectContent>
                    {deptConfig.map((dept) => dept.isIpr && (
                      <SelectItem key={dept.name} value={dept.name}>{dept.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                label="Problem"
                labelPlacement="outside"
                placeholder="Masukkan problem"
                value={selectedReport?.problem || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, problem: e.target.value })}
              />
              <Input
                label="Sumber"
                labelPlacement="outside"
                placeholder="Masukkan sumber"
                value={selectedReport?.source || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, source: e.target.value })}
              />
              <Input
                label="Item"
                labelPlacement="outside"
                placeholder="Masukkan item"
                value={selectedReport?.item || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, item: e.target.value })}
              />
              <Input
                label="Customer"
                labelPlacement="outside"
                placeholder="Masukkan customer"
                value={selectedReport?.customer || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, customer: e.target.value })}
              />
              <Input
                label="Deskripsi"
                labelPlacement="outside"
                placeholder="Masukkan deskripsi"
                value={selectedReport?.description || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, description: e.target.value })}
              />
              <Input
                label="Penyebab"
                labelPlacement="outside"
                placeholder="Masukkan penyebab"
                value={selectedReport?.cause || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, cause: e.target.value })}
              />
              <Input
                label="Countermeasure"
                labelPlacement="outside"
                placeholder="Masukkan countermeasure"
                value={selectedReport?.countermeasure || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, countermeasure: e.target.value })}
              />
              <Input
                label="Form"
                labelPlacement="outside"
                placeholder="Masukkan form"
                value={selectedReport?.form_type || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, form_type: e.target.value })}
              />
              <DateInput
                label={"Tanggal Start"}
                labelPlacement="outside"
                onChange={(date) => setSelectedReport({ ...selectedReport!, start_date: date.toString() })} // Mengonversi tanggal ke format ISO
              />
              <Input
                label="Progress"
                labelPlacement="outside"
                placeholder="Masukkan progress"
                value={selectedReport?.progress || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, progress: e.target.value })}
              />
              <DateInput
                label={"Target Due"}
                labelPlacement="outside"
                onChange={(date) => setSelectedReport({ ...selectedReport!, target_due: date.toString() })} // Mengonversi tanggal ke format ISO
              />
              <DateInput
                label={"Actual Finish"}
                labelPlacement="outside"
                onChange={(date) => setSelectedReport({ ...selectedReport!, actual_finish: date.toString() })} // Mengonversi tanggal ke format ISO
              />
            </div>
            <Button type="submit">Simpan</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Button onClick={() => handleEdit(data)} className="bg-success text-white rounded-md w-fit p-2">
        <Pencil className="" size={18} />
      </Button>
    </div>
  )
}