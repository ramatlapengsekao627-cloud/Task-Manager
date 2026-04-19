// List page - displays all tasks as cards in a grid
// has a search bar at the top to filter tasks by title

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function List({ tasks }) {

  // search state - stores whatever the user types in the search bar
  const [search, setSearch] = useState('')

  // useNavigate lets us go to another page programmatically
  const navigate = useNavigate()

  //converts both the task title and what you typed to lowercase
  //checks if the title includes what has been typed 
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    // dark background covering full screen
    <div style={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: 'white' }}>
      
      <div className="container py-5">

        {/* page heading */}
        <h4 className="fw-bold mb-4">My Tasks</h4>

        {/* search bar */}
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search tasks..."  
          style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #333' }}
          // every time user types, search state updates
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* grid of task cards */}
        
        <div className="row">
          {filteredTasks.map(task => (
            <div className="col-md-4 mb-4" key={task.id}>
              
              {/* each task card - hover glow effect applied via task-card class in index.css */}
              <div
                className="task-card"
                style={{ backgroundColor: '#1a1a1a', borderRadius: '10px', padding: '20px', cursor: 'pointer' }}
                // clicking a card goes to the details page for that task
                onClick={() => navigate(`/details/${task.id}`)}
              >
                <p className="fw-bold mb-1">{task.title}</p>
                <p className="text-secondary mb-2" style={{ fontSize: '0.85rem' }}>{task.description}</p>
                <p className="text-secondary mb-2" style={{ fontSize: '0.85rem' }}>Due: {task.due}</p>
                
                {/* status badge - green for complete, yellow for pending */}
                <span className={`badge ${task.status === 'Complete' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {task.status}
                </span>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default List