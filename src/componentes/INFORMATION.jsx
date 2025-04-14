import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';

function DETAILS() {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false); // Novo estado
  const chave = "api_key=34eb4921b3be3ffb5436c69d930287bb";
  const { id } = useParams();

  async function api() {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?${chave}`);
      const data = await response.json();
      setMovies(data);

      // Pré-carrega a imagem de fundo
      const img = new Image();
      img.src = `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`;
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
      <div className="bg-black min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-danger" role="status">
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
    window.history.back();
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
              <h5 className="card-title" style={{ color: "#f74242" }}>{movies.title}</h5>
              <p className="card-text text-white">{movies.overview}</p>
              <Rating
                name="half-rating-read"
                value={movies.vote_average / 2}
                readOnly
              />
              <p><span style={{ color: "#f74242" }}>Country</span>: {renderCountries()}</p>
              <p><span style={{ color: "#f74242" }}>Genres</span>: {renderGenres()}</p>

              <button className="btn btn-danger" onClick={handleGoBack}>
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
