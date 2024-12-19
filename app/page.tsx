'use client'

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getToken } from "@/utils/auth";

export default function Home() {
  const router = useRouter();
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
          localStorage.removeItem("isAuthenticated");
          Cookies.remove("token");
          router.push("/login");
        }

        
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-screen p-5 md:p-20 bg-primary">
      <div className="flex items-center justify-center ">
        <h1 className="text-3xl xl:text-8xl font-bold text-white text-center">Selamat Datang di <br />Denapella Quality Control Portal</h1>
      </div>
      <div className="flex flex-col gap-2 md:gap-5 w-full items-center justify-center ">
        <Link href={'/login'}>
          <p className="bg-secondary md:text-2xl text-primary font-semibold rounded-xl px-8 py-3">Get Started</p>
        </Link>
      </div>
    </div>
  );
}
