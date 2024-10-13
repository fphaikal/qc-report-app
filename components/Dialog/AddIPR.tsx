import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@nextui-org/react";
import { DateInput } from "@nextui-org/react";
import { AlertCircle } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Cookies from "js-cookie";

export default function AddDataIPRDialog() {
  const [infoDate, setInfoDate] = useState<string>('');
  const [deptSection, setDeptSection] = useState('');
  const [problem, setProblem] = useState('');
  const [source, setSource] = useState('');
  const [item, setItem] = useState('');
  const [customer, setCustomer] = useState('');
  const [desc, setDesc] = useState('');
  const [cause, setCause] = useState('');
  const [countermeasure, setCountermeasure] = useState('');
  const [form, setForm] = useState('');
  const [start, setStart] = useState<string>('');
  const [progress, setProgress] = useState('');
  const [targetDue, setTargetDue] = useState<string>('');
  const [actualFinish, setActualFinish] = useState<string>('');
  const [, setError] = useState<string>('');
  const [resErr, setResErr] = useState('')

  const handleSubmitDataIPR = async (e: React.FormEvent) => {
    e.preventDefault();
    const pic = localStorage.getItem('username')

    const info_date = infoDate
    const department_section = deptSection
    const description = desc
    const target_due = targetDue
    const actual_finish = actualFinish
    const form_type = form
    const start_date = start

    try {
      const token = Cookies.get('token')
      const res = await fetch('/api/addData/ipr', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { authorization: token })
        },
        body: JSON.stringify({ info_date, department_section, problem, source, item, customer, description, cause, countermeasure, form_type, pic, start_date, progress, target_due, actual_finish })
      })

      if (!res.ok) {
        const data = await res.json()
        setResErr(data.message)
      } else {
        window.location.reload()
        return "Success Add Data"
      }
    } catch (err) {
      setError('Error: ' + err)
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit">+ Tambah Data</Button>
      </DialogTrigger>
      <DialogContent className="w-fit h-[500px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Tambah Data</DialogTitle>
          <DialogDescription>
            Tambahkan data IPR, dan tekan simpan jika sudah selesai
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitDataIPR}>
          {resErr && <div className="flex items-center gap-4 p-3 rounded-lg text-white bg-red-500 border border-red-500">
            <AlertCircle />
            <p>{resErr}</p>
          </div>}
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <DateInput
                label={"Info Date"}
                labelPlacement="outside"
                onChange={(date) => setInfoDate(date?.toString())}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Select onValueChange={(value) => setDeptSection(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Department/Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Machining">Machining</SelectItem>
                  <SelectItem value="Stamping">Stamping</SelectItem>
                  <SelectItem value="Machining (Welding)">Machining (Welding)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Problem"
                labelPlacement="outside"
                isRequired
                placeholder="Masukkan proses yang dilakukan"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Sumber"
                labelPlacement="outside"
                isRequired
                placeholder="Masukkan sumber informasi"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Item"
                labelPlacement="outside"
                placeholder="Masukkan nama item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                isRequired
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Customer"
                labelPlacement="outside"
                isRequired
                placeholder="Masukkan nama customer"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Deskripsi"
                labelPlacement="outside"
                isRequired
                placeholder="Masukkan deskripsi"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Penyebab"
                labelPlacement="outside"
                isRequired
                placeholder="Masukkan penyebab"
                value={cause}
                onChange={(e) => setCause(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Countermeasure"
                labelPlacement="outside"
                isRequired
                placeholder="Masukkan countermeasure"
                value={countermeasure}
                onChange={(e) => setCountermeasure(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Form"
                labelPlacement="outside"
                isRequired
                placeholder="Masukkan form"
                value={form}
                onChange={(e) => setForm(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <DateInput
                label={"Tanggal Start"}
                labelPlacement="outside"
                onChange={(date) => setStart(date?.toString())}
                isRequired
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Progress"
                labelPlacement="outside"
                isRequired
                placeholder="Masukkan nilai progress"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <DateInput
                label={"Target Due"}
                labelPlacement="outside"
                onChange={(date) => setTargetDue(date?.toString())}
                isRequired
              />
            </div><div className="flex flex-col gap-4">
              <DateInput
                label={"Actual Finish"}
                labelPlacement="outside"
                onChange={(date) => setActualFinish(date?.toString())}
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