import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; 
import HEADER from './HEADER';
import Carousel from 'react-bootstrap/Carousel';

function Popular() {
  const [movie, setMovies] = useState([]);
  const [loader, setLoader] = useState(true);

console.log(movie)
 

  const navigate = useNavigate();

  function handleGoToDetails(id) {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    navigate(`/Details/${id}`);
  }


  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}`);
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

  if (loader) {
    return (
      <div className='bg-black min-vh-100 d-flex justify-content-center align-items-center'>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }


  return (
    <>
      <div  className='containermovie bg-black '>
        <HEADER />

        <Carousel>
      <Carousel.Item>
               <div style={{height:"500px",width:"100%", backgroundPositionY:"60%",  backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundImage:`url(https:image.tmdb.org/t/p/original${movie[6].poster_path})`}}></div>
        <Carousel.Caption>
          <h3 className=' gold'>{movie[6].title}</h3>
        
        </Carousel.Caption>
      </Carousel.Item>
       
      <Carousel.Item>
          <div style={{height:"500px",width:"100%", backgroundPositionY:"15%", backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundImage:`url(https:image.tmdb.org/t/p/original${movie[18].poster_path})`}}></div>
        <Carousel.Caption>
          <h3 className='text-dark'>{movie[18].title}</h3>
          
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
              <div style={{height:"500px",width:"100%",backgroundPosition:"center",backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundImage:`url(https:image.tmdb.org/t/p/original${movie[15].poster_path})`}}></div>
        <Carousel.Caption>
              <h3 className='gold'>{movie[15].title}</h3>
         
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

      
       
          <div className=" row m-auto mt-5">
            {movie.map((movie) => (
              <div  key={movie.id}  className="col-md-6 col-lg-4 col-xl-3 col-xxl-2 ">
                <div className=" movie  card text-center anime" style={{ backgroundColor: "rgb(0, 0, 0)" }}>
                  <img
                    onClick={() => handleGoToDetails(movie.id)}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  
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
    </>
  );
}

export default Popular;
