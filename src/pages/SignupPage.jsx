import { useState } from 'react'
import { Link } from 'react-router-dom'

function SignupPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      setError('Passwords do not match.')
      return
    }

    const users = JSON.parse(localStorage.getItem('jiohotstar_users') || '{}')

    if (users[username]) {
      setError('Username already exists.')
      return
    }

    users[username] = password
    localStorage.setItem('jiohotstar_users', JSON.stringify(users))
    onLogin(username)
  }

  return (
    <div className="auth-page">
      <div className="auth-overlay">
        <div className="auth-box">
          <div className="auth-logo">JioHotstar</div>
          <h2>Sign Up</h2>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">Create Account</button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
