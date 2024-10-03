'use client'

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label"
import { DateInput, DateValue } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import { Trash2, Pencil, AlertCircle } from "lucide-react"

const TableHeadName = [
  { accessorKey: "operator", header: "Operator" },
  { accessorKey: "name-part", header: "Name Part" },
  { accessorKey: "process", header: "Process" },
  { accessorKey: "target", header: "Target" },
  { accessorKey: "start", header: "Start" },
  { accessorKey: "end", header: "End" },
  { accessorKey: "total", header: "Total" },
  { accessorKey: "persen", header: "Persen" },
  { accessorKey: "ng", header: "NG" },
  { accessorKey: "jenis-ng", header: "Jenis NG" },
  { accessorKey: "keterangan", header: "Keterangan" },
  { accessorKey: "action", header: "Action" },
];

export default function MyReport() {
  const [data, setData] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [namePart, setNamePart] = useState('');
  const [process, setProcess] = useState('');
  const [target, setTarget] = useState('');
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [total, setTotal] = useState('');
  const [ok, setOk] = useState('');
  const [ng, setNg] = useState('');
  const [typeNg, setTypeNg] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [resErr, setResErr] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const username = localStorage.getItem('username')
      try {
        const res = await fetch(`http://localhost:2025/api/report/final-inspection/operator`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "name": username }),
        });
        if (!res.ok) throw new Error('Network response was not ok');
        const result = await res.json();
        setData(result.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmitData = async (e: React.FormEvent) => {
    e.preventDefault();
    const operator = localStorage.getItem('username')
    const name_part = namePart
    const type_ng = typeNg
    try {
      const res = await fetch('/api/addData', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ operator, name_part, process, target, start, end, total, ok, ng, type_ng, keterangan })
      })

      if (!res.ok) {
        const data = await res.json()
        setResErr(data.message)
      } else {
        window.location.reload()
        return "Success Add Data"
      }
    } catch (err) {
      setError(err)
    }
  }

  const handleEdit = async() => {

  }

  const handleDelete = async(id: any) => {
    try {
      const res = await fetch(`http://localhost:2025/api/report/final-inspection/${id}`, {
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


  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10">Error: {error}</div>;

  return (
    <div className="flex flex-col gap-5 w-full p-10 min-h-screen">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-fit">+ Tambah Data</Button>
        </DialogTrigger>
        <DialogContent className="min-w-fit">
          <DialogHeader>
            <DialogTitle>Tambah Data</DialogTitle>
            <DialogDescription>
              Tambahkan data kegiatan anda hari ini, dan tekan simpan jika sudah selesai
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitData}>
          {resErr && <div className="flex items-center gap-4 p-3 rounded-lg text-white bg-red-500 border border-red-500">
              <AlertCircle/>
              <p>{resErr}</p>
            </div> }
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-4">
                <Label htmlFor="name_part" className="text-left">Nama Part</Label>
                <Input
                  isRequired
                  id="name_part"
                  placeholder="Masukkan nama part"
                  value={namePart}
                  onChange={(e) => setNamePart(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="process" className="text-left">Proses</Label>
                <Input
                  isRequired
                  id="process"
                  placeholder="Masukkan proses yang dilakukan"
                  value={process}
                  onChange={(e) => setProcess(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="target" className="text-left">Target</Label>
                <Input
                  isRequired
                  id="target"
                  placeholder="Masukkan target yang telah ditentukan"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="jumlah" className="text-left">Waktu Pengerjaan</Label>
                <div className="flex flex-col lg:flex-row gap-4">
                  <DateInput
                    label={"Start"}
                    hideTimeZone
                    hourCycle={24}
                    defaultValue={now(getLocalTimeZone())}
                    onChange={(date) => setStart(date.toDate().toISOString())} // Mengonversi tanggal ke format ISO
                    isRequired
                  />
                  <DateInput
                    label={"End"}
                    hideTimeZone
                    hourCycle={24}
                    defaultValue={now(getLocalTimeZone())}
                    onChange={(date) => setEnd(date.toDate().toISOString())} // Mengonversi tanggal ke format ISO
                    isRequired
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="jumlah" className="text-left">Jumlah</Label>
                <Input
                  id="jumlah"
                  placeholder="Masukkan jumlah yang telah anda inspeksi"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  isRequired
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="ng" className="text-left">NG</Label>
                <Input
                  id="ng"
                  placeholder="Masukkan jumlah barang NG"
                  value={ng}
                  onChange={(e) => setNg(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="jenis_ng" className="text-left">Jenis NG</Label>
                <Input
                  id="jenis_ng"
                  placeholder="Masukkan jenis NG"
                  value={typeNg}
                  onChange={(e) => setTypeNg(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="keterangan" className="text-left">Keterangan</Label>
                <Input
                  id="keterangan"
                  placeholder="Masukkan keterangan anda"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="bg-primary">Simpan</Button>
          </form>
        </DialogContent>
      </Dialog>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {TableHeadName.map((name) => (
                <TableHead key={name.accessorKey}>{name.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.operator}</TableCell>
                  <TableCell>{report.name_part}</TableCell>
                  <TableCell>{report.process}</TableCell>
                  <TableCell>{report.target}</TableCell>
                  <TableCell>{format(report.start, "y-MM-dd k:mm")}</TableCell>
                  <TableCell>{format(report.end, "y-MM-dd k:mm")}</TableCell>
                  <TableCell>{report.total}</TableCell>
                  <TableCell>{report.persen}%</TableCell>
                  <TableCell>{report.ng}</TableCell>
                  <TableCell>{report.type_ng}</TableCell>
                  <TableCell>{report.keterangan}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button onClick={() => handleEdit()} className="bg-green-500 text-white rounded-md w-fit p-2">
                        <Pencil className="" size={18} />
                      </Button>
                      <Button onClick={() => handleDelete(report.id)} className="bg-red-500 text-white rounded-md w-fit p-2">
                        <Trash2 className="" size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={TableHeadName.length} className="h-24 text-center">
                  No Data available. Please add your report.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
