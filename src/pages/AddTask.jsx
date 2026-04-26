// AddTask page - contains a form for the user to create a new task
// receives addTask function from App.jsx through props
// when form is submitted the new task gets added to the central tasks list in App.jsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// addTask comes from App.jsx as a prop
function AddTask({ addTask }) {

  // useNavigate lets us go to list page after submitting the form
  const navigate = useNavigate()

  // form state - stores what the user types in each field
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due: '',
    status: 'Pending'
  })
  const [descriptionRows, setDescriptionRows] = useState(3)

  // errors state - stores validation error messages
  const [errors, setErrors] = useState({})

  // handles input changes - updates formData when user types in any field
  const handleChange = (e) => {
    if (e.target.name === 'due') {
      // only allow digits and slashes for due date
      const value = e.target.value.replace(/[^0-9/]/g, '')
      setFormData({ ...formData, due: value })
    } else if (e.target.name === 'description') {
      const value = e.target.value
      const lines = value.split('\n').length
      setFormData({ ...formData, description: value })
      setDescriptionRows(Math.max(3, Math.min(10, lines)))
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }
  // validates the form - checks that required fields are not empty
  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Please enter a title'
    if (!formData.description.trim()) newErrors.description = 'Please enter a description'
    if (!formData.due) newErrors.due = 'Please enter a due date'
    return newErrors
  }

  // handles form submission
  const handleSubmit = (e) => {
    // prevents page from reloading when form is submitted
    e.preventDefault()

    // runs validation - if there are errors show them and stop
    const foundErrors = validate()
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors)
      return
    }

    // no errors - add the task and go to list page
    addTask(formData)
    navigate('/list')
  }

  return (
    // dark background covering full screen
    <div style={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: 'white' }}>

      <div className="container py-5">

        {/* page heading */}
        <h4 className="fw-bold mb-4">Add New Task</h4>

        {/* form card */}
        <div style={{ backgroundColor: '#1a1a1a', borderRadius: '10px', padding: '30px', maxWidth: '600px' }}>

          <form onSubmit={handleSubmit}>

            {/* title field */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                style={{ backgroundColor: '#0d0d0d', color: 'white', border: '1px solid #333' }}
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
              />
              {/* shows error if title is empty */}
              {errors.title && <p style={{ color: 'red', fontSize: '0.85rem' }}>{errors.title}</p>}
            </div>

            {/* description field */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                style={{ backgroundColor: '#0d0d0d', color: 'white', border: '1px solid #333', resize: 'none' }}
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description"
                rows={descriptionRows}
              />
              {/* shows error if description is empty */}
              {errors.description && <p style={{ color: 'red', fontSize: '0.85rem' }}>{errors.description}</p>}
            </div>

            {/* due date field */}
            <div className="mb-3">
              <label className="form-label">Due Date</label>
              <input
                type="text"
                name="due"
                className="form-control"
                style={{ backgroundColor: '#0d0d0d', color: 'white', border: '1px solid #333' }}
                value={formData.due}
                onChange={handleChange}
                placeholder="DD/MM/YYYY"
              />
              {/* shows error if due date is empty */}
              {errors.due && <p style={{ color: 'red', fontSize: '0.85rem' }}>{errors.due}</p>}
            </div>

            {/* status field */}
            <div className="mb-4">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-select"
                style={{ backgroundColor: '#0d0d0d', color: 'white', border: '1px solid #333' }}
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Complete">Complete</option>
              </select>
            </div>

            {/* submit button */}
            <button type="submit" className="btn btn-primary w-100">Add Task</button>
          </form>

        </div>

      </div>
    </div>
  )
}

export default AddTask