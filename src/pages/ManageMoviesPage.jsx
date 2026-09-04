import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ManageMoviesPage({ user, movies, onLogout, onEditMovie, onDeleteMovie }) {
  const navigate = useNavigate()
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [deleteId, setDeleteId] = useState(null)

  const startEdit = (movie) => {
    setEditingId(movie.id)
    setEditForm({
      name: movie.name,
      genre: movie.genre,
      releaseYear: movie.releaseYear,
      rating: movie.rating || '',
      bannerUrl: movie.bannerUrl
    })
  }

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const saveEdit = () => {
    onEditMovie(editingId, {
      ...editForm,
      releaseYear: parseInt(editForm.releaseYear)
    })
    setEditingId(null)
  }

  const confirmDelete = () => {
    onDeleteMovie(deleteId)
    setDeleteId(null)
  }

  const movieToDelete = movies.find(m => m.id === deleteId)

  return (
    <>
      <nav>
        <div className="nav-logo">JioHotstar</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/manage" className="active">Manage Movies</Link>
          <Link to="/add">Add Movie</Link>
        </div>
        <div className="nav-user">
          <span>Hi, {user}</span>
          <button className="btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      <div className="manage-page">
        <div className="manage-header">
          <h2>Manage Movies</h2>
          <button className="btn-add" onClick={() => navigate('/add')}>+ Add Movie</button>
        </div>

        <table className="movies-table">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Name</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie.id}>
                {editingId === movie.id ? (
                  <>
                    <td><img src={editForm.bannerUrl} alt="" /></td>
                    <td><input name="name" value={editForm.name} onChange={handleEditChange} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '6px 8px', borderRadius: '4px', width: '100%', fontSize: '13px' }} /></td>
                    <td><input name="genre" value={editForm.genre} onChange={handleEditChange} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '6px 8px', borderRadius: '4px', width: '100%', fontSize: '13px' }} /></td>
                    <td><input name="releaseYear" type="number" value={editForm.releaseYear} onChange={handleEditChange} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '6px 8px', borderRadius: '4px', width: '70px', fontSize: '13px' }} /></td>
                    <td><input name="rating" value={editForm.rating} onChange={handleEditChange} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '6px 8px', borderRadius: '4px', width: '80px', fontSize: '13px' }} /></td>
                    <td>
                      <button className="btn-edit" onClick={saveEdit}>Save</button>
                      <button className="btn-cancel" onClick={() => setEditingId(null)} style={{ padding: '5px 14px', fontSize: '12px' }}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td><img src={movie.bannerUrl} alt={movie.name} /></td>
                    <td>{movie.name}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.releaseYear}</td>
                    <td style={{ color: '#ffd700' }}>{movie.rating || '-'}</td>
                    <td>
                      <button className="btn-edit" onClick={() => startEdit(movie)}>Edit</button>
                      <button className="btn-delete" onClick={() => setDeleteId(movie.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="delete-overlay" onClick={() => setDeleteId(null)}>
          <div className="delete-box" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Movie</h3>
            <p>Are you sure you want to delete "<strong>{movieToDelete?.name}</strong>"?</p>
            <div className="delete-actions">
              <button className="btn-delete" onClick={confirmDelete} style={{ padding: '10px 24px', fontSize: '14px' }}>Yes, Delete</button>
              <button className="btn-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ManageMoviesPage
