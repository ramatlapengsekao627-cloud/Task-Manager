// Navbar component - shows app name, navigation links and logout button
// receives onLogout function and user info from App.jsx as props

import { Link } from 'react-router-dom'

// onLogout - function that logs the user out, comes from App.jsx
// user - the logged in user object, used to show their name
function Navbar({ onLogout, user }) {
  return (
    // dark navbar with solid background
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#0d0d0d' }}>
      <div className="container">

        {/* app name on the left - clicking goes to home */}
        <Link className="navbar-brand text-white fw-bold" to="/home">
          TaskThis
        </Link>

        {/* navigation links and logout on the right */}
        <div className="d-flex gap-3 align-items-center">
          <Link className="nav-link text-white" to="/home">Home</Link>
          <Link className="nav-link text-white" to="/list">Tasks</Link>
          <Link className="nav-link text-white" to="/add">Add Task</Link>

          {/* shows logged in users name */}
          <span className="text-secondary" style={{ fontSize: '0.85rem' }}>Hi, {user.name}</span>

          {/* logout button - calls handleLogout in App.jsx */}
          <button className="btn btn-outline-light btn-sm" onClick={onLogout}>Logout</button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar