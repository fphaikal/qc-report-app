import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { getRole } from "@/utils/auth"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-auto size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image src="/logo.png" alt="Logo" width={32} height={32} />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">PT Denapella Lestari</span>
                  <span className="">Quality Pintar</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {siteConfig.navItems.map((item) => {
              if ((item.shortName === "NCR" || item.shortName === "IPR" || item.shortName === "ADM") && getRole() !== "admin") {
                return null;
              }

              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link href={item.route ?? ""} className="font-medium">
                      {item.name}
                    </Link>
                  </SidebarMenuButton>
                  {item.menuItems?.length ? (
                    <SidebarMenuSub>
                      {item.menuItems.map((item) => (
                        <SidebarMenuSubItem key={item.label}>
                          <SidebarMenuSubButton asChild isActive={item.route === pathname}>
                            <a href={item.route} aria-current={pathname === item.route ? 'page' : undefined}>{item.label}</a>

                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
