import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@nextui-org/react";
import { DateInput } from "@nextui-org/react";
import { AlertCircle, Loader2 } from "lucide-react";
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
  interface Part {
    _id: number;
    part: string;
    customer: string;
  }

  const [parts, setParts] = useState<Part[]>([]) // Tambahkan state parts
  const [ncrDate, setNcrDate] = useState<string>('');  // Mengganti infoDate dengan ncrDate
  const [section, setSection] = useState('');          // Mengganti deptSection dengan section
  const [productName, setProductName] = useState('');  // Mengganti problem dengan productName
  const [customer, setCustomer] = useState('');
  const [lastProcess, setLastProcess] = useState('');  // Mengganti source dengan lastProcess
  const [value, setValue] = useState('');              // Mengganti item dengan value
  const [ngType, setNgType] = useState('');            // Mengganti desc dengan ngType
  const [ngQuantity, setNgQuantity] = useState('');    // Mengganti cause dengan ngQuantity
  const [detection, setDetection] = useState('');      // Mengganti form dengan detection
  const [status, setStatus] = useState<string>('reject'); // Pastikan ada default value untuk status
  const [month, setMonth] = useState<string>('');      // Tambahkan month
  const [year, setYear] = useState<string>('');        // Tambahkan year
  const [, setError] = useState<string>('');
  const [resErr, setResErr] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/parts`, {
        method: "GET",
        headers: token ? { authorization: token } : {},
      })

      if (!res.ok) {
        const data = await res.json()
        setResErr(data.message)
      }

      const result = await res.json();
      setParts(result.data)

      console.log(result)
    }
    fetchData()
  }, [])

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
        headers: token ? { authorization: token } : {},
        body: JSON.stringify({
          ncr_date, section, product_name, last_process, customer, value,
          ng_type, ng_quantity, operator, detection, status, month, year  // Pastikan status terkirim
        })
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
      const selectedPart = parts.find((part) => part.part === value);
    }
  }

  const handleProductChange = (value: string) => {
    // Cari part berdasarkan product name yang dipilih
    const selectedPart = parts.find((part: any) => part.part === value);

    // Set productName dan customer secara otomatis
    setProductName(value);
    if (selectedPart) {
      setCustomer(selectedPart.customer);  // Set customer berdasarkan data dari part
    }
  };

  const handleDateChange = (date: string) => {
    setNcrDate(date);
    const parsedDate = new Date(date);
    setMonth((parsedDate.getMonth() + 1).toString());  // Get month (1-indexed)
    setYear(parsedDate.getFullYear().toString());     // Get year
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
            Tambahkan data NG, dan tekan simpan jika sudah selesai
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitDataNG}>
          {resErr && <div className="flex items-center gap-4 p-3 rounded-lg text-white bg-danger border border-red-500">
            <AlertCircle />
            <p>{resErr}</p>
          </div>}
          <div className="grid gap-4 py-4">
            <RadioGroup defaultValue={status} onValueChange={(value) => setStatus(value)} className="flex"> {/* Pastikan setStatus berjalan */}
              <Label>Status: </Label>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reject" id="r1" />
                <Label htmlFor="r1">Reject</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="repair" id="r2" />
                <Label htmlFor="r2">Repair</Label>
              </div>
            </RadioGroup>
            <div className="flex flex-col gap-4">
              <DateInput
                label={"Date"}
                labelPlacement="outside"
                onChange={(date) => handleDateChange(date?.toString() || '')}  // Mengganti setInfoDate dengan handleDateChange
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
                    <SelectItem value="Molding Roof">Molding Roof</SelectItem>
                    <SelectItem value="Slitting">Slitting</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Name Part</Label>
              <Select onValueChange={handleProductChange}> {/* Menggunakan handleProductChange */}
                <SelectTrigger>
                  <SelectValue placeholder="Select a name part" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {parts.map((part: any) => (
                      <SelectItem key={part._id} value={part.part}>{part.part} - {part.customer} </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Input
              isDisabled
              label="Customer"
              labelPlacement="outside"
              isRequired
              placeholder="Masukkan nama customer"
              value={customer} // Customer otomatis terisi
              onChange={(e) => setCustomer(e.target.value)}
            />
            <Input
              label="Last Process"
              labelPlacement="outside"
              isRequired
              placeholder="Masukkan Last Process"
              value={lastProcess}           // Mengganti source dengan lastProcess
              onChange={(e) => setLastProcess(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4 mt-4">
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
            <div className="flex flex-col gap-2 mb-4">
              <Label>Detection</Label>
              <Select onValueChange={(value) => setDetection(value)}>
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
