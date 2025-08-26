import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import HEADER from './HEADER';
import Carousel from 'react-bootstrap/Carousel';
import one from "../assets/one.png"
import two from "../assets/two.png"
import three from "../assets/three.jpg"
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

function Popular() {
  const [movie, setMovies] = useState([]);
  const [loader, setLoader] = useState(true);

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
      <div className='containermovie bg-black '>
        <HEADER />

        <Carousel  prevIcon={<GrPrevious/>} nextIcon={<GrNext />}  >

           <Carousel.Item >

            {movie[15].poster_path ? (<div className='imgcarrossel' style={{ height: "27vw", width: "100%", backgroundPosition: "center top", 
              backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundImage: `url(${three})` }}></div>) : <p>não carregou</p>}
            <Carousel.Caption>

              <h3 className='white'>Ballerina</h3>

            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className='imgcarrossel' style={{ height: "27vw", width: "100%", backgroundPosition: "center",
               backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundImage: `url(${one})` }}> </div>
            <Carousel.Caption>
              <h3 className=' text-white'>Thunderbolts</h3>

            </Carousel.Caption>

          </Carousel.Item>

          <Carousel.Item>
            {movie[18].poster_path ? (<div className='imgcarrossel' style={{ height: "27vw", width: "100%", backgroundPosition: "center", 
              backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundImage: `url(${two})` }}></div>) : <p>não carregou</p>}
            <Carousel.Caption>
              <h3 className='text-white'>F1</h3>
            </Carousel.Caption>

          </Carousel.Item>

        </Carousel>
        <div className=" row m-auto mt-5">
          {movie.map((movie) => (
            <div key={movie.id} className="col-md-6 col-lg-4 col-xl-3 col-xxl-2 ">
              <div className=" movie card text-center anime" style={{ backgroundColor: "rgb(0, 0, 0)" }}>
                <img
                  onClick={() => handleGoToDetails(movie.id)}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top  divimg img-fluid"
                  alt={movie.title}
                  style={{cursor:"pointer"}}
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
