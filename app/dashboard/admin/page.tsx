'use client'

import { useEffect, useState } from "react"
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { Button, Card, CardHeader, Divider } from "@nextui-org/react";
import React from "react";
import { CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Cookies from "js-cookie";
import { siteConfig } from "@/config/site";

const token = Cookies.get('token')

const AdminMenu = [
  {
    title: "Announcement",
    description: "Manage announcement",
    route: "/dashboard/admin/announcement",
  },
  {
    title: "Parts Data",
    description: "Manage parts data",
    route: "/dashboard/admin/parts",
  },
  {
    title: "User Management",
    description: "Manage users",
    route: "/dashboard/admin/users",
  },
]

const exportExcel = [
  {
    title: "Final Inspection",
    key: "final-inspection",
    button: [
      {
        title: "Export All Data",
        fileName: "Final Inspection",
        route: "all",
      },
    ],
  },
  {
    title: "Non Conformity Report",
    key: "ncr",
    button: [
      {
        title: "Export All Data",
        fileName: "Non Conformity Report",
        route: "all",
      },
    ],
  },
  {
    title: "Internal Problem Report",
    key: "ipr",
    button: [
      {
        title: "Export All Data",
        fileName: "Internal Problem Report",
        route: "all",
      },
    ],
  },
  {
    title: "NG Data",
    key: 'ngData',
    button: [
      {
        title: "Export All Data",
        fileName: "NG Data",
        route: "all",
      },
      {
        title: "Export by Type",
        fileName: "NG Data by Type",
        route: "typeNg",
      },
      {
        title: "Export by QTY",
        fileName: "NG Data by QTY",
        route: "totalQtyNg  ",
      },

    ],
  }
]

export default function HomeAdmin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (key: string, params: string, fileName: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/${key}/exportExcel?type=${params}`, {
        method: "GET",
        headers: token ? {
          authorization: token, "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        } : {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }
      });

      if (!response.ok) {
        return ("Failed to download file");
      }

      const blob = await response.blob(); // Mengubah response menjadi Blob (binary data)
      const url = window.URL.createObjectURL(blob); // Membuat URL dari Blob

      // Membuat elemen <a> untuk mendownload file
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.xlsx`; // Nama file yang akan didownload
      document.body.appendChild(a);
      a.click(); // Memicu klik agar file terdownload
      a.remove(); // Menghapus elemen <a> setelah selesai

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="flex flex-col gap-5 w-full p-5 md:p-10">
      <h1 className="text-3xl font-bold">Admin Menu</h1>
        {siteConfig.navItems.map((site) => site.shortName === 'ADM' && (
          <div className="flex gap-4 w-full">
            {site.menuItems.map((menu, index) => (
              <Link key={index} href={menu.route} className="w-full">
                <Card isPressable shadow="sm" className="w-full">
                  <CardHeader className="py-4 px-4 flex-col items-start">
                    <CardTitle>{menu.label}</CardTitle>
                    <p className="text-sm text-gray-500"></p>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        ))}
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Export Excel</h1>
        <div className="flex flex-col gap-2">
          {exportExcel.map((menu, index) => (
            <div  key={index} className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <div className="flex w-1/3">
                  <h1 className="text-md">{menu.title}</h1>
                </div>
                <div className="flex gap-2 w-2/3">
                  {menu.button.map((button, index) => (
                    <Button key={index} onClick={() => handleDownload(menu.key, button.route, button.fileName)} size="sm" color="success" variant="flat">{button.title}</Button>
                  ))}
                </div>
              </div>
              <Divider key={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
