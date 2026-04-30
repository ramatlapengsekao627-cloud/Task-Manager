// api.js - handles all communication between frontend and backend
// sends the JWT token with every request so backend knows which user is logged in

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// gets the token from localStorage - saved there when user logs in
const getToken = () => localStorage.getItem('token')

// gets all tasks belonging to the logged in user
export const getTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  })
  const data = await response.json()
  return data
}

// adds a new task linked to the logged in user
export const addTask = async (task) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(task)
  })
  const data = await response.json()
  return data
}

// deletes a task by id
export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` }
  })
  const data = await response.json()
  return data
}

// marks a task as complete
export const completeTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` }
  })
  const data = await response.json()
  return data
}