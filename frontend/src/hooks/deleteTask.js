import { useState } from "react";

const useDeleteTask = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteTask = async (id) => {
    setDeleteLoading(true);
    setDeleteError(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/delete-task", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error(`Failed to delete task (${res.status})`);
      }

      const result = await res.json();
      return result; // important for UI updates
    } catch (err) {
      setDeleteError(err.message);
      throw err; // let component decide what to do
    } finally {
      setDeleteLoading(false);
    }
  };

  return { deleteLoading, deleteError, deleteTask };
};

export default useDeleteTask;
