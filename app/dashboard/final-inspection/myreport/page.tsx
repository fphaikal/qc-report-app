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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DateInput } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import { Trash2, Pencil } from "lucide-react"

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
  const [startDate, setStartDate] = useState(now(getLocalTimeZone()));
  const [endDate, setEndDate] = useState(now(getLocalTimeZone()));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:2025/api/report/final-inspection/operator`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "name": "fphaikal" }),
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

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10">Error: {error}</div>;

  return (
    <div className="flex flex-col gap-5 w-full p-10">
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
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="name_part" className="text-left">Nama Part</Label>
              <Input
                id="name_part"
                placeholder="Masukkan nama part"
                value={namePart}
                onChange={(e) => setNamePart(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="process" className="text-left">Proses</Label>
              <Input
                id="process"
                placeholder="Masukkan proses yang dilakukan"
                value={process}
                onChange={(e) => setProcess(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="target" className="text-left">Target</Label>
              <Input
                id="target"
                placeholder="Masukkan target yang telah ditentukan"
                value={process}
                onChange={(e) => setProcess(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="jumlah" className="text-left">Wkatu Pengerjaan</Label>
              <div className="flex flex-col lg:flex-row gap-4">
                <DateInput
                  label={"Start"}
                  hideTimeZone
                  defaultValue={now(getLocalTimeZone())}
                />
                <DateInput
                  label={"End"}
                  hideTimeZone
                  defaultValue={now(getLocalTimeZone())}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="jumlah" className="text-left">Jumlah</Label>
              <Input
                id="jumlah"
                placeholder="Masukkan jumlah yang telah anda inspeksi"
                value={process}
                onChange={(e) => setProcess(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="ng" className="text-left">NG</Label>
              <Input
                id="ng"
                placeholder="Masukkan jumlah yang telah anda inspeksi"
                value={process}
                onChange={(e) => setProcess(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="jenis_ng" className="text-left">Jenis NG</Label>
              <Input
                id="jenis_ng"
                placeholder="Masukkan jumlah yang telah anda inspeksi"
                value={process}
                onChange={(e) => setProcess(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="keterangan" className="text-left">Keterangan</Label>
              <Input
                id="keterangan"
                placeholder="Masukkan jumlah yang telah anda inspeksi"
                value={process}
                onChange={(e) => setProcess(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-primary">Simpan</Button>
          </DialogFooter>
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
                      <Pencil className="bg-green-500 text-white rounded-md p-1.5"/>
                      <Trash2 className="bg-red-500 text-white rounded-md p-1.5"/>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={TableHeadName.length} className="h-24 text-center">
                  No Data available for this date.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
