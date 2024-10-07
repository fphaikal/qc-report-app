'use client'

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { Trash2, Pencil } from "lucide-react"
import { usePathname } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@nextui-org/react";
import { DateInput } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import UpdateFI from "../Dialog/UpdateFI"
import { ReportTableProps } from "@/types/Table"

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
];

export default function ReportTable({ data, handleDelete }: ReportTableProps) {
  const pathname = usePathname()
  const [selectedReport, setSelectedReport] = useState<Report | null>(null); // State untuk menyimpan data yang ingin diedit
  const [editMode, setEditMode] = useState(false); // State untuk mengontrol dialog edit
  const [resErr, setResErr] = useState(''); // State untuk menampilkan error
  const [, setError] = useState('')

  const handleEdit = (report: Report) => {
    setSelectedReport(report); // Simpan data yang ingin diedit ke state
    setEditMode(true); // Tampilkan dialog edit
  };

  const handleUpdateData = async (e: React.FormEvent) => {
    e.preventDefault();

    const operator = localStorage.getItem('username');
    const { id, name_part, process, target, start, end, total, ok, ng, type_ng, keterangan } = selectedReport!;

    try {
      const res = await fetch(`/api/updateData/final-inspection`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, operator, name_part, process, target, start, end, total, ok, ng, type_ng, keterangan }),
      });

      if (res.ok) {
        window.location.reload(); // Refresh halaman setelah sukses
        setEditMode(false); // Tutup dialog edit
      } else {
        const data = await res.json();
        setResErr(data.message); // Set error jika ada
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
                defaultValue={now(getLocalTimeZone())}
                onChange={(date) => setSelectedReport({ ...selectedReport!, start: date.toString() })} // Mengonversi tanggal ke format ISO
              />
              <DateInput
                label={"End"}
                labelPlacement="outside"
                hideTimeZone
                hourCycle={24}
                defaultValue={now(getLocalTimeZone())}
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
                label="Ok"
                labelPlacement="outside"
                placeholder="Masukkan Ok"
                value={selectedReport?.ok?.toString() || ''}
                onChange={(e) => setSelectedReport({ ...selectedReport!, ok: Number(e.target.value) })}
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
              <Input
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
      <Table>
        <TableHeader>
          <TableRow>
            {TableHeadName.map((name) => (
              <TableHead key={name.accessorKey} className={name.accessorKey === 'keterangan' ? 'w-52' : ''}>{name.header}</TableHead>
            ))}
            {pathname === '/dashboard/myreport' && (
              <TableHead key="action" >Action</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((report: Report) => (
              <TableRow key={report.id}>
                <TableCell>{report.operator}</TableCell>
                <TableCell>{report.name_part}</TableCell>
                <TableCell>{report.process}</TableCell>
                <TableCell>{report.target}</TableCell>
                <TableCell className="w-44">{format(report.start, "y-MM-dd kk:mm")}</TableCell>
                <TableCell className="w-44">{format(report.end, "y-MM-dd kk:mm")}</TableCell>
                <TableCell>{report.total}</TableCell>
                <TableCell>{report.persen}%</TableCell>
                <TableCell>{report.ng}</TableCell>
                <TableCell>{report.type_ng}</TableCell>
                <TableCell>{report.keterangan}</TableCell>
                {pathname === '/dashboard/myreport' &&
                  <TableCell>
                    <div className="flex gap-2">
                      <UpdateFI data={report} />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="bg-red-500 text-white rounded-md w-fit p-2">
                            <Trash2 className="" size={18} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Hapus Data</DialogTitle>
                            <DialogDescription>
                              Apakah anda yakin ingin menghapus data ini?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="sm:justify-start" >
                            <Button onClick={() => handleDelete(report.id)} className="bg-red-500 text-white rounded-md w-fit p-2">
                              <p>Iya, Hapus</p>
                            </Button>
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Tidak, Tetap Simpan
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                }
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={TableHeadName.length + (pathname === '/dashboard/myreport' ? 1 : 0)} className="h-24 text-center">
                No Data available. Please add your report.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}