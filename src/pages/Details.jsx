// Details page - shows full information of a single task
// has edit, delete and mark as complete functionality
// when edit button is clicked, the page switches to edit mode showing editable fields

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// tasks, deleteTask and completeTask all come from App.jsx as props
function Details({ tasks, deleteTask, completeTask }) {

  // useParams gets the id from the URL - example: /details/1 gives us id = 1
  const { id } = useParams()

  // useNavigate lets us go to another page when a button is clicked
  const navigate = useNavigate()

  // finds the task whose id matches the id in the URL
  const task = tasks.find(task => task.id === parseInt(id))

  // editMode - false means show task info, true means show editable fields
  const [editMode, setEditMode] = useState(false)

  // editData - stores the current values of the editable fields
  // starts with the existing task values so the fields are pre filled
  const [editData, setEditData] = useState({
    title: task ? task.title : '',
    description: task ? task.description : '',
    due: task ? task.due : '',
    status: task ? task.status : 'Pending'
  })

  // if no task is found with that id show this message instead of crashing
  if (!task) {
    return (
      <div style={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: 'white' }} className="container py-5">
        <p>Task not found.</p>
      </div>
    )
  }

  // handles input changes when user types in the edit fields
  // updates editData with the new value
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value })
  }

  // handles delete - removes the task from the database then goes back to list page
  const handleDelete = () => {
    deleteTask(task.id)
    navigate('/list')
  }

  // handles mark as complete - updates the task status in the database
  const handleComplete = () => {
    completeTask(task.id)
  }

  // handles save after editing
  // sends updated task data to the backend then reloads the page to show new values
  const handleSave = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify(editData)
  })
    // turns off edit mode
    setEditMode(false)
    // reloads the page so the updated task info is fetched from the backend
    window.location.reload()
  }

  return (
    // dark background covering full screen
    <div style={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: 'white' }}>
      <div className="container py-5">

        {/* back button - takes user back to the list page */}
        <button className="btn btn-outline-light mb-4" onClick={() => navigate('/list')}>
          Back to Tasks
        </button>

        {/* task details card */}
        <div style={{ backgroundColor: '#1a1a1a', borderRadius: '10px', padding: '30px' }}>

          {/* conditional rendering - if editMode is true show edit fields, if false show plain text */}
          {editMode ? (
            <>
              {/* editable title field */}
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  style={{ backgroundColor: '#0d0d0d', color: 'white', border: '1px solid #333' }}
                  value={editData.title}
                  onChange={handleChange}
                />
              </div>

              {/* editable description field */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  style={{ backgroundColor: '#0d0d0d', color: 'white', border: '1px solid #333' }}
                  value={editData.description}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              {/* editable due date field */}
              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input
                  type="text"
                  name="due"
                  className="form-control"
                  style={{ backgroundColor: '#0d0d0d', color: 'white', border: '1px solid #333' }}
                  value={editData.due}
                  onChange={handleChange}
                />
              </div>

              {/* editable status dropdown */}
              <div className="mb-4">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-select"
                  style={{ backgroundColor: '#0d0d0d', color: 'white', border: '1px solid #333' }}
                  value={editData.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>

              {/* save changes or cancel and go back to view mode */}
              <div className="d-flex gap-3">
                <button className="btn btn-success" onClick={handleSave}>Save</button>
                <button className="btn btn-outline-light" onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              {/* plain text task info shown when not in edit mode */}
              <h4 className="fw-bold mb-3">{task.title}</h4>
              <p className="text-secondary mb-3">{task.description}</p>
              <p className="mb-2"><span className="text-secondary">Due: </span>{task.due}</p>

              {/* status badge - green for complete, yellow for pending */}
              <p className="mb-4">
                <span className="text-secondary">Status: </span>
                <span className={`badge ${task.status === 'Complete' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {task.status}
                </span>
              </p>

              {/* action buttons */}
              <div className="d-flex gap-3">

                {/* mark as complete only shows if task is still pending */}
                {task.status !== 'Complete' && (
                  <button className="btn btn-success" onClick={handleComplete}>Mark as Complete</button>
                )}

                {/* edit button - switches to edit mode */}
                <button className="btn btn-outline-light" onClick={() => setEditMode(true)}>Edit</button>

                {/* delete button - removes task and goes back to list */}
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>

              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default Details