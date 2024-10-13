"use client"

import * as React from "react";
import Cookies from "js-cookie"

export default function useFetchData(urls: string[]) {
  const [data, setData] = React.useState<Report[][]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!urls.length) return;

    const fetchData = async () => {
      try {
        setLoading(true); // Pastikan loading diset true saat mulai fetch
        const allData: Report[][] = [];
        const token = Cookies.get("token");

        for (const url of urls) {
          const res = await fetch(url, {
            headers: token ? { authorization: token } : {}
          });
          if (!res.ok) {
            throw new Error(`Failed to fetch from ${url}`);
          } 

          const result: ApiResponse = await res.json();
          const allReport: Report[] = Object.values(result.data);
          allData.push(allReport);
        }

        setData(allData);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urls]); // urls sebagai dependensi untuk memicu fetch ulang jika berubah

  return { data, loading, error };
}
