import { useState } from "react";

const useGenerateTasks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const generateTasks = async (transcript) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/create-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Safely set data
      if (result.tasks) {
        setData(result.tasks);
      } else {
        setData([]);
        console.log(result)
        console.warn("Unexpected API response shape:", result);
      }

      return result.tasks || [];
    } catch (err) {
      console.error("API error:", err);
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return { generateTasks, loading, error, data };
};

export default useGenerateTasks;
