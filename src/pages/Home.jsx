// Home page - the first page users see when they open the app

import { Link } from 'react-router-dom'

function Home({ tasks }) {
  return (//everytime inside of return will show up on the screen
    
    // dark background covering the full screen height
    //page should be atleast as tall as the full screen(vh -> viewport height)
    //default text colour white
    <div style={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: 'white' }}>
      
      {/* centered container for all content */}
      <div className="container text-center py-5">

        {/* app heading and description */}
        <h3 className="fw-bold mb-3">Welcome to TaskThis</h3>
        <p className="text-secondary mb-4">Get more done everyday, one task at a time</p>

        {/* navigation buttons */}
        <div className="d-flex justify-content-center gap-3 mb-5">
          <Link to="/list" className="btn btn-primary">View Tasks</Link>
          <Link to="/add" className="btn btn-outline-light">Add Task</Link>
        </div>

        {/* task preview section - shows only the first 3 tasks */}
        <h6 className="text-secondary mb-3">Recent Tasks</h6>
        <div className="row justify-content-center">
          {tasks.slice(0, 3).map(task => (
            <div className="col-md-4 mb-3" key={task.id}>
              <div style={{ backgroundColor: '#1a1a1a', borderRadius: '10px', padding: '15px' }}>
                <p className="fw-bold mb-1">{task.title}</p>
                <p className="text-secondary mb-1" style={{ fontSize: '0.85rem' }}>Due: {task.due}</p>
                {/* status badge - green for complete yellow for pending */}
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

export default Home