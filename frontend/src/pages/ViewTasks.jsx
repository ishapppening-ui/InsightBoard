import React, { useEffect } from "react";
import useGetTasks from "../hooks/getTasks";
import useDeleteTask from "../hooks/deleteTask";

const ViewTasks = () => {
  const { getTasks, loading, error, data, setData} = useGetTasks();
  const {deleteLoading, deleteError, deleteTask} = useDeleteTask()
  
  useEffect(() => {
      getTasks();
    }, []);
    
    const handleDelete = async (id) => {
  setData(prev => prev.filter(task => task.id !== id)); // instant UI

  try {
    await deleteTask(id);
  } catch (err) {
    console.error(err);
    getTasks(); // rollback
  }
};


  return (
    <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30, color: "#81b3e4ff" }}>Tasks Dashboard</h1>

      {loading && (
        <p style={{ textAlign: "center", color: "#2980b9" }}>Loading tasks...</p>
      )}

      {error && (
        <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
          {error}
        </p>
      )}

      {data.length > 0 ? (
        <div style={{ display: "grid", gap: "20px" }}>
          {data.map((task, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                borderLeft: `6px solid ${
                  task.priority === "high"
                    ? "#e74c3c"
                    : task.priority === "medium"
                    ? "#f1c40f"
                    : "#2ecc71"
                }`,
               
              }}
            >
              <h2 style={{ margin: "0 0 10px", color: "#75a2cfff" }}>{task.title}</h2>
              <p style={{ margin: "4px 0" }}>
                <strong>Assigned to:</strong> {task.assigned_to}
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Priority:</strong> {task.priority}
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Status:</strong> {task.status}
              </p>
              {console.log(task.id)}
              <button
                onClick={() => handleDelete(task.id)}
                style={{
                  border: "none",
                  cursor: "pointer",
                  color: "#e74c3c",
                  padding: 0,
                }}
                title="Delete Task"
              >
                delete
              </button>
            </div>
          ))}
        </div>
      ) : !loading ? (
        <p style={{ textAlign: "center", color: "#7f8c8d" }}>
          No tasks available.
        </p>
      ) : null}
    </div>
  );
};

export default ViewTasks;
