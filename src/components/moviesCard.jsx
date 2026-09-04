//MOVIE CARD
function MovieCard({ movie }) {
  return (
    <div className="card">
      <img src={movie.bannerUrl} alt={movie.name} />

      <div className="info">
        <h3>{movie.name}</h3>

        <p className="genre">{movie.genre}</p>

        <div className="meta">
          <p className="year">{movie.releaseYear}</p>
          {movie.rating && <p className="rating">⭐ {movie.rating}</p>}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;