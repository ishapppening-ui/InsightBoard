import React, { useEffect } from "react";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import useGetTasks from "../hooks/getTasks";

const COLORS = ["#e74c3c", "#f1c40f", "#2ecc71"];

const Dashboard = () => {
  const { getTasks, loading, error, data } = useGetTasks();

  useEffect(() => {
    getTasks();
  }, []);

  // ---- Priority Pie Data ----
  const priorityData = Object.entries(
    data.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // ---- Assignee Bar Data ----
  const assigneeData = Object.entries(
    data.reduce((acc, task) => {
      acc[task.assigned_to] = (acc[task.assigned_to] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  if (loading) return <p style={{ textAlign: "center" }}>Loading dashboard...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div style={{ display: "flex", gap: 40, justifyContent: "center", marginBottom: 40 }}>
      
      {/* Priority Pie */}
      <div>
        <h3 style={{ textAlign: "center" }}>Priority Distribution</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={priorityData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {priorityData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Assignee Bar */}
      <div>
        <h3 style={{ textAlign: "center" }}>Tasks per Assignee</h3>
        <BarChart width={400} height={300} data={assigneeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3498db" />
        </BarChart>
      </div>
    </div>
  );
};

export default Dashboard;
