import { useState, useEffect } from "react"
import useGenerateTasks from "../hooks/generateTasks"
import CreateTaskForm from "../components/ui/createTaskForm"

const CreateTasks = () => {
  const [transcript, setTranscript] = useState("")
  const { generateTasks, loading, error, data } = useGenerateTasks()

  const callGenerateTasks = async () => {
    if (!transcript.trim()) return
    await generateTasks(transcript)
  }

  return (
    <>
      <h1>AI Generated Tasks</h1>

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        style={{
          width: 500,
          height: 200,
          display: "block",
          margin: 20,
          padding: 10,
          borderRadius: 12,
        }}
        placeholder="Paste meeting transcript here"
      />

      <button onClick={callGenerateTasks} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data.length > 0 && (
        <ul>
          {data.map((task, index) => (
            <li key={index}>
              <strong>{task.title}</strong>
              <br />
              Assigned to: {task.assigned_to}
              <br />
              Priority: {task.priority}
              <br />
              Status: {task.status}
            </li>
          ))}
        </ul>
      )}

      <CreateTaskForm />
    </>
  )
}

export default CreateTasks
