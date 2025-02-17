import HEADER from "./HEADER";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


function SEARCH() {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();

  const chave = "api_key=34eb4921b3be3ffb5436c69d930287bb";

  useEffect(() => {
    async function search() {
      const api = await fetch(
        `https://api.themoviedb.org/3/search/movie?${chave}&query=${id}`
      )
        .then((data) => data.json())
        .then((data) => setMovie(data.results));
    }
    search();
  }, [id]);

  return (
   <> 
   
      <HEADER />

      <div className='bg-black'> 
   <div className="container ">
        {/* Usando a classe 'row' aqui para agrupar os cards */}
        <div className="row ">
          {   console.log(movie)}
          {movie.map((element) => {
            return (
              <div key={element.id} className=" col-md-6 col-lg-4 col-xl-3 ">
                {/* Cada card */}
                <div style={{backgroundColor:"rgb(0, 0, 0)"}} className="card mt-5 img-fluid justify-content-center text-center anime">
                <Link to={`/Details/${element.id}`}>    <img src={`https://image.tmdb.org/t/p/w500${element.poster_path}`} style={{  height:"450px "}} className="card-img-top im-g-fluid" alt="" /></Link>
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
      </>
   
  );
}

export default SEARCH;
