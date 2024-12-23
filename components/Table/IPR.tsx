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
import { Trash2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { NCR } from "@/types/NCR"
import UpdateIPR from "../Dialog/UpdateIPR"
import { NCRTableProps } from "@/types/Table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import DeleteDialog from "../Dialog/DeleteData"

const TableHeadName = [
  { accessorKey: "info_date", header: "Info Date" },
  { accessorKey: "department_section", header: "Dept/Section" },
  { accessorKey: "problem", header: "Problem" },
  { accessorKey: "source", header: "Source" },
  { accessorKey: "item", header: "Item" },
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "cause", header: "Cause" },
  { accessorKey: "countermeasure", header: "Countermeasure" },
  { accessorKey: "form_type", header: "Form Type" },
  { accessorKey: "pic", header: "PIC" },
  { accessorKey: "start_date", header: "Start Date" },
  { accessorKey: "progress", header: "Progress" },
  { accessorKey: "target_due", header: "Target Due" },
  { accessorKey: "actual_finish", header: "Actual Finish" },
];


export default function IPRTable({ data, handleDelete }: NCRTableProps) {
  const pathname = usePathname()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {TableHeadName.map((name) => (
            <TableHead key={name.accessorKey} className={name.accessorKey === 'keterangan' ? 'w-52' : ''}>{name.header}</TableHead>
          ))}
          {pathname === '/dashboard/ipr/report' && (
            <TableHead key="action" >Action</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((report: NCR) => (
            <TableRow key={report._id} >
              <TableCell className="w-24">{format(report.info_date, "y-MM-dd")}</TableCell>
              <TableCell>{report.department_section}</TableCell>
              <TableCell>{report.problem}</TableCell>
              <TableCell>{report.source}</TableCell>
              <TableCell>{report.item}</TableCell>
              <TableCell>{report.customer}</TableCell>
              <TableCell>{report.description}</TableCell>
              <TableCell>{report.cause}</TableCell>
              <TableCell>{report.countermeasure}</TableCell>
              <TableCell>{report.form_type}</TableCell>
              <TableCell>{report.pic}</TableCell>
              <TableCell>{format(new Date(report.start_date), "y-MM-dd")}</TableCell>
              <TableCell className={report.progress >= '100' ? 'bg-success-400' : 'bg-danger'}>{report.progress}</TableCell>
              <TableCell>{format(new Date(report.target_due), "y-MM-dd")}</TableCell>
              <TableCell>{format(new Date(report.actual_finish), "y-MM-dd")}</TableCell>
              {pathname === '/dashboard/ipr/report' &&
                <TableCell>
                  <div className="flex gap-2">
                    <UpdateIPR data={report} />
                    <DeleteDialog id={report._id} handleDelete={handleDelete} />
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