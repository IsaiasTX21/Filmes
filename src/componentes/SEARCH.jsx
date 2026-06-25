import HEADER from "./HEADER";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import notfound from "../assets/notfound.png"
import { Rating } from '@mui/material';

function SEARCH() {
  const [movie, setMovie] = useState([]);
  const { moviesearch } = useParams();

  const [loader, setloader] = useState(true)
  const navigate = useNavigate()

  function handleGoToDetails(id) {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    navigate(`/Details/${id}`);
  }

  useEffect(() => {
    async function search() {

      try {
        const api = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${moviesearch}`)
        const data = await api.json()
        setMovie(data.results)

      } catch (error) {
        console.log(error)
      }
      finally {
        setloader(false)

      }
    }

    search();


  }, [moviesearch]);




  useEffect(() => {
    if (!loader) {
      const scrollPos = sessionStorage.getItem("scrollPosition")
      if (scrollPos) {
        window.scrollTo(0, parseInt(scrollPos))
        sessionStorage.removeItem("scrollPosition")
      }
    }
  })

  if (loader) {

    return <div className='bg-black min-vh-100 d-flex justify-content-center align-items-center '> 
       <div className=" text-warning" >
          <span >Loading...</span>
        </div>
    </div>
  }

  return (
    <>
      {movie.length > 0 ? (

        <div className='containermovie bg-black'>
          <HEADER />


          <div className="row m-auto">
          
            {movie.map((movie) => {
              return (
               <div key={movie.id} className=" col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3 col-xxl-2 ">

                  <div style={{ backgroundColor: "rgb(0, 0, 0)" }} className="card img-fluid justify-content-center text-center anime">
                    <img style={{ cursor: "pointer" }} onClick={() => handleGoToDetails(movie.id)} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="movie divimg card-img-top img-fluid" alt="foto poster" />
                    <div className="card-body card-space ">
                      <h5 className="card-title text-white">{movie.title}</h5>
                <Rating 
                name="half-rating-read"
                value={movie.vote_average / 2}
                readOnly
              />
                </div>                                   

                  </div>
                </div>
              );
            })}
          </div>
        </div>


      ) : <>
        <HEADER />
        <div style={{
          backgroundImage: `url(${notfound})`, backgroundSize: "100%",
          backgroundPositionY: "10%", height: "94.5vh", backgroundRepeat: "repeat"
        }}
          className=" d-flex justify-content-center"> </div></>}
    </>

  );
}

export default SEARCH;
