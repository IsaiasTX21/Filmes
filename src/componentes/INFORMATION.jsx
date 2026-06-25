import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';


function DETAILS() {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(true);
   const [posterload, setposter] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false); // Novo estado
  const navegate = useNavigate()


  const { id } = useParams();

  async function api() {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
      const data = await response.json();
      setMovies(data);


      const backdrop = new Image();
       backdrop.src = `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`;

      if (data.backdrop_path === null) {
        return setLoader(false)
      }
      backdrop.onload = () => {
        setImageLoaded(true);
        setTimeout(() => setLoader(false), 500); // Delay suave

      };

      const poster = new Image();
       poster.src = `https://image.tmdb.org/t/p/w1280${data.poster_path}`;

        poster.onload = () => {
        setImageLoaded(true);
        setTimeout(() =>  setposter(false), 500); // Delay suave
      };

    } catch (error) {
      console.error("Erro ao carregar detalhes:", error);
      setLoader(false);
    }
  }

  useEffect(() => {
    api();

  }, []);

  if (loader && posterload) {
    return (
      <div className="bg-black min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-warning" >
          <span >Loading...</span>
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
        minHeight: "100dvh"
      }}
    >
  
          <div className="position-relative container-info">
            

           <img id='poster' style={{ borderRadius:"10px"}} src={ imageLoaded ? `https://image.tmdb.org/t/p/w1280${movies.poster_path}` : 'none'} alt="foto" />
                          <button  style={{backgroundColor:"red"}} className="   exit  text-light ms-auto me-auto " onClick={handleGoBack}>
                X
              </button>
            <div className='info'> 
              
              <h5 id='title' style={{ color: "#f0d08b" }}>{movies.title}</h5>
              <p className="card-text text-white">{movies.overview}</p>

              <p><span style={{ color: "#f0d08b" }}>Country</span>: {renderCountries()}</p>
              <p><span style={{ color: "#f0d08b" }}>Genres</span>: {renderGenres()}</p>
                  <Rating 
                className='stars'
                name="half-rating-read"
                value={movies.vote_average / 2}
                readOnly
              />
              </div>
        </div>
      
    </div>
  );
}

export default DETAILS;
