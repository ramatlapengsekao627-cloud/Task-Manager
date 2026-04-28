// Register page - allows a new user to create an account
// sends name, email and password to the backend
// if successful redirects to login page

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register() {

  // useNavigate lets us redirect to another page after registering
  const navigate = useNavigate()

  // formData - stores what the user types in each field
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  // error - stores any error message from the backend
  const [error, setError] = useState('')

  // handles input changes - updates formData when user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // handles form submission
  const handleSubmit = async (e) => {
    // prevents page from reloading
    e.preventDefault()

    // basic validation - checks that no field is empty
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required')
      return
    }

    try {
      // sends register request to the backend
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        // registration successful - go to login page
        navigate('/login')
      } else {
        // registration failed - show error from backend
        setError(data.error)
      }
    } catch (err) {
      setError('Something went wrong. Try again.')
    }
  }

  return (
    // dark background covering full screen
    <div style={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: 'white' }}>
      <div className="container py-5">

        {/* centered form card */}
        <div style={{ backgroundColor: '#1a1a1a', borderRadius: '10px', padding: '30px', maxWidth: '500px', margin: '0 auto' }}>

          {/* page heading */}
          <h4 className="fw-bold mb-4 text-center">Create Account</h4>

          {/* shows error message if there is one */}
          {error && <p style={{ color: 'red', fontSize: '0.85rem' }}>{error}</p>}

          <form onSubmit={handleSubmit}>

            {/* name field */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                style={{ backgroundColor: '#0d0d0d', color: 'white', border: '1px solid #333' }}
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            {/* email field */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                style={{ backgroundColor: '#0d0d0d', color: 'white', border: '1px solid #333' }}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            {/* password field */}
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                style={{ backgroundColor: '#0d0d0d', color: 'white', border: '1px solid #333' }}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>

            {/* submit button */}
            <button type="submit" className="btn btn-primary w-100">Register</button>

          </form>

          {/* link to login page if user already has an account */}
          <p className="text-center mt-3 text-secondary">
            Already have an account? <Link to="/login" className="text-white">Login</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register
