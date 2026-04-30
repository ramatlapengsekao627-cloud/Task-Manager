// api.js - handles all communication between frontend and backend
// BASE_URL points to backend - uses environment variable on live site, localhost for development

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// gets all tasks from backend
export const getTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`)
  const data = await response.json()
  return data
}

// adds a new task
export const addTask = async (task) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  })
  const data = await response.json()
  return data
}

// deletes a task by id
export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  return data
}

// marks a task as complete
export const completeTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
    method: 'PUT'
  })
  const data = await response.json()
  return data
}