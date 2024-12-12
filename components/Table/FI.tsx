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
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import UpdateFI from "../Dialog/UpdateFI"
import { ReportTableProps } from "@/types/Table"
import DeleteDialog from "../Dialog/DeleteData"

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
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 10;

  // Menentukan data yang ditampilkan berdasarkan index
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  // Fungsi untuk pindah ke halaman berikutnya
  const handleNext = () => {
    if (startIndex + itemsPerPage < data.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  // Fungsi untuk pindah ke halaman sebelumnya
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <div>
      <Table className="min-w-[2000px]">
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
            paginatedData.map((report: Report) => (
              <TableRow key={report._id}>
                <TableCell className="w-fit">{report.operator}</TableCell>
                <TableCell className="w-fit">{report.name_part}</TableCell>
                <TableCell className="w-fit">{report.process}</TableCell>
                <TableCell className="w-fit">{report.target}</TableCell>
                <TableCell className="w-44">{report.start ? format(report.start, "y-MM-dd kk:mm") : ""}</TableCell>
                <TableCell className="w-44">{report.end ? format(report.end, "y-MM-dd kk:mm") : ""}</TableCell>
                <TableCell>{report.total}</TableCell>
                <TableCell>{report.persen}%</TableCell>
                <TableCell>{report.ng}</TableCell>
                <TableCell>{report.type_ng}</TableCell>
                <TableCell className="w-[800px]">{report.keterangan}</TableCell>
                {pathname === '/dashboard/myreport' &&
                  <TableCell>
                    <div className="flex gap-2">
                      <UpdateFI data={report} />
                      <DeleteDialog id={report._id} handleDelete={handleDelete} />
                      {/* <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="bg-danger text-white rounded-md w-fit p-2">
                            <Trash2 className="" size={18} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md w-72">
                          <DialogHeader className="flex flex-col gap-1">
                            <div className="flex justify-center ">
                              <div className="flex aspect-auto size-14 items-center justify-center rounded-full bg-danger/10 text-sidebar-primary-foreground ">
                                <Trash2 className="text-danger" size={24} />
                              </div>
                            </div>
                            <DialogTitle className="text-center">Hapus Data</DialogTitle>
                            <DialogDescription className="text-center">
                              Apakah anda yakin ingin <br />menghapus data ini?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogDescription>
                            <div className="flex flex-col gap-2 items-center w-full">
                              <Button onClick={() => handleDelete(report._id)} className="bg-danger text-white rounded-md w-2/3  p-2">
                                <p>Iya, Hapus</p>
                              </Button>
                              <DialogClose asChild>
                                <Button type="button" variant="secondary" className="w-2/3">
                                  Tidak, Tetap Simpan
                                </Button>
                              </DialogClose>
                            </div>
                          </DialogDescription>
                        </DialogContent>
                      </Dialog> */}
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
      <div className="flex gap-2 items-center">
        <button
          className="p-2 bg-gray-50/40 rounded-lg"
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="p-2 bg-gray-50/40 rounded-lg"
          onClick={handleNext}
          disabled={startIndex + itemsPerPage >= data.length}
        >
          <ChevronRight size={24} />
        </button>
        <p className="text-sm">Page {startIndex / itemsPerPage + 1}</p>
        |
        <p className="text-sm">Total Data: {data.length}</p>
      </div>

    </div>
  )
}