import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@nextui-org/react";
import { DateInput } from "@nextui-org/react";
import { AlertCircle, Loader2 } from "lucide-react"
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
  const [resErr, setResErr] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

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
      const res = await fetch('/api/addData/ncr', {
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
        setLoading(true);
        window.location.reload()
        return "Success Add Data"
      }
      if (res.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        Cookies.remove("token");
        window.location.reload()
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
      <DialogContent className="h-[500px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Tambah Data</DialogTitle>
          <DialogDescription>
            Tambahkan data NCR, dan tekan simpan jika sudah selesai
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitDataIPR}>
          {resErr && <div className="flex items-center gap-4 p-3 rounded-lg text-white bg-danger border border-red-500">
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
          <div className={loading ? 'hidden' : 'mb-5'}>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
            >Submit</button>
          </div>
          <div className={loading ? 'mb-5' : 'hidden'}>
            <button disabled className="flex justify-center items-center w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}