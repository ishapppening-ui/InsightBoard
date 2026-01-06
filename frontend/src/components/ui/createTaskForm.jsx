import React, { useState } from "react";
import useCreateTask from "../../hooks/createTask";

const CreateTaskForm = ({ onTaskCreated }) => {
  const {
    createTask,
    createLoading,
    createError,
  } = useCreateTask();

  const [form, setForm] = useState({
    title: "",
    assigned_to: "",
    priority: "medium",
    status: "todo",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    await createTask(form);

    // reset form
    setForm({
      title: "",
      assigned_to: "",
      priority: "medium",
      status: "todo",
    });

    // refresh tasks list (if passed)
    onTaskCreated?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Create Custom Task</h2>

      <input
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        name="assigned_to"
        placeholder="Assigned to"
        value={form.assigned_to}
        onChange={handleChange}
        style={inputStyle}
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      {createError && (
        <p style={{ color: "red", marginBottom: 10 }}>{createError}</p>
      )}

      <button
        type="submit"
        disabled={createLoading}
        style={{
          padding: "12px 20px",
          border: "none",
          borderRadius: 8,
          backgroundColor: "#000",
          color: "#fff",
          cursor: "pointer",
          width: "100%",
        }}
      >
        {createLoading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
};

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #ccc",
};

export default CreateTaskForm;
