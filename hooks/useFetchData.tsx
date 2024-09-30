"use client"

import * as React from "react";

interface ApiResponse {
  code: number;
  message: string;
  data: []
}

export default function useFetchData(url: string) {
  const [data, setData] = React.useState<Report[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const result: ApiResponse = await res.json();

        const allReport: Report[] =  Object.values(result.data)
        setData(allReport);
        console.log(allReport)
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
  }, [url]);

  return { data, loading, error };
}
