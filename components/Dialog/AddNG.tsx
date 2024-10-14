import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@nextui-org/react";
import { DateInput } from "@nextui-org/react";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Cookies from "js-cookie";

export default function AddDataNGDialog() {
  const [ncrDate, setNcrDate] = useState<string>('');  // Mengganti infoDate dengan ncrDate
  const [section, setSection] = useState('');          // Mengganti deptSection dengan section
  const [productName, setProductName] = useState('');  // Mengganti problem dengan productName
  const [customer, setCustomer] = useState('');
  const [lastProcess, setLastProcess] = useState('');  // Mengganti source dengan lastProcess
  const [value, setValue] = useState('');              // Mengganti item dengan value
  const [ngType, setNgType] = useState('');            // Mengganti desc dengan ngType
  const [ngQuantity, setNgQuantity] = useState('');    // Mengganti cause dengan ngQuantity
  const [detection, setDetection] = useState('');      // Mengganti form dengan detection
  const [status, setStatus] = useState<string>('');    // Tambahkan status
  const [month, setMonth] = useState<string>('');      // Tambahkan month
  const [year, setYear] = useState<string>('');        // Tambahkan year
  const [, setError] = useState<string>('');
  const [resErr, setResErr] = useState('')

  const handleSubmitDataNG = async (e: React.FormEvent) => {
    e.preventDefault();
    const operator = localStorage.getItem('username')

    const ncr_date = ncrDate
    const product_name = productName
    const last_process = lastProcess
    const ng_type = ngType
    const ng_quantity = ngQuantity

    try {
      const token = Cookies.get('token')
      const res = await fetch('/api/addData/ng', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { authorization: token })
        },
        body: JSON.stringify({ ncr_date, section, product_name, last_process, customer, value, ng_type, ng_quantity, operator, detection, status, month, year })
      })

      if (!res.ok) {
        const data = await res.json()
        setResErr(data.message)
      } if (res.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        Cookies.remove("token");
        window.location.reload()
      }
      else {
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
            Tambahkan data NG, dan tekan simpan jika sudah selesai
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitDataNG}>
          {resErr && <div className="flex items-center gap-4 p-3 rounded-lg text-white bg-red-500 border border-red-500">
            <AlertCircle />
            <p>{resErr}</p>
          </div>}
          <div className="grid gap-4 py-4">
            <RadioGroup defaultValue="reject" className="flex">
              <Label>Status: </Label>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reject" id="r1" onChange={(e: React.ChangeEvent<HTMLInputElement & HTMLButtonElement>) => setStatus(e.target.value)} />
                <Label htmlFor="r1">Reject</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="repair" id="r2" onChange={(e: React.ChangeEvent<HTMLInputElement & HTMLButtonElement>) => setStatus(e.target.value)} />
                <Label htmlFor="r2">Repair</Label>
              </div>
            </RadioGroup>
            <div className="flex flex-col gap-4">
              <DateInput
                label={"NCR Date"}
                labelPlacement="outside"
                onChange={(date) => setNcrDate(date?.toString())}  // Mengganti setInfoDate dengan setNcrDate
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Section</Label>
              <Select onValueChange={(value) => setSection(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="IN PROCESS">Machining</SelectItem>
                    <SelectItem value="Stamping">Stamping</SelectItem>
                    <SelectItem value="Subcon">Subcon</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Product Name"
                labelPlacement="outside"
                isRequired
                placeholder="Masukkan Nama Produk"
                value={productName}           // Mengganti problem dengan productName
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Last Process"
                labelPlacement="outside"
                isRequired
                placeholder="Masukkan Last Process"
                value={lastProcess}           // Mengganti source dengan lastProcess
                onChange={(e) => setLastProcess(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Value"
                labelPlacement="outside"
                placeholder="Masukkan Nilai"
                type="number"
                value={value}                 // Mengganti item dengan value
                onChange={(e) => setValue(e.target.value)}
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
                label="NG Type"
                labelPlacement="outside"
                isRequired
                placeholder="Masukkan Jenis NG"
                value={ngType}                // Mengganti desc dengan ngType
                onChange={(e) => setNgType(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="NG Quantity"
                labelPlacement="outside"
                isRequired
                placeholder="Masukkan Jumlah NG"
                type="number"
                value={ngQuantity}            // Mengganti cause dengan ngQuantity
                onChange={(e) => setNgQuantity(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Detection</Label>
              <Select onValueChange={(value) => setSection(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a detection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Machining">IN PROCESS</SelectItem>
                    <SelectItem value="NEXT PROCESS">NEXT PROCESS</SelectItem>
                    <SelectItem value="SORTIR">SORTIR</SelectItem>
                    <SelectItem value="CLAIM">CLAIM</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Month"
                labelPlacement="outside"
                isRequired
                placeholder="Masukkan Bulan"
                type="number"
                value={month}                 // Tambah month
                onChange={(e) => setMonth(e.target.value)}
                min={1}
                max={12}
                />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Year"
                labelPlacement="outside"
                isRequired
                placeholder="Masukkan Tahun"
                type="number"
                value={year}                  // Tambah year
                onChange={(e) => setYear(e.target.value)}
                min={2024}
              />
            </div>
          </div>
          <Button type="submit" className="bg-primary">Simpan</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
