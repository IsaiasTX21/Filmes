import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import HEADER from './HEADER';

function TOPRATED() {
  const [movie, setMovie] = useState([]);
  const chave = "api_key=34eb4921b3be3ffb5436c69d930287bb"
   const [loader, setloader] = useState(true)
 

  useEffect(() => {
    async function api() {
   
      const api = await fetch(`https://api.themoviedb.org/3/movie/top_rated?${chave}`)
        .then((data) => data.json())
        .then((data) =>setMovie(data.results));
        setloader(false)
    }
    api()

  }, []);

  if(loader){

    return  <div className='bg-black min-vh-100 d-flex justify-content-center align-items-center '>  <div class=" mt-auto mb-auto spinner-border  text-danger" role="status">
    <span class="visually-hidden ">Loading...</span>
    </div>
    </div>
      }

  return (
    <div className='bg-black'> 
      <HEADER />
   <div className="container ">
        <div className="row ">
          {   console.log(movie)}
          {movie.map((element) => {
            return (
              <div key={element.id} className=" col-md-6 col-lg-4 col-xl-3 ">
                {/* Cada card */}
                <div style={{backgroundColor:"rgb(0, 0, 0)"}} className="card mt-5 img-fluid justify-content-center text-center anime">
                <Link to={`/Details/${element.id}`}>  <img src={`https://image.tmdb.org/t/p/w500${element.poster_path}`} style={{  height:"450px "}} className="movie card-img-top im-g-fluid" alt="" /></Link>
                  <div className="card-body card-space ">
                  <h5 className="card-title text-white">{element.title}</h5>
                  <p className="card-text position-relative"> </p>
                  
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
  );
}

export default TOPRATED;
