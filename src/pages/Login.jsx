// Login page - allows an existing user to log in
// sends email and password to the backend
// if successful saves the token to localStorage and redirects to home page

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login({ setUser }) {// setUser comes from App.jsx as a prop - we use it to update the user state in App after successful login

  // useNavigate lets us redirect after login
  const navigate = useNavigate()

  // formData - stores email and password
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // error - stores any error message
  const [error, setError] = useState('')

  // handles input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // handles form submission
  const handleSubmit = async (e) => {
    // prevents page from reloading
    e.preventDefault()

    // basic validation
    if (!formData.email || !formData.password) {
      setError('All fields are required')
      return
    }

    try {
      // sends login request to the backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        // login successful
        // saves the token to localStorage so it persists when page refreshes
        // think of localStorage as a small storage inside the browser
        localStorage.setItem('token', data.token)

        // saves the user info to localStorage so we can show their name
        localStorage.setItem('user', JSON.stringify(data.user))

        // updates the user state in App.jsx
        setUser(data.user)

        // redirects to home page
        navigate('/home')
      } else {
        // login failed - show error
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
          <h4 className="fw-bold mb-4 text-center">Login to TaskThis</h4>

          {/* shows error message if there is one */}
          {error && <p style={{ color: 'red', fontSize: '0.85rem' }}>{error}</p>}

          <form onSubmit={handleSubmit}>

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
            <button type="submit" className="btn btn-primary w-100">Login</button>

          </form>

          {/* link to register page if user doesnt have an account */}
          <p className="text-center mt-3 text-secondary">
            Don't have an account? <Link to="/register" className="text-white">Register</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login

