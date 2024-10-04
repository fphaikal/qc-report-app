import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label"
import { DateInput } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import { AlertCircle } from "lucide-react"

export default function AddDataNCRDialog({ handleSubmitData, resErr }: AddReportDialogProps) {
  const [namePart, setNamePart] = useState('');
  const [process, setProcess] = useState('');
  const [target, setTarget] = useState('');
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [total, setTotal] = useState('');
  //const [ok, setOk] = useState('');
  const [ng, setNg] = useState('');
  const [typeNg, setTypeNg] = useState('');
  const [keterangan, setKeterangan] = useState('');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit">+ Tambah Data</Button>
      </DialogTrigger>
      <DialogContent className="w-fit h-[500px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Tambah Data</DialogTitle>
          <DialogDescription>
            Tambahkan data kegiatan anda hari ini, dan tekan simpan jika sudah selesai
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitData}>
          {resErr && <div className="flex items-center gap-4 p-3 rounded-lg text-white bg-red-500 border border-red-500">
            <AlertCircle />
            <p>{resErr}</p>
          </div>}
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <DateInput
                label={"Info Date"}
                hideTimeZone
                hourCycle={24}
                defaultValue={now(getLocalTimeZone())}
                labelPlacement="outside"
                isRequired
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="dept-section" className="text-left">Dept/Section</Label>
              <Input
                isRequired
                id="dept-section"
                placeholder="Masukkan Departemen/Section"
                value={namePart}
                onChange={(e) => setNamePart(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="process" className="text-left">Problem</Label>
              <Input
                isRequired
                id="process"
                placeholder="Masukkan proses yang dilakukan"
                value={process}
                onChange={(e) => setProcess(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="target" className="text-left">Sumber</Label>
              <Input
                isRequired
                id="target"
                placeholder="Masukkan sumber informasi"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="jumlah" className="text-left">Item</Label>
              <Input
                id="jumlah"
                placeholder="Masukkan nama item"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                isRequired
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="ng" className="text-left">Customer</Label>
              <Input
                id="ng"
                placeholder="Masukkan nama customer"
                value={ng}
                onChange={(e) => setNg(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="jenis_ng" className="text-left">Deskripsi</Label>
              <Input
                id="jenis_ng"
                placeholder="Masukkan deskripsi"
                value={typeNg}
                onChange={(e) => setTypeNg(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="keterangan" className="text-left">Penyebab</Label>
              <Input
                id="keterangan"
                placeholder="Masukkan penyebab"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="keterangan" className="text-left">Countermeasure</Label>
              <Input
                id="keterangan"
                placeholder="Masukkan countermeasure"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="keterangan" className="text-left">Form</Label>
              <Input
                id="keterangan"
                placeholder="Masukkan form"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <DateInput
                label={"Tanggal Start"}
                hideTimeZone
                hourCycle={24}
                defaultValue={now(getLocalTimeZone())}
                labelPlacement="outside"
                isRequired
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="keterangan" className="text-left">Progress</Label>
              <Input
                id="keterangan"
                placeholder="Masukkan nilai progress"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <DateInput
                label={"Target Due"}
                hideTimeZone
                hourCycle={24}
                defaultValue={now(getLocalTimeZone())}
                labelPlacement="outside"
                isRequired
              />
            </div><div className="flex flex-col gap-4">
              <DateInput
                label={"Actual Finish"}
                hideTimeZone
                hourCycle={24}
                defaultValue={now(getLocalTimeZone())}
                labelPlacement="outside"
                isRequired
              />
            </div>
          </div>
          <Button type="submit" className="bg-primary">Simpan</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}