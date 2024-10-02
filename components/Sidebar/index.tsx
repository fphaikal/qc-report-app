'use client'

import Image from "next/image"
import Link from "next/link"
import { House, File, CircleUserRound } from "lucide-react"
import  {usePathname}  from "next/navigation"

const menuGroups = [
  {
    name: "Menu",
    menuItems: [
      {
        label: "Home",
        icon: House,
        route: "/dashboard/final-inspection"
      },
      {
        label: "My Report",
        icon: File,
        route: "/dashboard/final-inspection/myreport"
      }
    ]
  }
]

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      <div className="md:flex flex-none flex-col justify-between min-h-screen gap-2 p-5 hidden w-fit 2xl:w-[300px] bg-primary top-0 shrink-0 overflow-hidden">
        <div className="flex flex-col">
          <Link href={'/'} className="flex flex-col items-center gap-2">
            <Image className="w-12 xl:w-28" src='/logo.png' alt="" width={100} height={100} priority/>
            <h1 className="text-white text-center text-xl font-semibold hidden xl:block">Final Inspection</h1>
          </Link>

          <div className="mt-5 lg:mt-9 ">
            {menuGroups.map((group, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h2 className="text-white/40 text-sm font-semibold text-center xl:text-left">{group.name}</h2>
                {group.menuItems.map((item, index) => (
                  <Link href={item.route} key={index} className={item.route === pathname ? "flex flex-row gap-2 bg-white/10 px-4 py-2 rounded-xl" : "flex flex-row gap-2 hover:bg-white/10 duration-200 px-4 py-2 rounded-xl"}>
                    <item.icon size={20} color="white" />
                    <p className="text-white text-sm font-semibold hidden xl:block">{item.label}</p>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <Link href={'/profile'} className="flex flex-row gap-2 hover:bg-white/10 px-4 py-2 rounded-xl">
            <CircleUserRound size={20} color="white" />
            <p className="text-white text-sm font-semibold hidden xl:block">Profile</p>
          </Link>
        </div>
      </div>
    </>
  )
}