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

export default function ReportTable({ data, handleEdit, handleDelete }: ReportTableProps) {
  const pathname = usePathname()
  return (
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
              <TableCell>{format(report.start, "y-MM-dd k:mm")}</TableCell>
              <TableCell>{format(report.end, "y-MM-dd k:mm")}</TableCell>
              <TableCell>{report.total}</TableCell>
              <TableCell>{report.persen}%</TableCell>
              <TableCell>{report.ng}</TableCell>
              <TableCell>{report.type_ng}</TableCell>
              <TableCell>{report.keterangan}</TableCell>
              {pathname === '/dashboard/myreport' &&
                <TableCell>
                  <div className="flex gap-2">
                    <Button onClick={() => handleEdit(report.id)} className="bg-green-500 text-white rounded-md w-fit p-2">
                      <Pencil className="" size={18} />
                    </Button>
                    <Button onClick={() => handleDelete(report.id)} className="bg-red-500 text-white rounded-md w-fit p-2">
                      <Trash2 className="" size={18} />
                    </Button>
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
  )
}