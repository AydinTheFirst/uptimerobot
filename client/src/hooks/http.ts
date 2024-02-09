import { http } from "@/http";
import { useEffect, useState } from "react";

interface IUseHttp {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body: any;
}

interface Response<T> {
  isLoading: boolean;
  error: any;
  data: T | undefined;
  setData: (data: T) => void;
}

export const useHttp = <T>({ url, method, body }: IUseHttp): Response<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState<T>();

  useEffect(() => {
    const controller = new AbortController();
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await http.makeRequest(url, body, method);
        setData(response);
      } catch (err: any) {
        setError(err);
      }
      setIsLoading(false);
    };
    fetch();
    return () => {
      controller.abort();
    };
  }, [url, method, body]);

  return { isLoading, error, data, setData };
};
