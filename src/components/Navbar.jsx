//Nav bar that appears at the top of every page 
//Link component of react router is used to move between pages without reloading
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    //use of bootstrap classes for the styling and blackbackground colour
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#0d0d0d' }}>
      
      {/*keeps page content centered and aligned*/}
      <div className="container">

        {/* app name on the left, clicking it goes to home page */}
        <Link className="navbar-brand text-white fw-bold" to="/">
          TaskThis
        </Link>

        {/* navigation links on the right */}
        <div className="d-flex gap-3">
          {/* each Link goes to a different page in the app */}  
          <Link className="nav-link text-white" to="/home">Home</Link>
          <Link className="nav-link text-white" to="/list">Tasks</Link>
          <Link className="nav-link text-white" to="/add">Add Task</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar