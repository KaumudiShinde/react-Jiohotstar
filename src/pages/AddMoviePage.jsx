import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AddMoviePage({ user, onLogout, onAddMovie }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    genre: '',
    releaseYear: '',
    rating: '',
    bannerUrl: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddMovie({
      ...form,
      releaseYear: parseInt(form.releaseYear)
    })
    navigate('/manage')
  }

  return (
    <>
      <nav>
        <div className="nav-logo">JioHotstar</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/manage">Manage Movies</Link>
          <Link to="/add" className="active">Add Movie</Link>
        </div>
        <div className="nav-user">
          <span>Hi, {user}</span>
          <button className="btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      <div className="form-page">
        <h2>Add New Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Movie Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Enter movie name" required />
          </div>
          <div className="form-group">
            <label>Genre</label>
            <input name="genre" value={form.genre} onChange={handleChange} placeholder="e.g. Action Thriller" required />
          </div>
          <div className="form-group">
            <label>Release Year</label>
            <input name="releaseYear" type="number" value={form.releaseYear} onChange={handleChange} placeholder="e.g. 2023" required />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <input name="rating" value={form.rating} onChange={handleChange} placeholder="e.g. 8.5/10" required />
          </div>
          <div className="form-group">
            <label>Banner Image URL</label>
            <input name="bannerUrl" value={form.bannerUrl} onChange={handleChange} placeholder="https://..." required />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '12px 32px' }}>Add Movie</button>
            <button type="button" className="btn-cancel" onClick={() => navigate('/manage')}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddMoviePage
