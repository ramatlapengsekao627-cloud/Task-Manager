// api.js - handles all communication between the React frontend and the backend
// This file defines functions that make HTTP requests to the backend API to get, add, delete, and update tasks.
const BASE_URL = 'http://localhost:5000'

// gets all tasks from the backend
export const getTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`)
  const data = await response.json()
  return data
}

// adds a new task by sending it to the backend
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

// updates a task status to complete
export const completeTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
    method: 'PUT'
  })
  const data = await response.json()
  return data
}