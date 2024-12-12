import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "../ui/dialog";
import { ReportTableProps } from "@/types/Table";

export default function DeleteDialog({ id, handleDelete }: { id: number, handleDelete: (id: number) => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-red-500 text-white rounded-md w-fit p-2">
          <Trash2 className="" size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md w-72">
        <DialogHeader className="flex flex-col gap-1">
          <div className="flex justify-center ">
            <div className="flex aspect-auto size-14 items-center justify-center rounded-full bg-danger/10 text-sidebar-primary-foreground ">
              <Trash2 className="text-danger" size={24} />
            </div>
          </div>
          <DialogTitle className="text-center">Hapus Data</DialogTitle>
          <DialogDescription className="text-center">
            Apakah anda yakin ingin <br />menghapus data ini?
          </DialogDescription>
        </DialogHeader>
        <DialogDescription>
          <div className="flex flex-col gap-2 items-center w-full">
            <Button onClick={() => handleDelete(id)} className="bg-danger text-white rounded-md w-2/3  p-2">
              <p>Iya, Hapus</p>
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="w-2/3">
                Tidak, Tetap Simpan
              </Button>
            </DialogClose>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}