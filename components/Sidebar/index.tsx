'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Bell, CircleUserRound, LogOut } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button, Card } from "@nextui-org/react"
import { Suspense, useEffect, useState } from "react"
import { siteConfig } from "@/config/site"
import { AppSidebar } from "../app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../ui/sidebar"
import Loading from "../Loading"
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react"
import { format } from "date-fns"
import { CardTitle } from "../ui/card"
import { getToken, getUsername } from "@/utils/auth"

export default function Sidebar({ content }: Readonly<{ content: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const [isXlOrAbove, setIsXlOrAbove] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [data, setData] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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


  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/announcement?date=all`, {
        method: "GET",
        headers: token ? { authorization: token } : {},
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.message)
      } else {
        const result = await res.json();
        setData(result.data)  // pastikan result.data adalah array
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/validation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: Cookies.get("token") }),
        });

        if (!res.ok || res.status === 401) {
          Cookies.remove("token");
          router.push("/login");
        }


      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [router]);

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
      Cookies.remove("token");
      router.push("/login");
    } catch (error) {
      return error;
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex-1 overflow-y-auto">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b w-full">
          <div className="flex justify-between items-center gap-2 px-10 w-full">
            <SidebarTrigger />
            <div className="flex gap-4">
              <Popover backdrop="blur" placement="bottom-end" >
                <PopoverTrigger>
                  <button className="aspect-square">
                    <Bell size={20} color="gray" />
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col px-1 py-2 gap-4 w-80">
                    <div className="flex justify-between">
                      <h1>Notification</h1>
                      <Link href={'/dashboard/announcement'} className="hover:underline underline-offset-2">See More</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                      {data.map((announcement) => (
                        <Card key={announcement._id} className="flex flex-row items-center">
                          <div className="w-24 flex-shrink-0 border-r border-gray-200 p-4 flex flex-col items-center justify-center">
                            <div className="text-lg font-bold">{format(new Date(announcement.created_at), 'd')}</div>
                            <div className="text-xs uppercase">{format(new Date(announcement.created_at), 'MMM yyyy')}</div>
                          </div>
                          <div className="flex flex-col gap-1 justify-center px-3 py-4">
                            <CardTitle>{announcement.title}</CardTitle>
                            <p className="text-xs text-gray-600 ">{announcement.content}</p>
                            <p className="text-xs text-gray-400">Author: {announcement.author}</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Popover backdrop="blur" placement="bottom-end" >
                <PopoverTrigger>
                  <button className="aspect-square">
                    <CircleUserRound color="gray" />
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col px-1 py-2 gap-1">
                    <Button variant="light">{getUsername()}</Button>
                    <Button color="danger" onClick={handleLogout}>Logout</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </header>
        <div>
          <Suspense fallback={<Loading />}>
            <main className="container mx-auto">{content}</main>
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
