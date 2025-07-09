import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';

function DETAILS() {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false); // Novo estado
const navegate = useNavigate()

  
  const { id } = useParams();

  async function api() {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
      const data = await response.json();
      setMovies(data);
      console.log(movies)
      
      const img = new Image();
      img.src = `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`;
        
      if(data.backdrop_path === null){
        return setLoader(false)
      }
      img.onload = () => {
        setImageLoaded(true);
        setTimeout(() => setLoader(false), 500); // Delay suave
        
      };
    } catch (error) {
      console.error("Erro ao carregar detalhes:", error);
      setLoader(false);
    }
  }

  useEffect(() => {
    api();

  }, []);

  if (loader) {
    return (
      <div className="bg-black min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const renderCountries = () => {
    if (movies.production_countries) {
      return movies.production_countries.map((country, index) => (
        <span key={index}>{country.name}{index < movies.production_countries.length - 1 && ', '}</span>
      ));
    }
    return "Informação não disponível";
  };

  const renderGenres = () => {
    if (movies.genres) {
      return movies.genres.map((genre, index) => (
        <span className="me-2" key={index}>{genre.name}{index < movies.genres.length - 1 && ', '}</span>
      ));
    }
    return "Informação não disponível";
  };

  const handleGoBack = () => {
    navegate(-1)
  };

  return (
    <div
      className="d-flex"
      style={{
        backgroundImage: imageLoaded ? `url(https://image.tmdb.org/t/p/w1280${movies.backdrop_path})` : 'none',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#000", // fallback para fundo escuro
        minHeight: "100dvh"
      }}
    >
      <div className="container align-content-center mb-5">
        <div className="row det justify-content-center">
          <div className="card info">
            <div className="card-body text-center">
              <h5 className="card-title" style={{ color: "#E6A003" }}>{movies.title}</h5>
              <p className="card-text text-white">{movies.overview}</p>
              <Rating
                name="half-rating-read"
                value={movies.vote_average / 2}
                readOnly
              />
              <p><span style={{ color: "#E6A003" }}>Country</span>: {renderCountries()}</p>
              <p><span style={{ color: "#E6A003" }}>Genres</span>: {renderGenres()}</p>

              <button className="btn btn-warning" onClick={handleGoBack}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DETAILS;
