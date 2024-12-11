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
import { siteConfig } from "@/config/site";

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
          {siteConfig.navItems.map((group, index) => {
            if ((group.shortName === "NCR" || group.shortName === "IPR" || group.shortName === "ADM") && role !== "admin") {
              return null;
            }

            return (
              <div key={index}>
                <DropdownMenuLabel>
                  {group.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {group.menuItems.map((item, index) => (
                  <DropdownMenuItem key={index}>
                    <Link href={item.route} className="w-full">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}