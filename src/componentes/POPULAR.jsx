import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; 
import HEADER from './HEADER';

function Popular() {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(true);

  const navigate = useNavigate();

  function handleGoToDetails(id) {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    navigate(`/Details/${id}`);
  }

  // Requisição à API
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?${import.meta.env.VITE_API_KEY}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoader(false);
      }
    }
fetchMovies();
    
  }, []);

  

  // Restaurar scroll após carregar os filmes
  useEffect(() => {
    if (!loader) {
      const scrollPos = sessionStorage.getItem('scrollPosition');
      if (scrollPos) {
        window.scrollTo(0, parseInt(scrollPos));
        sessionStorage.removeItem('scrollPosition');
      }
    }
  }, [loader]);

  // Loader
  if (loader) {
    return (
      <div className='bg-black min-vh-100 d-flex justify-content-center align-items-center'>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Render dos filmes
  return (
    <>
      <div className='bg-black'>
        <HEADER />
        <div className="container">
          <div className="row">
            {movies.map((movie) => (
              <div key={movie.id} className="col-md-6 col-lg-4 col-xl-3">
                <div className="card mt-5 text-center anime" style={{ backgroundColor: "rgb(0, 0, 0)" }}>
                  <img
                    onClick={() => handleGoToDetails(movie.id)}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    style={{ height: "450px" }}
                    className="card-img-top img-fluid"
                    alt={movie.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-white">{movie.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Popular;
