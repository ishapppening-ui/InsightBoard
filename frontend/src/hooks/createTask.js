import { useState } from "react";

const useCreateTask = () => {
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [createData, setCreateData] = useState(null);

  const createTask = async ({ title, assigned_to, priority, status }) => {
    setCreateLoading(true);
    setCreateError(null);

    try {
      const response = await fetch("https://insightboard-m67w.onrender.com/api/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          assigned_to,
          priority,
          status,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Failed to create task");
      }

      const result = await response.json();
      setCreateData(result);
      return result;
    } catch (err) {
      console.error("Create task error:", err);
      setCreateError(err.message);
      throw err;
    } finally {
      setCreateLoading(false);
    }
  };

  return {
    createTask,
    createLoading,
    createError,
    createData,
  };
};

export default useCreateTask;
