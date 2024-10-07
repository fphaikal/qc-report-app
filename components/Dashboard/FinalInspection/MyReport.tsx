'use client'

import { useEffect, useState } from "react"
import AddReportDialog from "@/components/Dialog/AddFI";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import ReportTable from "@/components/Table/FI";

export default function MyReport() {
  const [data, setData] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const username = localStorage.getItem('username')
      try {
        const res = await fetch(`http://localhost:2025/api/report/final-inspection/operator`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "name": username }),
        });
        if (!res.ok) return 'Network response was not ok';
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

  if (loading) return <Loading/>;
  if (error) return <Error error={error}/>;
  
  

  const handleEdit = async () => {

  }

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:2025/api/report/final-inspection/${id}`, {
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
        <ReportTable data={data} handleEdit={handleEdit} handleDelete={handleDelete}/>
      </div>
    </div>
  );
}
