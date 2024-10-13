'use client'

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuBar() {
  const [username, setUsername] = useState<string>('');
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsername(localStorage.getItem("username") || "");
      setRole(localStorage.getItem("role") || "");
    }
  }, []);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="flex md:hidden">
            <Menu className="h-4 w-4 text-center" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Final Inspection</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><Link href={'/dashboard'}>Home</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href={'/dashboard/myreport'}>My Report</Link></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Data NG</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><Link href={'/dashboard/ngData'}>Dashboard</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href={'/dashboard/ngData/report'}>Input NG</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href={'/dashboard/ngData/report/type-ng'}>Data Jenis NG</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href={'/dashboard/ngData/report/total-qty-ng'}>Total QTY NG</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href={'/dashboard/ngData/report/chart'}>Chart NG</Link></DropdownMenuItem>
          {role === 'admin' && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Non Conformity Report</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href={'/dashboard/ncr'}>Dashboard</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href={'/dashboard/ncr/report'}>Report</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Internal Problem Report</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href={'/dashboard/ipr'}>Dashboard</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href={'/dashboard/ipr/report'}>Report</Link></DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}