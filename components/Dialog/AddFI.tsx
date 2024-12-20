import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label"
import { DateInput } from "@nextui-org/react";
import { now, getLocalTimeZone, CalendarDateTime, ZonedDateTime } from "@internationalized/date";
import { AlertCircle, Loader2 } from "lucide-react"
import Cookies from "js-cookie";
import { getToken, getUsername } from "@/utils/auth";

export default function AddReportDialog() {
  const [namePart, setNamePart] = useState('');
  const [process, setProcess] = useState('');
  const [target, setTarget] = useState('');
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [total, setTotal] = useState('');
  const [ok,] = useState('');
  const [ng, setNg] = useState('');
  const [typeNg, setTypeNg] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [, setError] = useState<string>('');
  const [resErr, setResErr] = useState('')
  const [loading, setLoading] = useState(false);

  const handleSubmitData = async (e: React.FormEvent) => {
    e.preventDefault();
    const operator = getUsername()
    const name_part = namePart
    const type_ng = typeNg

    try {
const token = getToken();      const res = await fetch('/api/addData/final-inspection', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { authorization: token })
        },
        body: JSON.stringify({ operator, name_part, process, target, start, end, total, ok, ng, type_ng, keterangan })
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
        Cookies.remove("token");
        window.location.reload()
      }
    } catch (err) {
      setError('Error: ' + err)
    }
  }

  const formatDateToLocalISOString = (date: ZonedDateTime) => {
    const jsDate = new Date(date.year, date.month - 1, date.day, date.hour, date.minute);
    const offset = jsDate.getTimezoneOffset();
    jsDate.setMinutes(jsDate.getMinutes() - offset);
    return jsDate.toISOString().slice(0, 19).replace('T', ' ');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit">+ Tambah Data</Button>
      </DialogTrigger>
      <DialogContent className="h-[500px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Tambah Data</DialogTitle>
          <DialogDescription>
            Tambahkan data kegiatan anda hari ini, dan tekan simpan jika sudah selesai
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitData}>
          {resErr && <div className="flex items-center gap-4 p-3 rounded-lg text-white bg-danger border border-red-500">
            <AlertCircle />
            <p>{resErr}</p>
          </div>}
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
                  onChange={(date) => setStart(formatDateToLocalISOString(date))}
                  isRequired
                />

                <DateInput
                  label={"End"}
                  hideTimeZone
                  hourCycle={24}
                  defaultValue={now(getLocalTimeZone())}
                  onChange={(date) => setEnd(formatDateToLocalISOString(date))}
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