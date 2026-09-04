import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { movies_data } from '../data/movies.js'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import HomePage from './pages/HomePage.jsx'
import AddMoviePage from './pages/AddMoviePage.jsx'
import ManageMoviesPage from './pages/ManageMoviesPage.jsx'
import './App.css'

function App() {
  const [user, setUser] = useState(() => {
    return localStorage.getItem('jiohotstar_user') || null
  })

  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem('jiohotstar_movies')
    return saved ? JSON.parse(saved) : movies_data
  })

  useEffect(() => {
    localStorage.setItem('jiohotstar_movies', JSON.stringify(movies))
  }, [movies])

  const handleLogin = (username) => {
    localStorage.setItem('jiohotstar_user', username)
    setUser(username)
  }

  const handleLogout = () => {
    localStorage.removeItem('jiohotstar_user')
    setUser(null)
  }

  const handleAddMovie = (movie) => {
    const newMovie = { ...movie, id: Date.now() }
    setMovies([...movies, newMovie])
  }

  const handleEditMovie = (id, updatedMovie) => {
    setMovies(movies.map(m => m.id === id ? { ...m, ...updatedMovie } : m))
  }

  const handleDeleteMovie = (id) => {
    setMovies(movies.filter(m => m.id !== id))
  }

  return (
    <Routes>
      <Route path="/login" element={
        user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />
      } />
      <Route path="/signup" element={
        user ? <Navigate to="/" /> : <SignupPage onLogin={handleLogin} />
      } />
      <Route path="/" element={
        user ? <HomePage user={user} movies={movies} onLogout={handleLogout} /> : <Navigate to="/login" />
      } />
      <Route path="/add" element={
        user ? <AddMoviePage user={user} onLogout={handleLogout} onAddMovie={handleAddMovie} /> : <Navigate to="/login" />
      } />
      <Route path="/manage" element={
        user ? <ManageMoviesPage user={user} movies={movies} onLogout={handleLogout} onEditMovie={handleEditMovie} onDeleteMovie={handleDeleteMovie} /> : <Navigate to="/login" />
      } />
    </Routes>
  )
}

export default App
