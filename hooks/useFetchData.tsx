"use client"

import * as React from "react";


export default function useFetchData(urls: string[]) {
  const [data, setData] = React.useState<Report[][]>([]); // Menyimpan array data untuk masing-masing endpoint
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const allData: Report[][] = [];

        for (const url of urls) {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`Failed to fetch from ${url}`);
          }

          const result: ApiResponse = await res.json();
          const allReport: Report[] = Object.values(result.data);
          allData.push(allReport);
        }

        setData(allData); // Menyimpan data dari kedua endpoint ke dalam array
        console.log(allData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urls]);

  return { data, loading, error };
}
