import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import MenuBar from "@/components/Dropdown/Menu";

export const metadata: Metadata = {
  title: "Dashboard Quality Pintar",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex justify-between px-5 py-3">
        <MenuBar />
      </div>
      <Suspense fallback={<Loading />} >
        <main className="min-w-0 flex flex-1 mb-5 justify-center">{children}</main>
      </Suspense>
    </div>
  );
}