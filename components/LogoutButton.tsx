'use client'

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });

      const data = await res.json();

      if (!res.ok) {
        return data.message;
      }

      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("username");
      router.push("/login");
    } catch (error) {
      return error;
    }
  }


  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="flex md:hidden bg-transparent shadow-none rounded-xl hover:bg-white/10" onClick={handleLogout}><LogOut size={20} color="black" className="hover" /></Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Logout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}