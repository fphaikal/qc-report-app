import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import MenuBar from "@/components/Dropdown/Menu";
import LogoutButton from "@/components/LogoutButton";

export const metadata: Metadata = {
  title: "Dashboard Quality Pintar",
  description: "PT Denapella Lestari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
      <Sidebar content={children} />
  );
}