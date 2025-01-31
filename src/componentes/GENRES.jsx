import HEADER from "./HEADER";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';



function GENRES() {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();

  const chave = "api_key=34eb4921b3be3ffb5436c69d930287bb";

  useEffect(() => {
    async function search() {
      const api = await fetch(
        `https://api.themoviedb.org/3/discover/movie?${chave}&with_genres=${id}`
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
       
          {movie.map((element) => {
            return (
              <div key={element.id} className=" col-md-6 col-lg-4 col-xl-3 ">
                {/* Cada card */}
                <div style={{backgroundColor:"rgb(0, 0, 0)"}} className="card mt-5 img-fluid justify-content-center text-center anime">
                  <img src={`https://image.tmdb.org/t/p/w500${element.poster_path}`} style={{  height:"450px "}} className="card-img-top im-g-fluid" alt="" />
                  <div className="card-body card-space ">
                    <h5 className="card-title text-white">{element.title}</h5>
                    <p className="card-text position-relative"> </p>
                    <Link to={`/Details/${element.id}`}>  <button  className="btn btn-outline-danger ms-1 text-center rounded-0">Information</button></Link>
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

export default GENRES;
