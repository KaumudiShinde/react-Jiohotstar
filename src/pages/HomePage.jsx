import { useState } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/moviesCard.jsx'

function HomePage({ user, movies, onLogout }) {
  const [search, setSearch] = useState('')

  const filtered = movies.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      {/* Navbar */}
      <nav>
        <div className="nav-logo">JioHotstar</div>
        <div className="nav-links">
          <Link to="/" className="active">Home</Link>
          <Link to="/manage">Manage Movies</Link>
          <Link to="/add">Add Movie</Link>
        </div>
        <div className="nav-user">
          <span>Hi, {user}</span>
          <button className="btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero">
        <h1>Movies & Shows</h1>
      </div>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Movies Grid */}
      <div className="container">
        <h2>All Movies</h2>
        {filtered.length > 0 ? (
          <div className="movies">
            {filtered.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="no-results">No movies found.</div>
        )}
      </div>
    </>
  )
}

export default HomePage
