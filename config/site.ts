export type SiteConfig = typeof siteConfig;
import { House, File, FileSpreadsheet, CircleUserRound, LogOut, LayoutDashboard, FileMinus, Grid2x2Plus, ChartNoAxesCombined, Component } from "lucide-react"

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      name: "Final Inspection & Outgoing",
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
      name: "Data NG",
      shortName: "NG",
      menuItems: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          route: "/dashboard/ngData"
        },
        {
          label: "Input NG",
          icon: FileSpreadsheet,
          route: "/dashboard/ngData/report"
        },
        {
          label: "Data Jenis NG",
          icon: FileMinus,
          route: "/dashboard/ngData/report/type-ng"
        },
        {
          label: "Total QTY NG",
          icon: Grid2x2Plus,
          route: "/dashboard/ngData/report/total-qty-ng"
        },
        {
          label: "Chart NG",
          icon: ChartNoAxesCombined,
          route: "/dashboard/ngData/report/chart"
        },
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
    {
      name: "Admin Menu",
      shortName: "ADM",
      route: "/dashboard/admin",
      menuItems: [
        {
          label: "Announcement",
          icon: Component,
          route: "/dashboard/admin/announcement"
        },
        {
          label: "Parts Data",
          icon: Component,
          route: "/dashboard/admin/parts-data"
        },
        {
          label: "User Management",
          icon: Component,  
          route: "/dashboard/admin/users"
        },
      ]
    }
  ],
  links: {
    github: "https://github.com/fphaikal",
  },
};