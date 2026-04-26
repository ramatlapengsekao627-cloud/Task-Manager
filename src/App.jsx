// App.jsx - the root of the entire app
// tasks are now fetched from the backend instead of being hardcoded

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import List from './pages/List'
import Details from './pages/Details'
import AddTask from './pages/AddTask'

// importing api functions from services/api.js
import { getTasks, addTask, deleteTask, completeTask } from './services/api'

function App() {

  // tasks state - starts empty, gets filled from the backend
  const [tasks, setTasks] = useState([])

  // useEffect runs once when the app loads - fetches all tasks from backend
  useEffect(() => {
    fetchTasks()
  }, [])

  // fetches all tasks from the backend and stores them in state
  const fetchTasks = async () => {
    const data = await getTasks()
    setTasks(data)
  }

  // adds a new task to the backend then refreshes the task list
  const handleAddTask = async (newTask) => {
    await addTask(newTask)
    fetchTasks()
  }

  // deletes a task from the backend then refreshes the task list
  const handleDeleteTask = async (id) => {
    await deleteTask(id)
    fetchTasks()
  }

  // marks a task as complete in the backend then refreshes the task list
  const handleCompleteTask = async (id) => {
    await completeTask(id)
    fetchTasks()
  }

  return (
    <BrowserRouter>

      {/* Navbar shows on every page */}
      <Navbar />

      {/* Routes decides which page to show based on the URL */}
      <Routes>
        <Route path="/home" element={<Home tasks={tasks} />} />
        <Route path="/list" element={<List tasks={tasks} />} />
        <Route path="/details/:id" element={<Details tasks={tasks} deleteTask={handleDeleteTask} completeTask={handleCompleteTask} />} />
        <Route path="/add" element={<AddTask addTask={handleAddTask} />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App