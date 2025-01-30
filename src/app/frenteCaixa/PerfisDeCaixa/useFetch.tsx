import { useEffect, useState } from "react";
import api from "@/api/api";

export function useFetch<T = unknown>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    api.get(url)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message || "Erro desconhecido");
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, [url]);

  return { data, error, loading };
};

export function useFetchById<T = unknown>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    api.get(url)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message || "Erro desconhecido");
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, [url]);

  return { data, error, loading };
};
