'use client'

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
import UpdateNCR from "../Dialog/UpdateNCR"
import { NGTableProps } from "@/types/Table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { NG } from "@/types/NG"
import UpdateNG from "../Dialog/UpdateNG"

const TableHeadName = [
  { accessorKey: "ncrdate", header: "NCR Date" },
  { accessorKey: "section", header: "Section" },
  { accessorKey: "productname", header: "Product Name" },
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "lastprocess", header: "Last Process" },
  { accessorKey: "value", header: "Value" },
  { accessorKey: "ngtype", header: "NG Type" },
  { accessorKey: "ngquantity", header: "NG Quantity" },
  { accessorKey: "operator", header: "Operator" },
  { accessorKey: "detection", header: "Detection" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "month", header: "Month" },
  { accessorKey: "year", header: "Year" },
];



export default function NGTable({ data, handleDelete }: NGTableProps) {
  const pathname = usePathname()


  return (
    <Table>
      <TableHeader>
        <TableRow>
          {TableHeadName.map((name) => (
            <TableHead key={name.accessorKey} className={name.accessorKey === 'keterangan' ? 'w-52' : ''}>{name.header}</TableHead>
          ))}
          {pathname === '/dashboard/ngData/report' && (
            <TableHead key="action" >Action</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((report: NG) => (
            <TableRow key={report.id}>
              <TableCell className="w-24">
                {format(new Date(report.ncr_date), "y-MM-dd")}
              </TableCell>
              <TableCell>{report.section}</TableCell>
              <TableCell>{report.product_name}</TableCell>
              <TableCell>{report.customer}</TableCell>
              <TableCell>{report.last_process}</TableCell>
              <TableCell>{report.value}</TableCell>
              <TableCell>{report.ng_type}</TableCell>
              <TableCell>{report.ng_quantity}</TableCell>
              <TableCell>{report.operator}</TableCell>
              <TableCell>{report.detection}</TableCell>
              <TableCell className={report.status === 'reject' ? 'bg-red-400' : 'bg-orange-400'}>{report.status}</TableCell>
              <TableCell>{report.month}</TableCell>
              <TableCell>{report.year}</TableCell>
              {pathname === '/dashboard/ngData/report' && (
                <TableCell>
                  <div className="flex gap-2">
                    <UpdateNG data={report} />
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-red-500 text-white rounded-md w-fit p-2"
                        >
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
                        <DialogFooter className="sm:justify-start">
                          <Button
                            onClick={() => handleDelete(report.id!)}
                            className="bg-red-500 text-white rounded-md w-fit p-2"
                          >
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
              )}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={TableHeadName.length + (pathname === '/dashboard/myreport' ? 1 : 0)}
              className="h-24 text-center"
            >
              No Data available. Please add your report.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}