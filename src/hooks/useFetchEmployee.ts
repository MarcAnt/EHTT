import { useState, useEffect } from "react";
import { transformedData } from "@/adapters";
import { Employee } from "@/interfaces";

const useFetchEmployee = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const myAbortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: myAbortController.signal });
        const data: Employee[] = await response.json();
        const newData = await transformedData(data);

        setEmployees(newData);

        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(true);
        if (!myAbortController.signal.aborted) {
          console.error(error);
        }
      }
    };

    fetchData();

    return () => {
      setError(false);
      myAbortController.abort();
      setLoading(false);
    };
  }, [url]);

  return {
    loading,
    error,
    employees,
    setEmployees,
  };
};

export default useFetchEmployee;
