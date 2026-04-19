// Details page - shows full information of a single task
// user gets here by clicking a task card on the List page

import { useParams, useNavigate } from 'react-router-dom'

// all tasks, deleteTask and completeTask(props) come from App.jsx
function Details({ tasks, deleteTask, completeTask}) {

  // useParams gets the id from the URL 
  const { id } = useParams()

  // useNavigate lets us go back to the list page
  const navigate = useNavigate()

  // finds the task whose id matches the id in the URL
  const task = tasks.find(task => task.id === parseInt(id))

  // if no task is found show this message
  if (!task) {
    return (
      <div style={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: 'white' }} className="container py-5">
        <p>Task not found.</p>
      </div>
    )
  }

   // handles delete - removes task then goes back to list page
  const handleDelete = () => {
    deleteTask(task.id)
    navigate('/list')
  }

  // handles mark as complete - updates status then stays on page
  const handleComplete = () => {
    completeTask(task.id)
  }

  return (
    // dark background covering full screen
    <div style={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: 'white' }}>

      <div className="container py-5">

        {/* back button - takes user back to the list page */}
        <button
          className="btn btn-outline-light mb-4"
          onClick={() => navigate('/list')}
        >
          Back to Tasks
        </button>

        {/* task details card */}
        <div style={{ backgroundColor: '#1a1a1a', borderRadius: '10px', padding: '30px' }}>

          {/* task title */}
          <h4 className="fw-bold mb-3">{task.title}</h4>


          {/* task description */}
          <p className="text-secondary mb-3">{task.description}</p>

          {/* due date */}
          <p className="mb-2"><span className="text-secondary">Due: </span>{task.due}</p>

          {/* status badge */}
          <p className="mb-4">
            <span className="text-secondary">Status: </span>
            <span className={`badge ${task.status === 'Complete' ? 'bg-success' : 'bg-warning text-dark'}`}>
              {task.status}
            </span>
          </p>

          {/* action buttons */}
          <div className="d-flex gap-3">

          {/* mark as complete - only shows if task is still pending */}
            {task.status !== 'Complete' && (
              <button className="btn btn-success" onClick={handleComplete}>Mark as Complete</button>
            )}


            {/* edit button */}
            <button className="btn btn-outline-light">Edit</button>

           {/* delete button - removes task and goes back to list */}
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>


          </div>

        </div>

      </div>
    </div>
  )
}

export default Details