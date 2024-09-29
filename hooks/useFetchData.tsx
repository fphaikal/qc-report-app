import * as React from "react";

interface DataType {
  id: number;
  name_part: string;
  process: string;
  operator: string;
  target: number;
  start: number | Date;
  end: number | Date;
  total: number;
  persen: number;
  ok: number;
  ng: number;
  type_ng: string;
  inspection_date: string;
}

export default function useFetchData(url: string) {
  const [data, setData] = React.useState<DataType | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const result = await res.json();
        setData(result);
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
