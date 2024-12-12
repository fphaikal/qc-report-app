'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@nextui-org/react";
import { Pencil, AlertCircle, Loader2 } from "lucide-react"
import Cookies from "js-cookie";

export default function AddPartDialog() {
  const [resErr, setResErr] = useState(''); // State untuk menampilkan error
  const [, setError] = useState('')
  const [loading, setLoading] = useState<boolean>(false);

  const [part, setPart] = useState<string>('');      // Tambahkan month
  const [customer, setCustomer] = useState<string>('');        // Tambah

  const handleAddData = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = Cookies.get('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/parts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { authorization: token })
        },
        body: JSON.stringify({ part, customer }),
      });

      if (res.ok) {
        setLoading(true)
        window.location.reload(); // Refresh halaman setelah sukses
      } else {
        const data = await res.json();
        setResErr(data.message); // Set error jika ada
      }
      if (res.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        Cookies.remove("token");
        window.location.reload()
      }

    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-fit">+ Tambah Data</Button>
        </DialogTrigger>
        <DialogContent className="h-fit">
          <DialogHeader>
            <DialogTitle>Tambah Part</DialogTitle>
            <DialogDescription>Tambah data part, dan tekan simpan jika sudah selesai</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddData}>
            {resErr && <div className="flex items-center gap-4 p-3 rounded-lg text-white bg-danger border border-red-500 mb-4">
              <AlertCircle />
              <p>{resErr}</p>
            </div>}
            <div className="flex flex-col gap-4">
              <Input
                label="Nama Part"
                labelPlacement="outside"
                placeholder="Masukkan nama part"
                onChange={(e) => setPart(e.target.value)}
              />
              <Input
                label="Customer"
                labelPlacement="outside"
                placeholder="Masukkan nama customer"
                onChange={(e) => setCustomer(e.target.value)}
              />

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
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
