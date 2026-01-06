import './App.css'
import Sidebar from './components/ui/Sidebar'
import { Routes, Route } from "react-router";
import CreateTasks from './pages/CreateTasks';
import ViewTasks from './pages/ViewTasks';
import Dashboard from './pages/dashboard';

function App() {

  return (
    <>
      <Sidebar />
    <Routes>
      <Route path="add" element={<CreateTasks />} />
      <Route path="view" element={<ViewTasks />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default App
