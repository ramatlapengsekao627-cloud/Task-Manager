// App.jsx - the root of the entire app
// tasks are stored here so every page shares the same data
// when tasks change on any page, all pages see the update

import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

// importing all pages
import Home from './pages/Home'
import List from './pages/List'
import Details from './pages/Details'
import AddTask from './pages/AddTask'

function App() {

  // tasks live here now - one central place for all pages to use
  // useState stores the list and lets us update it from any page
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Finish assignment', due: 'Tomorrow', status: 'Pending', description: 'Complete the React midterm project' },
    { id: 2, title: 'Buy groceries', due: 'Friday', status: 'Complete', description: 'Milk, bread, eggs and vegetables' },
    { id: 3, title: 'Study for exam', due: 'Next week', status: 'Pending', description: 'Cover chapters 4 to 7' },
  ])

   // adds a new task to the list - called from AddTask page
  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1, status: 'Pending' }])
  }


  // deletes a task by id - called from Details page
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // marks a task as complete by id - called from Details page
  const completeTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: 'Complete' } : task
    ))
  }

  return (
    <BrowserRouter>

      {/* Navbar shows on every page - its outside of routes */}
      <Navbar />

      {/* Routes decides which page to show based on the URL */}
      {/* each page receives tasks and functions as props */}
      <Routes>
        <Route path="/home" element={<Home tasks={tasks} />} />
        <Route path="/list" element={<List tasks={tasks} />} />
        <Route path="/details/:id" element={<Details tasks={tasks} deleteTask={deleteTask} completeTask={completeTask} />} />
        <Route path="/add" element={<AddTask addTask={addTask} />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App