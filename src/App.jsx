// App.jsx - root of the entire app
// handles routing, task state and authentication state

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import List from './pages/List'
import Details from './pages/Details'
import AddTask from './pages/AddTask'
import Login from './pages/Login'
import Register from './pages/Register'
import { getTasks, addTask, deleteTask, completeTask } from './services/api'

function App() {

  // tasks state - stores all tasks fetched from backend
  const [tasks, setTasks] = useState([])

  // user state - stores logged in user info
  // checks localStorage first so user stays logged in after page refresh
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  // fetches tasks when app loads and whenever user changes
  useEffect(() => {
    if (user) fetchTasks()
  }, [user])

  // fetches all tasks from the backend
  const fetchTasks = async () => {
    const data = await getTasks()
    setTasks(data)
  }

  // adds a new task
  const handleAddTask = async (newTask) => {
    await addTask(newTask)
    fetchTasks()
  }

  // deletes a task
  const handleDeleteTask = async (id) => {
    await deleteTask(id)
    fetchTasks()
  }

  // marks a task as complete
  const handleCompleteTask = async (id) => {
    await completeTask(id)
    fetchTasks()
  }

  // logs the user out - clears localStorage and resets user state
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <BrowserRouter>

      {/* Navbar only shows when user is logged in */}
      {user && <Navbar onLogout={handleLogout} user={user} />}

      <Routes>

        {/* if user is not logged in redirect to login page */}
        <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />

        {/* login and register pages - accessible without being logged in */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* protected pages - only accessible when logged in */}
        <Route path="/home" element={user ? <Home tasks={tasks} /> : <Navigate to="/login" />} />
        <Route path="/list" element={user ? <List tasks={tasks} /> : <Navigate to="/login" />} />
        <Route path="/details/:id" element={user ? <Details tasks={tasks} deleteTask={handleDeleteTask} completeTask={handleCompleteTask} /> : <Navigate to="/login" />} />
        <Route path="/add" element={user ? <AddTask addTask={handleAddTask} /> : <Navigate to="/login" />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App