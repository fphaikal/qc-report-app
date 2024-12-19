'use client'

import { useEffect, useState } from "react"
import AddReportDialog from "@/components/Dialog/AddFI";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import ReportTable from "@/components/Table/FI";
import Cookies from "js-cookie"
import { getToken } from "@/utils/auth";

export default function MyReport() {
  const [data, setData] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const username = localStorage.getItem('username')
      const token = getToken();
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/final-inspection/operator`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            ...(token && { authorization: token })
          },
          body: JSON.stringify({ "name": username }),
        });
        if (!res.ok) return 'Network response was not ok';
        if (res.status === 401) {
          localStorage.removeItem("isAuthenticated");
          Cookies.remove("token");
          window.location.reload()
        }
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        setError('Error:' + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  const handleDelete = async (_id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/final-inspection/${_id}`, {
        method: "DELETE"
      })

      if (!res.ok) {
        return res;
      } else {
        window.location.reload()
      }
    } catch (error) {
      return error
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full p-5 md:p-10 min-h-screen">
      <AddReportDialog />
      <div className="rounded-md border">
        <ReportTable data={data} handleDelete={handleDelete} />
      </div>
    </div>
  );
}
