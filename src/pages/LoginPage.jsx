import { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('jiohotstar_users') || '{}')

    if (!users[username]) {
      setError('User not found. Please sign up first.')
      return
    }
    if (users[username] !== password) {
      setError('Incorrect password.')
      return
    }
    onLogin(username)
  }

  return (
    <div className="auth-page">
      <div className="auth-overlay">
        <div className="auth-box">
          <div className="auth-logo">JioHotstar</div>
          <h2>Sign In</h2>

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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">Sign In</button>
          </form>

          <div className="auth-footer">
            New to JioHotstar? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
