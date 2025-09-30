import React, {useState} from "react"

function App() {
const [info, setInfo] = useState([]);
const [input, setInput] = useState("");

function SearchInp(e) {
    setInput(e.target.value);
}

const handleSearch = async () => {
 const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzg1YzdiN2Y2NGM0NTNkYWI0MjIxMWRhZWU5NzkyYyIsIm5iZiI6MTc1OTEyODE2OS4xOTUwMDAyLCJzdWIiOiI2OGRhMmE2OTY4NDkxZDQ4NTJiOWEzYjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bmO1H_2xIHtOFr2VXSOq7gDP_81T-BtXMdzPWHpQYKs'
  }
};

try {
  const res = await fetch(`http://localhost:5000/api/movies?q=${input}`);
const data = await res.json()
setInfo(data.results);
} catch (error) {
   console.error("Error fetching data:", error)
}

}
console.log(info);

  return (
    <>
      <nav className="navigation">
            <div className="first-text">
                <h1>Movie Finder</h1>
            </div>
            <div className="Searching">
          <input type="text"placeholder="Search a movie..." value={input} onChange={SearchInp}/>
          <button onClick={handleSearch}>Search</button>
        </div>
        </nav>
        <div className="movies-container">
  {info.length > 0 ? (
    info.map((movie, index) => (
      <div key={index} className="movie-card">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || movie.name}
          />
        ) : (
          <span>No Poster</span>
        )}
        <h3>{movie.title || movie.name}</h3>
        <p>
          {movie.release_date || movie.first_air_date
            ? `Released: ${movie.release_date || movie.first_air_date}`
            : "Release date unknown"}
        </p>
        <p>⭐ {movie.vote_average}</p>
        <small>{movie.overview}</small>
      </div>
    ))
  ) : (
    <p>No results yet. Try searching or click Search to load trending movies.</p>
  )}
</div>
<footer>
  <div className="footer-container"> 
     <p className="footer-p">@2025-Developed and designed by Asish pradhan</p>
  </div>
</footer>
    </>
  )
}

export default App
