"use client"

import useFetchData from "@/hooks/useFetchData"
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
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const TableHeadName = [
  {
    accessorKey: "operator",
    header: "Operator"
  },
  {
    accessorKey: "name-part",
    header: "Name Part"
  },
  {
    accessorKey: "process",
    header: "Process"
  },
  {
    accessorKey: "target",
    header: "Target"
  },
  {
    accessorKey: "start",
    header: "Start"
  },
  {
    accessorKey: "end",
    header: "End"
  },
  {
    accessorKey: "total",
    header: "Total"
  },
  {
    accessorKey: "persen",
    header: "Persen"
  },
  {
    accessorKey: "ng",
    header: "NG"
  },
  {
    accessorKey: "jenis-ng",
    header: "Jenis NG"
  },
]

export default function FinalInspectionDashboard() {
  const { data, loading, error } = useFetchData(`http://localhost:2025/api/report/final-inspection?date=all`);
  const [date, setDate] = React.useState<Date>()

  const formatDate = format(date, "y-MM-dd")
  console.log(formatDate)

  if (loading) return (
    <div>Loading...</div>
  )

  if (error) return (
    <div>Error: {error}</div>
  )
  return (
    <div className="flex flex-col gap-5 w-full p-10">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "y-MM-dd") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {data && data.length >> 0 ? (
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
              {data.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.operator}</TableCell>
                  <TableCell>{report.name_part}</TableCell>
                  <TableCell>{report.process}</TableCell>
                  <TableCell>{report.target}</TableCell>
                  <TableCell>{report.start}</TableCell>
                  <TableCell>{report.end}</TableCell>
                  <TableCell>{report.total}</TableCell>
                  <TableCell>{report.persen}%</TableCell>
                  <TableCell>{report.ng}</TableCell>
                  <TableCell>{report.type_ng}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No Data available for this data.</p>
      )}
    </div>
  )
}