'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@nextui-org/react";
import { DateInput } from "@nextui-org/react";
import { Pencil } from "lucide-react"
import { NG } from "@/types/NG"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Cookies from "js-cookie";

interface UpdateNgDataProps {
  data: NG;
}

export default function UpdateNG({ data }: UpdateNgDataProps) {
  const [selectedReport, setSelectedReport] = useState<NG | null>(null); // State untuk menyimpan data yang ingin diedit
  const [editMode, setEditMode] = useState(false); // State untuk mengontrol dialog edit
  const [resErr, setResErr] = useState(''); // State untuk menampilkan error
  const [, setError] = useState('')

  

  const handleEdit = (data: NG) => {
    setSelectedReport(data); // Simpan data yang ingin diedit ke state
    setEditMode(true); // Tampilkan dialog edit
  };

  const handleUpdateData = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id, ncr_date, section, product_name, customer, last_process, value, ng_type, ng_quantity, operator, detection, status, month, year } = selectedReport!;

    try {
      const token = Cookies.get('token')
      const res = await fetch(`/api/updateData/ng`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { authorization: token })
        },
        body: JSON.stringify({ id, ncr_date, section, product_name, customer, last_process, value, ng_type, ng_quantity, operator, detection, status, month, year }),
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
        <DialogContent className="min-w-fit overflow-y-scroll h-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Data</DialogTitle>
            <DialogDescription>Edit data NG yang ingin diubah, dan tekan simpan jika sudah selesai</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateData}>
            {resErr && <div className="alert alert-danger">{resErr}</div>}
            <div className="grid gap-4 py-4">
              <RadioGroup value={selectedReport?.status} onValueChange={(value) => setSelectedReport({ ...selectedReport!, status: value as 'reject' | 'repair' })} className="flex">
                <Label>Status: </Label>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reject" id="r1" />
                  <Label htmlFor="r1">Reject</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="repair" id="r2" />
                  <Label htmlFor="r2">Repair</Label>
                </div>
              </RadioGroup>
              <DateInput
                label={"Date"}
                labelPlacement="outside"
                onChange={(date) => setSelectedReport({ ...selectedReport!, ncr_date: date.toString() })}
              />
              <div className="flex flex-col gap-2">
                <Label>Section</Label>
                <Select onValueChange={(value) => setSelectedReport({ ...selectedReport!, section: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="IN PROCESS">Machining</SelectItem>
                      <SelectItem value="Stamping">Stamping</SelectItem>
                      <SelectItem value="Subcon">Subcon</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Input
                label="Product Name"
                labelPlacement="outside"
                placeholder="Masukkan nama produk"
                value={selectedReport?.product_name || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, product_name: e.target.value })}
              />
              <Input
                label="Customer"
                labelPlacement="outside"
                placeholder="Masukkan nama customer"
                value={selectedReport?.customer || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, customer: e.target.value })}
              />
              <Input
                label="Last Process"
                labelPlacement="outside"
                placeholder="Masukkan proses terakhir"
                value={selectedReport?.last_process || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, last_process: e.target.value })}
              />
              <Input
                label="Value"
                labelPlacement="outside"
                type="number"
                placeholder="Masukkan nilai"
                value={selectedReport?.value?.toString() || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, value: +e.target.value })}
              />
              <Input
                label="NG Type"
                labelPlacement="outside"
                placeholder="Masukkan tipe NG"
                value={selectedReport?.ng_type || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, ng_type: e.target.value })}
              />
              <Input
                label="NG Quantity"
                labelPlacement="outside"
                type="number"
                placeholder="Masukkan kuantitas NG"
                value={selectedReport?.ng_quantity?.toString() || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, ng_quantity: +e.target.value })}
              />
              <Input
                label="Operator"
                labelPlacement="outside"
                placeholder="Masukkan nama operator"
                value={selectedReport?.operator || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, operator: e.target.value })}
              />
              <div className="flex flex-col gap-2">
                <Label>Detection</Label>
                <Select onValueChange={(value) => setSelectedReport({ ...selectedReport!, detection: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a detection" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Machining">IN PROCESS</SelectItem>
                      <SelectItem value="NEXT PROCESS">NEXT PROCESS</SelectItem>
                      <SelectItem value="SORTIR">SORTIR</SelectItem>
                      <SelectItem value="CLAIM">CLAIM</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Input
                label="Month"
                labelPlacement="outside"
                type="number"
                placeholder="Masukkan bulan"
                value={selectedReport?.month?.toString() || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, month: +e.target.value })}
                min={1}
                max={12}
                />
              <Input
                label="Year"
                labelPlacement="outside"
                type="number"
                placeholder="Masukkan tahun"
                value={selectedReport?.year?.toString() || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, year: +e.target.value })}
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
