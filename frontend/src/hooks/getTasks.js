import { useState } from "react";

const useGetTasks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const getTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const req = await fetch("https://insightboard-m67w.onrender.com/api/get-tasks");
      
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }

      const res = await req.json();
      setData(res || []);
    } catch (err) {
      console.error("Fetch tasks error:", err);
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return { getTasks, loading, error, data, setData };
};

export default useGetTasks;
