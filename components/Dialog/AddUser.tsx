'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@nextui-org/react";
import { Pencil, AlertCircle, Loader2 } from "lucide-react"
import Cookies from "js-cookie";
import { getToken } from "@/utils/auth";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";

export default function AddUserDialog() {
  const [resErr, setResErr] = useState(''); // State untuk menampilkan error
  const [, setError] = useState('')
  const [loading, setLoading] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const handleAddData = async (e: React.FormEvent) => {
    e.preventDefault();
    const author = localStorage.getItem('username')

    try {
const token = getToken();      const res = await fetch(`/api/addData/user`, {
        method: "POST",
        headers: {
          "password-Type": "application/json",
          ...(token && { authorization: token })
        },
        body: JSON.stringify({ username, password, role }),
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
            <DialogTitle>Tambah User</DialogTitle>
            <DialogDescription>Tambah user, dan tekan simpan jika sudah selesai</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddData}>
            {resErr && <div className="flex items-center gap-4 p-3 rounded-lg text-white bg-danger border border-red-500 mb-4">
              <AlertCircle />
              <p>{resErr}</p>
            </div>}
            <div className="flex flex-col gap-4">
              <Input
                label="Username"
                labelPlacement="outside"
                placeholder="Masukkan username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                labelPlacement="outside"
                placeholder="Masukkan password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex flex-col gap-2">
                <Label>Role</Label>
                <Select onValueChange={(value) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='admin'>Admin</SelectItem>
                      <SelectItem value='user'>User</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
