'use client'

import { useEffect, useState } from "react"
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import NGTable from "@/components/Table/NG";
import AddDataNGDialog from "@/components/Dialog/AddNG";
import Cookies from "js-cookie"

const token = Cookies.get('token')

export default function NGReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const username = localStorage.getItem('username')

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/ngData/operator`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json',
            ...(token && { authorization: token })
           },
          body: JSON.stringify({ "name": username }),
        });
        if (!res.ok) return 'Network response was not ok';
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        setError('Error: ' + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading/>;
  if (error) return <Error error={error}/>;
  

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/ngData/${id}`, {
        method: "DELETE",
        headers: token ? { authorization: token } : {}
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
      <AddDataNGDialog/>
      <div className="rounded-md border">
        <NGTable data={data} handleDelete={handleDelete}/>
      </div>
    </div>
  );
}
