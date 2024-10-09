'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { House, File, FileSpreadsheet, CircleUserRound, LogOut, LayoutDashboard } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const menuGroups = [
  {
    name: "Final Inspection",
    shortName: "FI",
    menuItems: [
      {
        label: "Home",
        icon: House,
        route: "/dashboard"
      },
      {
        label: "My Report",
        icon: File,
        route: "/dashboard/myreport"
      }
    ]
  },
  {
    name: "Non Conformity Report",
    shortName: "NCR",
    menuItems: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        route: "/dashboard/ncr"
      },
      {
        label: "Report",
        icon: FileSpreadsheet,
        route: "/dashboard/ncr/report"
      }
    ]
  },
  {
    name: "Internal Problem Report",
    shortName: "IPR",
    menuItems: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        route: "/dashboard/ipr"
      },
      {
        label: "Report",
        icon: FileSpreadsheet,
        route: "/dashboard/ipr/report"
      }
    ]
  },
]

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isXlOrAbove, setIsXlOrAbove] = useState(false);

  // Check screen size to determine if it's xl or larger
  useEffect(() => {
    const handleResize = () => {
      setIsXlOrAbove(window.innerWidth >= 1280); // 1280px is the threshold for xl in Tailwind
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <div className="sticky md:flex flex-none flex-col justify-between h-screen hidden gap-2 p-5 w-fit 2xl:w-[300px] bg-primary top-0 shrink-0 overflow-hidden">
      <div className="flex flex-col">
        <Link href={'/'} className="flex flex-col items-center gap-2">
          <Image className="w-12 xl:w-28" src='/logo.png' alt="" width={100} height={100} priority />
          <h1 className="text-white text-center text-xl font-semibold hidden xl:block">Quality Pintar</h1>
        </Link>

        <div className="mt-5 lg:mt- ">
          {menuGroups.map((group, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h2 className="text-white/40 text-sm font-semibold text-center xl:text-left mt-5">
                {isXlOrAbove ? group.name : group.shortName}
              </h2>
              {group.menuItems.map((item, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href={item.route} key={index} className={item.route === pathname ? "flex flex-row gap-2 bg-white/10 px-4 py-2 rounded-xl" : "flex flex-row gap-2 hover:bg-white/10 duration-200 px-4 py-2 rounded-xl"}>
                        <item.icon size={20} color="white" />
                        <p className="text-white text-sm font-semibold hidden xl:block">
                          {isXlOrAbove ? item.label : group.shortName}
                        </p>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent align="start" key={item.label}>
                      <p>{item.label} </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          ))}
        </div>  
      </div>
      <div className="flex flex-col xl:flex-row items-center justify-between w-full gap-2">
        <Link href={'/profile'} className="flex flex-row gap-2 hover:bg-white/10 px-4 py-2 rounded-xl w-full">
          <CircleUserRound size={20} color="white" />
          <p className="text-white text-sm font-semibold hidden xl:block"></p>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="bg-transparent shadow-none rounded-xl hover:bg-white/10" onClick={handleLogout}><LogOut size={20} color="white" className="hover" /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
